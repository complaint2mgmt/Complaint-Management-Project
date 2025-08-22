package com.AdminDashboard.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final RestTemplate restTemplate;

    @Value("${complaint.service.url}")
    private String complaintServiceUrl;

    public AdminDashboardController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    @SuppressWarnings("unchecked")
    @GetMapping("/dashboard")
    public Map<String, Long> getDashboardStats() {
        // Append /stats to the base complaint service URL
        String url = complaintServiceUrl + "/stats";
        return restTemplate.getForObject(url, Map.class);
    }
}
