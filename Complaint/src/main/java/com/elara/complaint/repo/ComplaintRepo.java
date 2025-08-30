package com.elara.complaint.repo;

import com.elara.complaint.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepo extends JpaRepository<Complaint, Long> {
    Complaint findByTrackId(String trackId);
}
