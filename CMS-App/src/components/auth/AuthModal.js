"use client"

import React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"

const XIcon = () =>
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
      d: "M6 18L18 6M6 6l12 12",
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

const LockIcon = () =>
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
      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    }),
  )

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
    } else if (rule.password && value && value.length < 6) {
      errors[field] = "Password must be at least 6 characters"
      isValid = false
    }
  })

  return { isValid, errors }
}

function AuthModal({ isOpen, onClose, onAuth }) {
  const [authMode, setAuthMode] = useState("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

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

    // Validation rules
    const rules = {
      email: { required: true, email: true },
      password: { required: true, password: true },
    }

    if (authMode === "register") {
      rules.name = { required: true, minLength: 2 }
    }

    const validation = validateForm(formData, rules)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)
    try {
      await onAuth(authMode, formData)
      setFormData({ name: "", email: "", password: "" })
      setErrors({})
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content modern-modal">
        <Card className="modern-card">
          <CardHeader className="modern-card-header">
            <div className="modal-header-content">
              <div className="modal-title-section">
                <div className="modal-accent-bar"></div>
                <CardTitle className="modern-title">
                  {authMode === "login" ? "Welcome Back" : "Join Us Today"}
                </CardTitle>
                <p className="modal-subtitle">
                  {authMode === "login" ? "Sign in to your account" : "Create your new account"}
                </p>
              </div>
              <Button variant="ghost" onClick={onClose} className="modern-close-btn">
                <XIcon />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="modern-card-content">
            <form onSubmit={handleSubmit} className="modern-form">
              {authMode === "register" && (
                <div className="modern-form-group">
                  <label className="modern-form-label">Full Name</label>
                  <div className="modern-input-wrapper">
                    <div className="modern-input-icon">
                      <UserIcon />
                    </div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="modern-input"
                    />
                    <div className="modern-input-border"></div>
                  </div>
                  {errors.name && <p className="modern-form-error">{errors.name}</p>}
                </div>
              )}

              <div className="modern-form-group">
                <label className="modern-form-label">Email</label>
                <div className="modern-input-wrapper">
                  <div className="modern-input-icon">
                    <MailIcon />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="modern-input"
                  />
                  <div className="modern-input-border"></div>
                </div>
                {errors.email && <p className="modern-form-error">{errors.email}</p>}
              </div>

              <div className="modern-form-group">
                <label className="modern-form-label">Password</label>
                <div className="modern-input-wrapper">
                  <div className="modern-input-icon">
                    <LockIcon />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="modern-input"
                  />
                  <div className="modern-input-border"></div>
                </div>
                {errors.password && <p className="modern-form-error">{errors.password}</p>}
              </div>

              <Button type="submit" disabled={isLoading} className="modern-submit-btn">
                <span className="modern-btn-content">
                  {isLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"}
                </span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="modern-card-footer">
            <p className="modern-footer-text">
              {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
              <Button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "register" : "login")
                  setErrors({})
                }}
                variant="ghost"
                className="modern-link-btn"
              >
                {authMode === "login" ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Default export
export default AuthModal

// Named export for backward compatibility
export { AuthModal }
