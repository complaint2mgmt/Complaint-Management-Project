package com.elara.escalation.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "escalations")
public class EscalationRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long complaintId;
    private Long agentId; // Track which agent it's assigned to
    private LocalDateTime assignedAt;
    private LocalDateTime dueAt; // When it should be resolved by
    private boolean resolved;
    private boolean overdue;
    private boolean escalated; // Has it been escalated to admin?
    private LocalDateTime escalatedAt;
    private String currentStatus; // ASSIGNED, IN_PROGRESS, OVERDUE, ESCALATED
    private LocalDateTime resolvedAt;

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    
    // Constructors
    public EscalationRecord() {}
    
    public EscalationRecord(Long complaintId, Long agentId) {
        this.complaintId = complaintId;
        this.agentId = agentId;
        this.assignedAt = LocalDateTime.now();
        this.dueAt = LocalDateTime.now().plusMinutes(2); // 2-minute deadline
        this.currentStatus = "ASSIGNED";
        this.resolved = false;
        this.overdue = false;
        this.escalated = false;
    }
    
    // All getters and setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }
    
    public Long getAgentId() { return agentId; }
    public void setAgentId(Long agentId) { this.agentId = agentId; }
    
    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }
    
    public LocalDateTime getDueAt() { return dueAt; }
    public void setDueAt(LocalDateTime dueAt) { this.dueAt = dueAt; }
    
    public boolean isResolved() { return resolved; }
    public void setResolved(boolean resolved) { this.resolved = resolved; }
    
    public boolean isOverdue() { return overdue; }
    public void setOverdue(boolean overdue) { this.overdue = overdue; }
    
    public boolean isEscalated() { return escalated; }
    public void setEscalated(boolean escalated) { this.escalated = escalated; }
    
    public LocalDateTime getEscalatedAt() { return escalatedAt; }
    public void setEscalatedAt(LocalDateTime escalatedAt) { this.escalatedAt = escalatedAt; }
    
    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }
}