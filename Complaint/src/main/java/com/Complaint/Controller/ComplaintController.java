package com.Complaint.Controller;

import com.Complaint.Model.ComplaintModel;
import com.Complaint.Service.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @PostMapping
    public ComplaintModel createComplaint(@RequestBody ComplaintModel complaint) {
        return service.createComplaint(complaint);
    }

    @GetMapping
    public List<ComplaintModel> getAllComplaints() {
        return service.getAllComplaints();
    }

    @GetMapping("/stats")
    public Map<String, Long> getComplaintStats() {
        return service.getComplaintStats();
    }
    
    @PutMapping("/{id}/status")
    public ComplaintModel updateComplaintStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}
