package com.elara.agent.controller;

import com.elara.agent.model.Agent;
import com.elara.agent.repo.AgentRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentRepo repo;
    private final RestTemplate rest;

    @Value("${admin.service.url}")
    private String adminUrl;

    @Value("${complaint.service.url}")
    private String complaintUrl;

    @Value("${tracking.service.url}")
    private String trackingUrl;

    public AgentController(AgentRepo repo, RestTemplate rest) {
        this.repo = repo;
        this.rest = rest;
    }

    // 1️⃣ Create agent
    @PostMapping
    public ResponseEntity<Agent> create(@RequestBody Agent a) {
        a.setStatus("IDLE");
        return ResponseEntity.ok(repo.save(a));
    }

    // 2️⃣ Get agent name (for admin-service)
    @GetMapping("/{id}/name")
    public ResponseEntity<String> getName(@PathVariable Long id) {
        return repo.findById(id)
                .map(agent -> ResponseEntity.ok(agent.getName()))
                .orElse(ResponseEntity.notFound().build());
    }

    // 3️⃣ Assign complaint to agent (used by admin-service)
    @PutMapping("/{id}/assign/{complaintId}")
    public ResponseEntity<?> assign(@PathVariable Long id, @PathVariable Long complaintId) {
        return repo.findById(id).map(agent -> {

            agent.setAssignedComplaintId(complaintId);

            // ✅ fetch complaint text from complaint-service
            try {
                String text = rest.getForObject(complaintUrl + "/" + complaintId + "/complaintText", String.class);
                agent.setassignedComplaint(text);
            } catch (Exception ex) {
                System.err.println("Complaint text fetch fail: " + ex.getMessage());
            }

            agent.setStatus("ASSIGNED");
            repo.save(agent);

            // ✅ Update complaint-service status
            try {
                rest.put(complaintUrl + "/" + complaintId + "/status?status=ASSIGNED", null);
            } catch (Exception ex) {
                System.err.println("Complaint update fail: " + ex.getMessage());
            }

            // ✅ Update admin-service status
            try {
                rest.put(adminUrl + "/byComplaint/" + complaintId + "/status?status=ASSIGNED", null);
            } catch (Exception ex) {
                System.err.println("Admin update fail: " + ex.getMessage());
            }

            // ✅ Update tracking-service
            try {
                Map<String, String> t = Map.of(
                        "trackId", "C-" + complaintId,
                        "status", "ASSIGNED",
                        "lastUpdatedBy", "AGENT"
                );
                rest.postForObject(trackingUrl, t, String.class);
            } catch (Exception ex) {
                System.err.println("Tracking update fail: " + ex.getMessage());
            }

            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4️⃣ Update status (by agent)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return repo.findById(id).map(agent -> {
            agent.setStatus(status);
            repo.save(agent);

            if (agent.getAssignedComplaintId() != null) {
                Long cid = agent.getAssignedComplaintId();

                // update Complaint-service
                try {
                    rest.put(complaintUrl + "/" + cid + "/status?status=" + status, null);
                } catch (Exception ex) {
                    System.err.println("Complaint update fail: " + ex.getMessage());
                }

                // update Admin-service
                try {
                    rest.put(adminUrl + "/byComplaint/" + cid + "/status?status=" + status, null);
                } catch (Exception ex) {
                    System.err.println("Admin update fail: " + ex.getMessage());
                }

                // update Tracking-service
                try {
                    Map<String, String> t = Map.of(
                            "trackId", "C-" + cid,
                            "status", status,
                            "lastUpdatedBy", "AGENT"
                    );
                    rest.postForObject(trackingUrl, t, String.class);
                } catch (Exception ex) {
                    System.err.println("Tracking update fail: " + ex.getMessage());
                }
            }

            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // 5️⃣ Get agent details
    @GetMapping("/{id}")
    public ResponseEntity<Agent> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
