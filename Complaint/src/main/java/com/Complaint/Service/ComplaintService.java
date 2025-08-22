package com.Complaint.Service;

import com.Complaint.Model.ComplaintModel;
import java.util.List;
import java.util.Map;

public interface ComplaintService {
    ComplaintModel createComplaint(ComplaintModel complaint);
    List<ComplaintModel> getAllComplaints();
    Map<String, Long> getComplaintStats();
    ComplaintModel updateStatus(Long id, String status);
}
