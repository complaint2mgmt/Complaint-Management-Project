"use client"

import React, { useState } from "react"
import { complaintAPI } from '../../services/api'

// Icon components
const SearchIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-lg",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    }),
  )

const ClockIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    }),
  )

const CheckCircleIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    }),
  )

const AlertCircleIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    }),
  )

const XCircleIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    }),
  )

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case "Submitted":
    case "NEW":
      return "status-submitted"
    case "In Progress":
    case "IN_PROGRESS":
      return "status-in-progress"
    case "Resolved":
    case "RESOLVED":
      return "status-resolved"
    case "Closed":
    case "CLOSED":
      return "status-closed"
    default:
      return "badge-outline"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
    case "HIGH":
      return "priority-high"
    case "Medium":
    case "MEDIUM":
      return "priority-medium"
    case "Low":
    case "LOW":
      return "priority-low"
    default:
      return "badge-outline"
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ComplaintTracker({ onTrack }) {
  const [complaintId, setComplaintId] = useState("")
  const [complaint, setComplaint] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrack = async (e) => {
    e.preventDefault()

    if (!complaintId.trim()) {
      setError("Please enter a track ID")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Call the updated complaintAPI
      const result = await complaintAPI.track(complaintId.trim())
      
      if (result && result.success) {
        setComplaint(result.complaint)
      } else {
        setError("Complaint not found. Please check your track ID.")
        setComplaint(null)
      }
    } catch (error) {
      console.error("Track complaint error:", error)
      setError(error.message || "Failed to track complaint. Please try again.")
      setComplaint(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Submitted":
      case "NEW":
        return React.createElement(ClockIcon)
      case "In Progress":
      case "IN_PROGRESS":
        return React.createElement(AlertCircleIcon)
      case "Resolved":
      case "RESOLVED":
        return React.createElement(CheckCircleIcon)
      case "Closed":
      case "CLOSED":
        return React.createElement(XCircleIcon)
      default:
        return React.createElement(ClockIcon)
    }
  }

  return React.createElement(
    "div",
    { className: "max-w-2xl mx-auto" },
    // Header
    React.createElement(
      "div",
      { className: "text-center mb-8" },
      React.createElement("h1", { className: "text-3xl font-bold mb-4" }, "Track Your Verizon Complaint"),
      React.createElement(
        "p",
        { className: "text-lg", style: { color: "var(--muted-foreground)" } },
        "Enter your complaint ID to check the current status and progress",
      ),
    ),

    // Search form
    React.createElement(
      "div",
      { className: "card mb-6" },
      React.createElement(
        "div",
        { className: "card-header" },
        React.createElement(
          "div",
          { className: "flex items-center gap-2 mb-2" },
          React.createElement(SearchIcon),
          React.createElement("h2", { className: "card-title" }, "Complaint Lookup"),
        ),
        React.createElement("p", { className: "card-description" }, "Enter your track ID (e.g., tck20250901230ZU)"),
      ),
      React.createElement(
        "div",
        { className: "card-content" },
        React.createElement(
          "form",
          {
            onSubmit: handleTrack,
            className: "space-y-4",
          },
          React.createElement(
            "div",
            null,
            React.createElement("input", {
              type: "text",
              value: complaintId,
              onChange: (e) => {
                setComplaintId(e.target.value)
                setError("")
              },
              placeholder: "Enter track ID (tck20250901230ZU)",
              className: "input text-lg",
            }),
            error && React.createElement("p", { className: "form-error" }, error),
          ),
          React.createElement(
            "button",
            {
              type: "submit",
              className: "btn btn-primary w-full",
              disabled: isLoading,
            },
            isLoading ? "Tracking..." : "Track Complaint",
          ),
        ),
      ),
    ),

    // Complaint details - REMOVED description field
    complaint &&
      React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          "div",
          { className: "card-header" },
          React.createElement(
            "div",
            { className: "flex items-center justify-between mb-2" },
            React.createElement("h2", { className: "card-title" }, "Complaint Details"),
            React.createElement(
              "div",
              {
                className: `badge flex items-center gap-1 ${getStatusColor(complaint.status)}`,
              },
              getStatusIcon(complaint.status),
              React.createElement("span", null, complaint.status),
            ),
          ),
          React.createElement("p", { className: "card-description" }, `Complaint ID: ${complaint.id}`),
        ),
        React.createElement(
          "div",
          { className: "card-content space-y-4" },

          // Priority
          React.createElement(
            "div",
            { className: "grid grid-cols-1 gap-4" },
            React.createElement(
              "div",
              null,
              React.createElement("h4", { className: "font-semibold mb-1" }, "Priority"),
              React.createElement(
                "div",
                { className: `badge ${getPriorityColor(complaint.priority)}` },
                complaint.priority,
              ),
            ),
          ),

          // Dates
          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4" },
            React.createElement(
              "div",
              null,
              React.createElement("h4", { className: "font-semibold mb-1" }, "Created"),
              React.createElement(
                "p",
                { className: "text-sm", style: { color: "var(--muted-foreground)" } },
                formatDate(complaint.createdAt),
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement("h4", { className: "font-semibold mb-1" }, "Last Updated"),
              React.createElement(
                "p",
                { className: "text-sm", style: { color: "var(--muted-foreground)" } },
                formatDate(complaint.updatedAt),
              ),
            ),
          ),

          // Assigned to
          complaint.assignedTo &&
            React.createElement(
              "div",
              null,
              React.createElement("h4", { className: "font-semibold mb-1" }, "Assigned To"),
              React.createElement("p", { style: { color: "var(--muted-foreground)" } }, complaint.assignedTo),
            ),

          // Estimated resolution
          complaint.estimatedResolution &&
            React.createElement(
              "div",
              null,
              React.createElement("h4", { className: "font-semibold mb-1" }, "Estimated Resolution"),
              React.createElement(
                "p",
                { className: "text-sm", style: { color: "var(--muted-foreground)" } },
                formatDate(complaint.estimatedResolution),
              ),
            ),

          // What's next section
          React.createElement(
            "div",
            {
              className: "p-4",
              style: { backgroundColor: "var(--muted)", borderRadius: "var(--radius)" },
            },
            React.createElement("h4", { className: "font-semibold mb-2" }, "What's Next?"),
            React.createElement(
              "p",
              { className: "text-sm", style: { color: "var(--muted-foreground)" } },
              (complaint.status === "Submitted" || complaint.status === "NEW") &&
                "Your complaint has been received and will be reviewed by our team shortly.",
              (complaint.status === "In Progress" || complaint.status === "IN_PROGRESS") && 
                "Our team is actively working on resolving your complaint.",
              complaint.status === "Under Review" && "Your complaint is being reviewed by our specialists.",
              (complaint.status === "Resolved" || complaint.status === "RESOLVED") &&
                "Your complaint has been resolved. If you're not satisfied, please contact us.",
              (complaint.status === "Closed" || complaint.status === "CLOSED") && 
                "This complaint has been closed. Thank you for your feedback.",
            ),
          ),
        ),
      ),
  )
}