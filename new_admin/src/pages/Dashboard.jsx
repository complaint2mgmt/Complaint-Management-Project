import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import ComplaintTable from "../components/ComplaintTable";
import StatsCard from "../components/StatsCard";
import {
  getComplaints,
  getAgents, // We now import the real getAgents function
  assignComplaint,
  reassignComplaint,
} from "../api";

const Dashboard = ({ onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]); // State to hold the list of agents from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      const [complaintsRes, agentsRes] = await Promise.all([
        getComplaints(),
        getAgents(),
      ]);
      setComplaints(complaintsRes.data);
      setAgents(agentsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please ensure all backend services are running and try again.");
    } finally {
      setLoading(false);
    }
  };

  const refreshComplaints = async () => {
    try {
       const res = await getComplaints();
       setComplaints(res.data);
    } catch (err) {
       console.error("Error refreshing complaints:", err);
    }
  }

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(refreshComplaints, 15000); 
    return () => clearInterval(intervalId);
  }, []);

  const stats = useMemo(() => {
    return {
      new: complaints.filter((c) => c.status === "NEW").length,
      inProgress: complaints.filter((c) => c.status === "ASSIGNED").length,
      resolved: complaints.filter((c) => c.status === "RESOLVED").length,
      slaBreach: complaints.filter((c) => c.status === "REASSIGNED_HIGH_PRIORITY").length,
    };
  }, [complaints]);

  const handleAssign = async (complaintId, agentId) => {
    try {
      await assignComplaint(complaintId, agentId);
      refreshComplaints();
    } catch (err) {
      console.error("Error assigning complaint:", err);
      alert("Failed to assign complaint.");
    }
  };

  const handleReassign = async (complaintId, agentId) => {
    try {
      await reassignComplaint(complaintId, agentId);
      refreshComplaints();
    } catch (err) {
      console.error("Error reassigning complaint:", err);
      alert("Failed to reassign complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={onLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Complaints Overview
          </h1>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="New Complaints" value={stats.new} />
            <StatsCard title="In Progress" value={stats.inProgress} />
            <StatsCard title="SLA Breaches" value={stats.slaBreach} isWarning />
            <StatsCard title="Resolved" value={stats.resolved} />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Manage Complaints
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : error ? (
            <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>
          ) : (
            <ComplaintTable
              complaints={complaints}
              agents={agents}
              onAssign={handleAssign}
              onReassign={handleReassign}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
