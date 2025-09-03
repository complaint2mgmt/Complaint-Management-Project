package com.elara.tracking.repo;

import com.elara.tracking.model.TrackingRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface TrackingRepo extends JpaRepository<TrackingRecord, Long> {

    // Fetch exact record for trackId
    Optional<TrackingRecord> findByTrackId(String trackId);

    // Full history if needed
    List<TrackingRecord> findByTrackIdOrderByUpdatedAtAsc(String trackId);
}
