import React, { useState } from "react";
import "./Track.css";

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState(null);

  const handleTrackComplaint = (e) => {
    e.preventDefault();
    setComplaintDetails({
      id: complaintId,
      status: "In Progress",
      assignedTo: "Network Team"
    });
  };

  return (
    <section className="track-section">
      <h2>Track Your Complaint</h2>
      <form onSubmit={handleTrackComplaint}>
        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
          required
        />
        <button type="submit">Track</button>
      </form>

      {complaintDetails && (
        <div className="complaint-status">
          <h3>Complaint Details</h3>
          <p><strong>ID:</strong> {complaintDetails.id}</p>
          <p><strong>Status:</strong> {complaintDetails.status}</p>
          <p><strong>Assigned To:</strong> {complaintDetails.assignedTo}</p>
        </div>
      )}
    </section>
  );
};

export default TrackComplaint;
