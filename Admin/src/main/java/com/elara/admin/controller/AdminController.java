package com.elara.admin.controller;

import com.elara.admin.model.AdminRecord;
import com.elara.admin.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepo repo;
    private final RestTemplate rest;

    @Value("${tracking.service.url}")
    private String trackingUrl;

    @Value("${notification.service.url}")
    private String notifyUrl;

    @Value("${agent.service.url}")
    private String agentUrl; // ✅ agent service URL

    public AdminController(AdminRepo repo, RestTemplate rest) {
        this.repo = repo;
        this.rest = rest;
    }

    // 1️⃣ Create record from complaint-service
    @PostMapping("/create")
    public ResponseEntity<AdminRecord> createFromComplaint(@RequestBody Map<String, Object> body) {
        Long complaintId = Long.valueOf(body.get("complaintId").toString());

        AdminRecord existing = repo.findByComplaintId(complaintId);
        if (existing != null) return ResponseEntity.ok(existing);

        AdminRecord record = new AdminRecord();
        record.setComplaintId(complaintId);
        record.setComplaintText((String) body.getOrDefault("complaintText", ""));
        record.setStatus("NEW");
        record.setTrackId((String) body.getOrDefault("trackId", null));

        AdminRecord saved = repo.save(record);

        // notify admin
        try {
            Map<String, String> n = Map.of(
                    "to", "admin@example.com",
                    "subject", "New Complaint: " + saved.getComplaintId(),
                    "message", "Complaint created with trackId: " + saved.getTrackId() +
                               ". Assign agent manually."
            );
            rest.postForObject(notifyUrl, n, String.class);
        } catch (Exception ex) {
            System.err.println("Notify failed: " + ex.getMessage());
        }

        return ResponseEntity.ok(saved);
    }

    // 2️⃣ Assign agent manually
    @PutMapping("/assign/{complaintId}/to/{agentId}")
    public ResponseEntity<AdminRecord> assignComplaintManually(
            @PathVariable Long complaintId,
            @PathVariable Long agentId) {

        AdminRecord record = repo.findByComplaintId(complaintId);
        if (record == null) return ResponseEntity.notFound().build();

        record.setAssignedAgentId(agentId);

        // ✅ fetch agent name from agent-service
        try {
            String agentName = rest.getForObject(agentUrl + "/" + agentId + "/name", String.class);
            record.setAssignedAgent(agentName);
        } catch (Exception ex) {
            System.err.println("Agent name fetch fail: " + ex.getMessage());
        }

        record.setStatus("ASSIGNED");
        AdminRecord updated = repo.save(record);

        // ✅ update agent-service (assign complaint)
        try {
            rest.put(agentUrl + "/" + agentId + "/assign/" + complaintId, null);
        } catch (Exception ex) {
            System.err.println("Agent assign fail: " + ex.getMessage());
        }

        // notify admin
        try {
            Map<String, String> n = Map.of(
                    "to", "admin@example.com",
                    "subject", "Complaint Assigned",
                    "message", "Complaint " + updated.getComplaintId() +
                               " assigned to agent " + agentId
            );
            rest.postForObject(notifyUrl, n, String.class);
        } catch (Exception ex) {
            System.err.println("Notify failed: " + ex.getMessage());
        }

        return ResponseEntity.ok(updated);
    }

    // 3️⃣ Reassign / escalation
    @PutMapping("/reassign/{complaintId}/to/{agentId}")
    public ResponseEntity<AdminRecord> reassignComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long agentId) {

        AdminRecord record = repo.findByComplaintId(complaintId);
        if (record == null) return ResponseEntity.notFound().build();

        record.setAssignedAgentId(agentId);

        // ✅ fetch agent name from agent-service
        try {
            String agentName = rest.getForObject(agentUrl + "/" + agentId + "/name", String.class);
            record.setAssignedAgent(agentName);
        } catch (Exception ex) {
            System.err.println("Agent name fetch fail: " + ex.getMessage());
        }

        record.setStatus("REASSIGNED_HIGH_PRIORITY");
        AdminRecord updated = repo.save(record);

        // update agent-service automatically
        try {
            rest.put(agentUrl + "/" + agentId + "/assign/" + complaintId, null);
        } catch (Exception ex) {
            System.err.println("Agent reassign fail: " + ex.getMessage());
        }

        // notify admin
        try {
            Map<String, String> n = Map.of(
                    "to", "admin@example.com",
                    "subject", "High Priority Reassignment",
                    "message", "Complaint " + updated.getComplaintId() +
                               " reassigned to agent " + agentId
            );
            rest.postForObject(notifyUrl, n, String.class);
        } catch (Exception ex) {
            System.err.println("Notify failed: " + ex.getMessage());
        }

        // update tracking service
        if (updated.getTrackId() != null) {
            try {
                Map<String, String> t = Map.of(
                        "trackId", updated.getTrackId(),
                        "status", updated.getStatus()
                );
                rest.postForObject(trackingUrl, t, String.class);
            } catch (Exception ex) {
                System.err.println("Tracking update failed: " + ex.getMessage());
            }
        }

        return ResponseEntity.ok(updated);
    }

    // 4️⃣ get all admin records
    @GetMapping("/all")
    public ResponseEntity<List<AdminRecord>> all() {
        return ResponseEntity.ok(repo.findAll());
    }

    // 5️⃣ get a complaint record by complaintId
    @GetMapping("/byComplaint/{complaintId}")
    public ResponseEntity<AdminRecord> getByComplaint(@PathVariable Long complaintId) {
        AdminRecord r = repo.findByComplaintId(complaintId);
        if (r == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(r);
    }

    // ✅ 6️⃣ Update status by complaintId (called by agent-service)
    @PutMapping("/byComplaint/{complaintId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long complaintId, @RequestParam String status) {
        AdminRecord record = repo.findByComplaintId(complaintId);
        if (record == null) return ResponseEntity.notFound().build();

        record.setStatus(status);
        repo.save(record);

        // Optional: Update tracking service
        if (record.getTrackId() != null) {
            try {
                Map<String, String> trackingPayload = Map.of(
                        "trackId", record.getTrackId(),
                        "status", status,
                        "lastUpdatedBy", "ADMIN"
                );
                rest.postForObject(trackingUrl, trackingPayload, String.class);
            } catch (Exception ex) {
                System.err.println("Tracking update failed: " + ex.getMessage());
            }
        }

        return ResponseEntity.ok().build();
    }
}
