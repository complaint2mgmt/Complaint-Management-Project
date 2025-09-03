package com.elara.tracking.controller;

import com.elara.tracking.model.TrackingRecord;
import com.elara.tracking.repo.TrackingRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class TrackingController {

    private final TrackingRepo repo;
    private final RestTemplate rest;

    @Value("${notification.service.url}")
    private String notifyUrl;

    public TrackingController(TrackingRepo repo, RestTemplate rest) {
        this.repo = repo;
        this.rest = rest;
    }

    @PostMapping
    public ResponseEntity<TrackingRecord> addOrUpdate(@RequestBody Map<String, String> body) {
        String trackId = body.get("trackId");
        if (trackId == null || trackId.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // STOP if missing
        }

        String status = body.getOrDefault("status", "NEW");

        // Fetch existing record by trackId
        TrackingRecord record = repo.findByTrackId(trackId)
                .orElseGet(() -> new TrackingRecord(trackId, status));

        // Update status and timestamp
        record.setStatus(status);
        record.setUpdatedAt(LocalDateTime.now());

        // Save to DB (update if exists, insert if new)
        repo.save(record);

        // Notify user
        try {
            Map<String, String> mail = Map.of(
                    "to", body.getOrDefault("email", "user@example.com"),
                    "subject", "Complaint Update: " + trackId,
                    "message", "Your complaint (" + trackId + ") status: " + status
            );
            rest.postForObject(notifyUrl, mail, String.class);
        } catch (Exception ex) {
            System.err.println("Notify fail: " + ex.getMessage());
        }

        return ResponseEntity.ok(record);
    }

    @GetMapping("/{trackId}")
    public ResponseEntity<List<TrackingRecord>> getHistory(@PathVariable String trackId) {
        List<TrackingRecord> history = repo.findByTrackIdOrderByUpdatedAtAsc(trackId);
        return ResponseEntity.ok(history);
    }
}
