import axios from "axios";

// This file configures the connection to your backend.

// Fetches the list of complaints from the Admin service (port 8082 via proxy)
export const getComplaints = () => {
    return axios.get("/api/admin/all");
};

// Fetches the list of all agents via the Admin service
export const getAgents = () => {
    return axios.get("/api/agents/all");
};

// Assigns a complaint to an agent via the Admin service
export const assignComplaint = (complaintId, agentId) => {
    return axios.put(`/api/admin/assign/${complaintId}/to/${agentId}`);
};

// Reassigns a complaint to an agent via the Admin service
export const reassignComplaint = (complaintId, agentId) => {
    return axios.put(`/api/admin/reassign/${complaintId}/to/${agentId}`);
};
