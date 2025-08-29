"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"

// Icon components
const AlertCircleIcon = () =>
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
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    }),
  )

const SendIcon = () =>
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
      d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    }),
  )

const UserIcon = () =>
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
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    }),
  )

const MailIcon = () =>
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
      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    }),
  )

const MessageSquareIcon = () =>
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
      d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    }),
  )

// Simple validation function
const validateForm = (formData, rules) => {
  const errors = {}
  let isValid = true

  Object.keys(rules).forEach((field) => {
    const rule = rules[field]
    const value = formData[field]

    if (rule.required && (!value || value.trim() === "")) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      isValid = false
    } else if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = "Please enter a valid email address"
      isValid = false
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rule.minLength} characters`
      isValid = false
    }
  })

  return { isValid, errors }
}

export function ComplaintForm({ isAuthenticated, onAuthRequired, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    // Validation rules
    const rules = {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      complaint: { required: true, minLength: 10 },
    }

    const validation = validateForm(formData, rules)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form on successful submission
      setFormData({ name: "", email: "", complaint: "" })
      setErrors({})
    } catch (error) {
      console.error("Complaint submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return React.createElement(
    "div",
    { className: "max-w-2xl mx-auto" },
    // Header
    React.createElement(
      "div",
      { className: "text-center mb-8" },
      React.createElement("h1", { className: "page-title" }, "Register a Complaint with Verizon"),
      React.createElement(
        "p",
        { className: "page-description" },
        "We're here to help resolve your concerns quickly and efficiently",
      ),
    ),

    // Authentication warning
    !isAuthenticated &&
      React.createElement(
        "div",
        { className: "alert alert-warning" },
        React.createElement(AlertCircleIcon),
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "alert-title" }, "Authentication Required"),
          React.createElement(
            "p",
            { className: "alert-description" },
            "Please sign in to register a complaint and track its progress.",
          ),
        ),
      ),

    // Main form card
    React.createElement(
      Card,
      { className: "modern-card" },
      React.createElement(
        CardHeader,
        { className: "modern-card-header" },
        React.createElement(
          "div",
          { className: "flex items-center gap-2 mb-2" },
          React.createElement(MessageSquareIcon),
          React.createElement(CardTitle, { className: "modern-title" }, "Complaint Details"),
        ),
        React.createElement(
          CardDescription,
          { className: "modern-description" },
          "Please provide your details and describe your complaint clearly",
        ),
      ),
      React.createElement(
        CardContent,
        { className: "modern-card-content" },
        React.createElement(
          "form",
          {
            onSubmit: handleSubmit,
            className: "modern-form",
          },
          // Name field
          React.createElement(
            "div",
            { className: "modern-form-group" },
            React.createElement("label", { className: "modern-form-label" }, "Full Name"),
            React.createElement(
              "div",
              { className: "modern-input-wrapper" },
              React.createElement("div", { className: "modern-input-icon" }, React.createElement(UserIcon)),
              React.createElement(Input, {
                type: "text",
                name: "name",
                value: formData.name,
                onChange: handleInputChange,
                placeholder: "Enter your full name",
                disabled: !isAuthenticated,
                className: "modern-input",
              }),
              React.createElement("div", { className: "modern-input-border" }),
            ),
            errors.name && React.createElement("p", { className: "modern-form-error" }, errors.name),
          ),

          // Email field
          React.createElement(
            "div",
            { className: "modern-form-group" },
            React.createElement("label", { className: "modern-form-label" }, "Email Address"),
            React.createElement(
              "div",
              { className: "modern-input-wrapper" },
              React.createElement("div", { className: "modern-input-icon" }, React.createElement(MailIcon)),
              React.createElement(Input, {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleInputChange,
                placeholder: "Enter your email address",
                disabled: !isAuthenticated,
                className: "modern-input",
              }),
              React.createElement("div", { className: "modern-input-border" }),
            ),
            errors.email && React.createElement("p", { className: "modern-form-error" }, errors.email),
          ),

          // Complaint field
          React.createElement(
            "div",
            { className: "modern-form-group" },
            React.createElement("label", { className: "modern-form-label" }, "Complaint Description"),
            React.createElement(
              "div",
              { className: "modern-textarea-wrapper" },
              React.createElement(Textarea, {
                name: "complaint",
                value: formData.complaint,
                onChange: handleInputChange,
                placeholder: "Please describe your complaint in detail...",
                disabled: !isAuthenticated,
                rows: 5,
                className: "modern-textarea",
              }),
              React.createElement("div", { className: "modern-input-border" }),
            ),
            errors.complaint && React.createElement("p", { className: "modern-form-error" }, errors.complaint),
            React.createElement("p", { className: "modern-form-description" }, "Minimum 10 characters required"),
          ),

          // Submit button
          React.createElement(
            Button,
            {
              type: "submit",
              disabled: !isAuthenticated || isSubmitting,
              onClick: !isAuthenticated ? onAuthRequired : undefined,
              className: "modern-submit-btn",
            },
            React.createElement(
              "span",
              { className: "modern-btn-content" },
              isSubmitting
                ? "Submitting..."
                : !isAuthenticated
                  ? "Sign In to Submit Complaint"
                  : [
                      React.createElement(SendIcon, { key: "icon" }),
                      React.createElement("span", { key: "text" }, "Submit Complaint"),
                    ],
            ),
          ),
        ),
      ),
    ),
  )
}
