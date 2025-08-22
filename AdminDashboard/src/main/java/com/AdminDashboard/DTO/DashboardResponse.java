package com.AdminDashboard.DTO;
import java.util.Map;

public class DashboardResponse {
    private Map<String, Long> stats;

    public Map<String, Long> getStats() { return stats; }
    public void setStats(Map<String, Long> stats) { this.stats = stats; }
}
