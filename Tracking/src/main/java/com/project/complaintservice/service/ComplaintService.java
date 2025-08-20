package com.project.complaintservice.service;

import com.project.complaintservice.model.ComplaintModel;

public interface ComplaintService {
	ComplaintModel createComplaint(ComplaintModel complaint);
	ComplaintModel getComplaintByTrackId(String trackId);
	ComplaintModel updateStatus(String trackId, String status); // Manual status update
}
