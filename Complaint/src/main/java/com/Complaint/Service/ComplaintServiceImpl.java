package com.Complaint.Service;

import com.Complaint.Model.ComplaintModel;
import com.Complaint.Repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository repository;

    public ComplaintServiceImpl(ComplaintRepository repository) {
        this.repository = repository;
    }

    @Override
    public ComplaintModel createComplaint(ComplaintModel complaint) {
        return repository.save(complaint);
    }

    @Override
    public List<ComplaintModel> getAllComplaints() {
        return repository.findAll();
    }

    @Override
    public Map<String, Long> getComplaintStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("new", repository.countByStatus("NEW"));
        stats.put("pending", repository.countByStatus("PENDING"));
        stats.put("resolved", repository.countByStatus("RESOLVED"));
        stats.put("escalated", repository.countByStatus("ESCALATED"));
        return stats;
    }
    @Override
    public ComplaintModel updateStatus(Long id, String status) {
        ComplaintModel complaint = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status);
        return repository.save(complaint);
    }
}
