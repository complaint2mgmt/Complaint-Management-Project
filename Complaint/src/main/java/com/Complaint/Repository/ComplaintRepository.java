package com.Complaint.Repository;

import com.Complaint.Model.ComplaintModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComplaintRepository extends JpaRepository<ComplaintModel, Long> {

    @Query("SELECT COUNT(c) FROM ComplaintModel c WHERE c.status = :status")
    long countByStatus(String status);
}
