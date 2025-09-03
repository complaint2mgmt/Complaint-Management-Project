package com.elara.escalation.service;

import com.elara.escalation.model.EscalationRecord;
import com.elara.escalation.repo.EscalationRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EscalationService {

    private static final Logger logger = LoggerFactory.getLogger(EscalationService.class);
    
    private final EscalationRepo repo;
    private final RestTemplate restTemplate;

    @Value("${admin.service.url}")
    private String adminServiceUrl;

    @Value("${agent.service.url}")
    private String agentServiceUrl;
    
    @Value("${escalation.deadline.minutes:2}")
    private int escalationDeadlineMinutes;

    public EscalationService(EscalationRepo repo, RestTemplate restTemplate) {
        this.repo = repo;
        this.restTemplate = restTemplate;
    }

    public EscalationRecord createEscalation(Long complaintId, Long agentId) {
        if (complaintId == null || agentId == null) {
            throw new IllegalArgumentException("Complaint ID and Agent ID cannot be null");
        }
        
        // Check if escalation already exists
        Optional<EscalationRecord> existing = repo.findByComplaintId(complaintId);
        if (existing.isPresent()) {
            logger.info("Escalation already exists for complaint {}", complaintId);
            return existing.get();
        }

        EscalationRecord escalation = new EscalationRecord(complaintId, agentId);
        EscalationRecord saved = repo.save(escalation);
        logger.info("Created new escalation for complaint {} assigned to agent {}", complaintId, agentId);
        return saved;
    }

    public EscalationRecord updateComplaintStatus(Long complaintId, String status) {
        if (complaintId == null || status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Complaint ID and status cannot be null or empty");
        }
        
        Optional<EscalationRecord> escalationOpt = repo.findByComplaintId(complaintId);
        
        if (escalationOpt.isPresent()) {
            EscalationRecord escalation = escalationOpt.get();
            String previousStatus = escalation.getCurrentStatus();
            escalation.setCurrentStatus(status.toUpperCase());
            
            if ("RESOLVED".equals(status.toUpperCase())) {
                escalation.setResolved(true);
                escalation.setResolvedAt(LocalDateTime.now());
                logger.info("Complaint {} resolved by agent {}", complaintId, escalation.getAgentId());
            }
            
            EscalationRecord updated = repo.save(escalation);
            logger.info("Updated complaint {} status from {} to {}", 
                       complaintId, previousStatus, status);
            return updated;
        }
        
        throw new EscalationNotFoundException("Escalation not found for complaint: " + complaintId);
    }

    public Optional<EscalationRecord> getEscalationByComplaintId(Long complaintId) {
        if (complaintId == null) {
            return Optional.empty();
        }
        return repo.findByComplaintId(complaintId);
    }

    public List<EscalationRecord> getAllActiveEscalations() {
        return repo.findOverdueEscalations(LocalDateTime.now());
    }

    public List<EscalationRecord> getEscalationsByAgent(Long agentId) {
        if (agentId == null) {
            throw new IllegalArgumentException("Agent ID cannot be null");
        }
        return repo.findActiveEscalationsByAgent(agentId);
    }

    // Called by scheduler to escalate overdue complaints
    public void escalateOverdueComplaint(EscalationRecord escalation) {
        if (escalation == null) {
            logger.warn("Cannot escalate null escalation record");
            return;
        }
        
        try {
            Long complaintId = escalation.getComplaintId();
            Long currentAgentId = escalation.getAgentId();

            logger.info("Starting escalation process for complaint {}", complaintId);

            // 1. Update admin table - set priority to HIGH_PRIORITY
            updateAdminPriority(complaintId, "HIGH_PRIORITY");

            // 2. Update agent table - set status to OVERDUE
            updateAgentStatus(currentAgentId, complaintId, "OVERDUE");

            // 3. Find next available agent
            Long nextAgentId = findNextAvailableAgent(currentAgentId);
            
            // 4. Reassign to next available agent
            reassignToAgent(complaintId, nextAgentId);

            // 5. Update escalation record
            escalation.setOverdue(true);
            escalation.setEscalated(true);
            escalation.setEscalatedAt(LocalDateTime.now());
            escalation.setCurrentStatus("ESCALATED");
            escalation.setAgentId(nextAgentId);

            repo.save(escalation);

            logger.warn("ESCALATED: Complaint {} escalated from agent {} to agent {}", 
                       complaintId, currentAgentId, nextAgentId);

        } catch (Exception e) {
            logger.error("Escalation failed for complaint {}: {}", 
                        escalation.getComplaintId(), e.getMessage(), e);
            // Consider updating escalation record to mark escalation failure
            escalation.setCurrentStatus("ESCALATION_FAILED");
            repo.save(escalation);
        }
    }

    private void updateAdminPriority(Long complaintId, String priority) {
        try {
            String url = adminServiceUrl + "/api/admin/complaint/" + complaintId + "/priority";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            restTemplate.exchange(url + "?priority=" + priority, HttpMethod.PUT, entity, Void.class);
            
            logger.info("Admin priority updated to {} for complaint {}", priority, complaintId);
        } catch (RestClientException e) {
            logger.error("Failed to update admin priority for complaint {}: {}", complaintId, e.getMessage());
            throw new EscalationOperationException("Failed to update admin priority", e);
        }
    }

    private void updateAgentStatus(Long agentId, Long complaintId, String status) {
        try {
            String url = agentServiceUrl + "/api/agent/" + agentId + "/complaint/" + complaintId + "/status";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            restTemplate.exchange(url + "?status=" + status, HttpMethod.PUT, entity, Void.class);
            
            logger.info("Agent {} status updated to {} for complaint {}", agentId, status, complaintId);
        } catch (RestClientException e) {
            logger.error("Failed to update agent status for agent {} complaint {}: {}", 
                        agentId, complaintId, e.getMessage());
            throw new EscalationOperationException("Failed to update agent status", e);
        }
    }

    private void reassignToAgent(Long complaintId, Long newAgentId) {
        try {
            String url = adminServiceUrl + "/api/admin/complaint/" + complaintId + "/reassign/" + newAgentId;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            restTemplate.exchange(url, HttpMethod.PUT, entity, Void.class);
            
            logger.info("Complaint {} reassigned to agent {}", complaintId, newAgentId);
        } catch (RestClientException e) {
            logger.error("Failed to reassign complaint {} to agent {}: {}", 
                        complaintId, newAgentId, e.getMessage());
            throw new EscalationOperationException("Failed to reassign complaint", e);
        }
    }

    private Long findNextAvailableAgent(Long excludeAgentId) {
        try {
            // Call agent service to find available agents
            String url = agentServiceUrl + "/api/agent/available";
            Long[] availableAgents = restTemplate.getForObject(url, Long[].class);
            
            if (availableAgents != null && availableAgents.length > 0) {
                // Filter out the current agent and select randomly
                List<Long> eligibleAgents = List.of(availableAgents).stream()
                    .filter(agentId -> !agentId.equals(excludeAgentId))
                    .toList();
                
                if (!eligibleAgents.isEmpty()) {
                    int randomIndex = ThreadLocalRandom.current().nextInt(eligibleAgents.size());
                    return eligibleAgents.get(randomIndex);
                }
            }
        } catch (RestClientException e) {
            logger.warn("Failed to fetch available agents from agent service: {}", e.getMessage());
        }
        
        // Fallback: simple round-robin or default assignment
        logger.info("Using fallback agent assignment");
        return excludeAgentId.equals(2L) ? 3L : 2L;
    }
    
    // Custom exceptions for better error handling
    public static class EscalationNotFoundException extends RuntimeException {
        public EscalationNotFoundException(String message) {
            super(message);
        }
    }
    
    public static class EscalationOperationException extends RuntimeException {
        public EscalationOperationException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}