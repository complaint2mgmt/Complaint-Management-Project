package com.elara.agent.model;

import jakarta.persistence.*;

@Entity
@Table(name = "agents")
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String status; // IDLE / ASSIGNED / RESOLVED / etc
    private Long assignedComplaintId;
    private String assignedComplaint;
    private String email;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getassignedComplaint() { return assignedComplaint; }
    public void setassignedComplaint(String assignedComplaint) { this.assignedComplaint = assignedComplaint; }

    public Long getAssignedComplaintId() { return assignedComplaintId; }
    public void setAssignedComplaintId(Long assignedComplaintId) { this.assignedComplaintId = assignedComplaintId; }
}
