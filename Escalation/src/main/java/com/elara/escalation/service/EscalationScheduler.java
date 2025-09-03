package com.elara.escalation.service;

import com.elara.escalation.model.EscalationRecord;
import com.elara.escalation.repo.EscalationRepo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class EscalationScheduler {

    private final EscalationRepo repo;
    private final EscalationService escalationService;

    public EscalationScheduler(EscalationRepo repo, EscalationService escalationService) {
        this.repo = repo;
        this.escalationService = escalationService;
    }

    // Check every 30 seconds for overdue complaints
    @Scheduled(fixedRate = 30000) 
    public void checkForOverdueComplaints() {
        System.out.println("🔍 Checking for overdue complaints at " + LocalDateTime.now());
        
        List<EscalationRecord> overdueEscalations = repo.findOverdueEscalations(LocalDateTime.now());
        
        for (EscalationRecord escalation : overdueEscalations) {
            if (!escalation.isEscalated() && !escalation.isResolved()) {
                System.out.println("⏰ Found overdue complaint: " + escalation.getComplaintId());
                escalationService.escalateOverdueComplaint(escalation);
            }
        }
        
        if (overdueEscalations.isEmpty()) {
            System.out.println("✅ No overdue complaints found");
        }
    }
}