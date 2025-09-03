package com.elara.escalation.repo;

import com.elara.escalation.model.EscalationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EscalationRepo extends JpaRepository<EscalationRecord, Long> {
    
    Optional<EscalationRecord> findByComplaintId(Long complaintId);
    
    @Query("SELECT e FROM EscalationRecord e WHERE e.resolved = false AND e.dueAt < :currentTime")
    List<EscalationRecord> findOverdueEscalations(@Param("currentTime") LocalDateTime currentTime);
    
    @Query("SELECT e FROM EscalationRecord e WHERE e.agentId = :agentId AND e.resolved = false")
    List<EscalationRecord> findActiveEscalationsByAgent(@Param("agentId") Long agentId);
}