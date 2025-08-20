package com.tele.trackingservice.repository;

import com.tele.trackingservice.model.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
    Optional<Tracking> findByTrackId(String trackId);
}