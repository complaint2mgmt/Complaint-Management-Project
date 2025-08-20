package com.project.complaintservice.repository;

import com.project.complaintservice.model.ComplaintModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<ComplaintModel, Long> {

    // Find complaint by trackId
    Optional<ComplaintModel> findByTrackId(String trackId);
}