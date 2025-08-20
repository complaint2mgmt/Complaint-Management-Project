
package com.tele.trackingservice.controller;

import com.tele.trackingservice.model.Tracking;
import com.tele.trackingservice.repository.TrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/tracking")
public class TrackingController {

    @Autowired
    private TrackingRepository trackingRepository;

    @GetMapping("/{trackId}")
    public ResponseEntity<Tracking> getTrackingStatus(@PathVariable String trackId) {
        Optional<Tracking> tracking = trackingRepository.findByTrackId(trackId);
        return tracking.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tracking> createOrUpdateTracking(@RequestBody Tracking tracking) {
        Tracking savedTracking = trackingRepository.save(tracking);
        return ResponseEntity.ok(savedTracking);
    }
}