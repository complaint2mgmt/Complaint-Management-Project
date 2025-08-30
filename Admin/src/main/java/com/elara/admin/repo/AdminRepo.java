package com.elara.admin.repo;

import com.elara.admin.model.AdminRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<AdminRecord, Long> {
    AdminRecord findByComplaintId(Long complaintId);
}
