package com.elara.escalation.controller;

import com.elara.escalation.model.EscalationRecord;
import com.elara.escalation.service.EscalationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escalations")
public class EscalationController {

    private final EscalationService escalationService;

    public EscalationController(EscalationService escalationService) {
        this.escalationService = escalationService;
    }

    // Called when admin assigns complaint to agent
    @PostMapping("/create/{complaintId}/agent/{agentId}")
    public ResponseEntity<EscalationRecord> createEscalation(
            @PathVariable Long complaintId, 
            @PathVariable Long agentId) {
        
        EscalationRecord escalation = escalationService.createEscalation(complaintId, agentId);
        return ResponseEntity.ok(escalation);
    }

    // Called when agent updates complaint status
    @PutMapping("/update/{complaintId}/status")
    public ResponseEntity<EscalationRecord> updateStatus(
            @PathVariable Long complaintId,
            @RequestParam String status) {
        
        EscalationRecord updated = escalationService.updateComplaintStatus(complaintId, status);
        return ResponseEntity.ok(updated);
    }

    // Get escalation details
    @GetMapping("/{complaintId}")
    public ResponseEntity<EscalationRecord> getEscalation(@PathVariable Long complaintId) {
        return escalationService.getEscalationByComplaintId(complaintId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all active escalations
    @GetMapping("/active")
    public ResponseEntity<List<EscalationRecord>> getActiveEscalations() {
        return ResponseEntity.ok(escalationService.getAllActiveEscalations());
    }
}