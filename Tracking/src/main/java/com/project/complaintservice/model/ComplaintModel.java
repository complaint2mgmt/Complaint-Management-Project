package com.project.complaintservice.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Table(name = "complaints")
public class ComplaintModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "track_id", unique = true, nullable = false)
    private String trackId;

    @Column(name = "phone_no")
    private String phoneNo;

    private String email;

    @Column(name = "complaint_text")
    private String complaintText;

    @Column(name = "complaint_date", updatable = false)
    private LocalDateTime complaintDate;
    private String status;

    @PrePersist
    public void onCreate() {
        this.complaintDate = LocalDateTime.now();
        if (this.status == null) {
            this.status = "Complaint Received";
        }
        if (this.trackId == null) {
            this.trackId = generateTrackId();
        }
    }

    private String generateTrackId() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String randomPart = UUID.randomUUID().toString()
                .replaceAll("[^A-Za-z0-9]", "")
                .substring(0, 5)
                .toUpperCase();
        return "TCK" + datePart + randomPart;
    }

    public Long getId() {
    	return id; 
    	
    }
    public String getTrackId() {
    	return trackId; 
    	}
    public void setTrackId(String trackId) {
    	this.trackId = trackId; 
    	}
    
    public String getPhoneNo() {
    	return phoneNo; 
    	}
    public void setPhoneNo(String phoneNo) {
    	this.phoneNo = phoneNo; 
    	}
    
    public String getEmail() {
    	return email; 
    	}
    public void setEmail(String email) {
    	this.email = email; 
    	}
    
    public String getComplaintText() {
    	return complaintText; 
    	}
    public void setComplaintText(String complaintText) {
    	this.complaintText = complaintText; 
    	}
    
    public LocalDateTime getComplaintDate() {
    	return complaintDate; 
    	}
    public void setComplaintDate(LocalDateTime complaintDate) {
    	this.complaintDate = complaintDate; 
    	}
    
    public String getStatus() {
    	return status; 
    	}
    public void setStatus(String status) {
    	this.status = status; 
    	}
}