package com.elara.notification.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Map<String, String> payload) {
        String to = payload.getOrDefault("to", "user@example.com");
        String trackId = payload.getOrDefault("trackId", "N/A");
        String subject = payload.getOrDefault("subject", "Complaint Notification");
        String status = payload.getOrDefault("status", "NEW");

        // ✅ Different message for different status
        String message;
        if ("RESOLVED".equalsIgnoreCase(status)) {
            message = "Dear Sir/Madam,\n\n"
                    + "✅ Your complaint has been resolved successfully.\n\n"
                    + "Track ID: " + trackId + "\n\n"
                    + "Thank you for your patience\n"
                    + "If you need any help, please feel free to reach us.\n\n"
                    + "Thank You,\n"
                    + "Verizon Complaint Management";
        } else if ("NEW".equalsIgnoreCase(status)) {
            message = "Dear Sir/Madam,\n\n"
                    + "📌 Your complaint has been registered successfully.\n\n"
                    + "Track ID: " + trackId + "\n"
                    + "Current Status: " + status + "\n\n"
                    + "👉 Use this Track ID to check your complaint status in the portal.\n\n"
                    + "Thank You,\n"
                    + "Verizon Complaint Management";
        } else {
            message = "Dear Sir/Madam,\n\n"
                    + "📌 Your complaint status has been updated.\n\n"
                    + "Track ID: " + trackId + "\n"
                    + "Current Status: " + status + "\n\n"
                    + "Thank You,\n"
                    + "Verizon Complaint Management";
        }

        // ✅ Send actual email
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            mailMessage.setFrom("codetestcm5@gmail.com"); // should match your SMTP user

            mailSender.send(mailMessage);

            return ResponseEntity.ok("✅ Notification sent to " + to + " with Track ID: " + trackId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Failed to send email: " + e.getMessage());
        }
    }
}
