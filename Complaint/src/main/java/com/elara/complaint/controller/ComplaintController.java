package com.elara.complaint.controller;

import com.elara.complaint.model.Complaint;
import com.elara.complaint.repo.ComplaintRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepo repo;
    private final RestTemplate rest;

    @Value("${admin.service.url}")
    private String adminUrl;

    @Value("${tracking.service.url}")
    private String trackingUrl;

    @Value("${notification.service.url}")
    private String notifyUrl;

    public ComplaintController(ComplaintRepo repo, RestTemplate rest) {
        this.repo = repo;
        this.rest = rest;
    } 

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint c) {
        // 1️⃣ Generate short Track ID and default status
        String trackId = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        c.setTrackId(trackId);
        c.setStatus("NEW");
        Complaint saved = repo.save(c);

        // 2️⃣ Create admin record (fire-and-forget)
        try {
            Map<String, Object> adminDto = Map.of(
                "complaintId", saved.getId(),
                "complaintText", saved.getComplaintText(),
                "status", saved.getStatus(),
                "trackId", saved.getTrackId()
            );
            rest.postForObject(adminUrl + "/create", adminDto, String.class);
        } catch (Exception ex) {
            System.err.println("Admin create failed: " + ex.getMessage());
        }

        // 3️⃣ Create tracking record
        try {
            Map<String, String> trackingDto = Map.of(
                "trackId", saved.getTrackId(),
                "status", "RECEIVED"
            );
            rest.postForObject(trackingUrl, trackingDto, String.class);
        } catch (Exception ex) {
            System.err.println("Tracking create failed: " + ex.getMessage());
        }

        // 4️⃣ Notify user via Notification Service
        try {
            Map<String, String> notifyDto = Map.of(
                "to", saved.getEmail() == null ? "unknown@example.com" : saved.getEmail(),
                "trackId", saved.getTrackId(),
                "status", saved.getStatus(),
                "subject", "Complaint Received: " + saved.getTrackId()
            );
            rest.postForObject(notifyUrl, notifyDto, String.class);
        } catch (Exception ex) {
            System.err.println("Notify failed: " + ex.getMessage());
        }

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getById(@PathVariable Long id) {
        Optional<Complaint> o = repo.findById(id);
        return o.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Complaint> o = repo.findById(id);
        if (o.isEmpty()) return ResponseEntity.notFound().build();

        Complaint c = o.get();
        c.setStatus(status);
        repo.save(c);

        // 🔁 Update tracking record
        try {
            Map<String, String> t = Map.of(
                "trackId", c.getTrackId(),
                "status", status,
                "lastUpdatedBy", "COMPLAINT-SERVICE"
            );
            rest.postForObject(trackingUrl, t, String.class);
        } catch (Exception ex) {
            System.err.println("Tracking update failed: " + ex.getMessage());
        }

        // ✅ Send resolution notification
        if ("RESOLVED".equalsIgnoreCase(status)) {
            try {
                Map<String, String> notifyDto = Map.of(
                    "to", c.getEmail() == null ? "unknown@example.com" : c.getEmail(),
                    "trackId", c.getTrackId(),
                    "status", status,
                    "subject", "Complaint Resolved",
                    "message", "Your complaint was resolved. Thank you for your patience."
                );
                rest.postForObject(notifyUrl, notifyDto, String.class);
            } catch (Exception ex) {
                System.err.println("Resolution mail failed: " + ex.getMessage());
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<Complaint> getByTrack(@PathVariable String trackId) {
        Complaint c = repo.findByTrackId(trackId);
        if (c == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }

    // 📡 Get complaint text by ID (for agent service)
    @GetMapping("/{id}/complaintText")
    public ResponseEntity<String> getComplaintText(@PathVariable Long id) {
        return repo.findById(id)
            .map(c -> ResponseEntity.ok(c.getComplaintText()))
            .orElse(ResponseEntity.notFound().build());
    }
}
