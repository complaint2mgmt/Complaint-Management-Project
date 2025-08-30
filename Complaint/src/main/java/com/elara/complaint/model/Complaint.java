package com.elara.complaint.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phoneNo;

    @Column(length = 2000)
    private String complaintText;

    private String status;

    @Column(unique = true)
    private String trackId;

    // Default constructor
    public Complaint() {
    }

    // auto generate trackId & default status before insert
    @PrePersist
    public void onCreate() {
        if (this.status == null) {
            this.status = "NEW";
        }
        // Always override trackId
        this.trackId = generateTrackId();
    }

    private String generateTrackId() {
        // Date + Time part (yyyyMMddHHmm)
        String dateTimePart = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));

        // Random 2 uppercase letters
        String letters = getRandomLetters(2);

        return "tck" + dateTimePart + letters;  // lowercase prefix
    }

    private String getRandomLetters(int length) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(alphabet.charAt(random.nextInt(alphabet.length())));
        }
        return sb.toString();
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public String getComplaintText() { return complaintText; }
    public void setComplaintText(String complaintText) { this.complaintText = complaintText; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTrackId() { return trackId; }
    public void setTrackId(String trackId) { this.trackId = trackId; }
}
