"use client"

import React, { useState } from "react"
import { AuthModal } from "./auth/AuthModal"
import { ComplaintForm } from "./complaint/ComplaintForm"
import { ComplaintTracker } from "./complaint/ComplaintTracker"
import { FAQSection } from "./faq/FAQSection"

export function ComplaintManagementApp() {
  const [currentView, setCurrentView] = useState("faq") // Changed default to FAQ
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleAuth = async (authMode, formData) => {
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser({
      name: formData.name || "John Doe",
      email: formData.email,
    })
    setIsAuthenticated(true)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const handleComplaintSubmit = async (formData) => {
    // Simulate complaint submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const complaintId = `CMP-${Date.now()}`
    alert(`Complaint submitted successfully! Your complaint ID is: ${complaintId}`)
  }

  const handleComplaintTrack = async (complaintId) => {
    // Simulate complaint tracking
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock complaint data
    const mockComplaint = {
      id: complaintId,
      description:
        "Internet service has been intermittent for the past week. Connection drops frequently during video calls and streaming.",
      status: "In Progress",
      category: "Technical Support",
      priority: "High",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: "Technical Support Team",
      estimatedResolution: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    }

    return {
      success: true,
      complaint: mockComplaint,
    }
  }

  const navigationItems = [
    { id: "faq", label: "FAQ", icon: "❓" }, // Moved FAQ to first position
    { id: "submit", label: "Submit Complaint", icon: "📝" },
    { id: "track", label: "Track Complaint", icon: "🔍" },
  ]

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        display: "flex",
        flexDirection: "column",
      },
    },
    React.createElement(
      "header",
      { className: "modern-header" },
      React.createElement(
        "div",
        { className: "modern-header-container" },
        React.createElement(
          "div",
          { className: "modern-header-brand" },
          React.createElement(
            "div",
            { className: "brand-logo" },
            React.createElement(
              "svg",
              {
                className: "logo-icon",
                fill: "currentColor",
                viewBox: "0 0 24 24",
              },
              React.createElement("path", {
                d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
              }),
            ),
          ),
          React.createElement(
            "div",
            { className: "brand-text" },
            React.createElement("h1", { className: "modern-brand-name" }, "Verizon"),
            React.createElement("span", { className: "modern-brand-subtitle" }, "Complaint Management"),
          ),
        ),
        React.createElement(
          "div",
          { className: "modern-header-actions" },
          isAuthenticated
            ? [
                React.createElement(
                  "div",
                  { key: "user-info", className: "user-info" },
                  React.createElement("span", { className: "user-avatar" }, user?.name?.charAt(0) || "U"),
                  React.createElement("span", { className: "user-name" }, user?.name || "User"),
                ),
                React.createElement(
                  "button",
                  {
                    key: "logout",
                    onClick: handleLogout,
                    className: "btn btn-outline btn-sm",
                  },
                  "Logout",
                ),
              ]
            : React.createElement(
                "button",
                {
                  onClick: () => setIsAuthModalOpen(true),
                  className: "btn btn-primary btn-sm",
                },
                "Sign In",
              ),
        ),
      ),
    ),

    React.createElement(
      "nav",
      { className: "modern-nav" },
      React.createElement(
        "div",
        { className: "modern-nav-wrapper" },
        React.createElement(
          "ul",
          { className: "modern-nav-list" },
          navigationItems.map((item) =>
            React.createElement(
              "li",
              { key: item.id },
              React.createElement(
                "button",
                {
                  onClick: () => setCurrentView(item.id),
                  className: currentView === item.id ? "modern-nav-item active" : "modern-nav-item",
                },
                React.createElement("span", { className: "nav-icon" }, item.icon),
                React.createElement("span", { className: "nav-label" }, item.label),
              ),
            ),
          ),
        ),
      ),
    ),

    React.createElement(
      "main",
      { className: "main-content" },
      currentView === "faq" && React.createElement(FAQSection), // FAQ is now first
      currentView === "submit" &&
        React.createElement(ComplaintForm, {
          isAuthenticated,
          onAuthRequired: () => setIsAuthModalOpen(true),
          onSubmit: handleComplaintSubmit,
        }),
      currentView === "track" &&
        React.createElement(ComplaintTracker, {
          onTrack: handleComplaintTrack,
        }),
    ),

    React.createElement(
      "footer",
      { className: "app-footer" },
      React.createElement(
        "div",
        { className: "footer-container" },
        React.createElement("p", { className: "footer-text" }, "© 2024 Verizon. All rights reserved."),
        React.createElement(
          "p",
          { className: "footer-subtext" },
          "For immediate assistance, call 1-800-VERIZON or visit your local Verizon store.",
        ),
      ),
    ),
    React.createElement(AuthModal, {
      isOpen: isAuthModalOpen,
      onClose: () => setIsAuthModalOpen(false),
      onAuth: handleAuth,
    }),
  )
}