package com.project.complaintservice.controller;

import com.project.complaintservice.model.ComplaintModel;
import com.project.complaintservice.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Create new complaint
    @PostMapping
    public ComplaintModel createComplaint(@RequestBody ComplaintModel complaint) {
        return complaintService.createComplaint(complaint);
    }

    // Get complaint by track ID
    @GetMapping("/{trackId}")
    public ComplaintModel getComplaintByTrackId(@PathVariable String trackId) {
        return complaintService.getComplaintByTrackId(trackId);
    }

    // Update complaint status manually
    @PutMapping("/{trackId}")
    public ComplaintModel updateStatus(
            @PathVariable String trackId,
            @RequestParam String status) {
        return complaintService.updateStatus(trackId, status);
    }
}
