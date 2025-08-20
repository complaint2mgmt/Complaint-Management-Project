package com.project.complaintservice.service;

import com.project.complaintservice.model.ComplaintModel;
import com.project.complaintservice.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository repository;

    @Override
    public ComplaintModel createComplaint(ComplaintModel complaint) {
        complaint.setComplaintDate(LocalDateTime.now());
        complaint.setStatus("Pending");
        complaint.setTrackId(generateTrackId());
        return repository.save(complaint);
    }

    @Override
    public ComplaintModel getComplaintByTrackId(String trackId) {
        return repository.findByTrackId(trackId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    @Override
    public ComplaintModel updateStatus(String trackId, String status) {
    	ComplaintModel complaint = repository.findByTrackId(trackId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status); // Manual update
        return repository.save(complaint);
    }

    private String generateTrackId() {
        String datePart = java.time.LocalDate.now().toString().replace("-", "");
        int randomPart = new Random().nextInt(9000) + 1000; // 4 digit random
        return "tck" + datePart + randomPart;
    }
}