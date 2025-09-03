"use client"

import React from "react"
import { useState, useEffect } from "react"

// Enhanced User Storage System with Event System and Singleton Profile Management
const userStorage = {
  users: [
    // Demo user for testing
    { id: 1, name: "Demo User", email: "demo@example.com", password: "demo123" }
  ],
  currentUser: null,
  listeners: [], // Event listeners for user state changes
  activeProfileId: null, // Track which component should show the profile

  // Add event listener
  addListener(callback) {
    this.listeners.push(callback)
  },

  // Remove event listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  },

  // Notify all listeners of user state change
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentUser))
  },

  // Register a component to show user profile (only one can be active)
  registerProfileComponent(componentId) {
    this.activeProfileId = componentId
    this.notifyListeners()
  },

  // Check if a component should show the profile
  shouldShowProfile(componentId) {
    return this.activeProfileId === componentId && this.currentUser !== null
  },

  // Clear active profile component
  clearActiveProfile() {
    this.activeProfileId = null
    this.notifyListeners()
  },

  // Register new user
  register(userData) {
    const existingUser = this.users.find(user => user.email === userData.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }
    
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    }
    
    this.users.push(newUser)
    this.currentUser = { ...newUser }
    delete this.currentUser.password // Don't expose password
    this.notifyListeners() // Notify all components
    return this.currentUser
  },

  // Login user
  login(email, password) {
    const user = this.users.find(user => 
      user.email === email && user.password === password
    )
    
    if (!user) {
      throw new Error("Invalid email or password")
    }
    
    this.currentUser = { ...user }
    delete this.currentUser.password // Don't expose password
    this.notifyListeners() // Notify all components
    return this.currentUser
  },

  // Logout user
  logout() {
    this.currentUser = null
    this.clearActiveProfile() // Clear active profile when logging out
    this.notifyListeners() // Notify all components
  },

  // Get current user
  getCurrentUser() {
    return this.currentUser
  },

  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null
  }
}

// Global user session hook with singleton profile management
function useUserSession(componentId = null) {
  const [user, setUser] = useState(userStorage.getCurrentUser())
  const [shouldShowProfile, setShouldShowProfile] = useState(false)

  useEffect(() => {
    const handleUserChange = (newUser) => {
      setUser(newUser)
      if (componentId) {
        setShouldShowProfile(userStorage.shouldShowProfile(componentId))
      }
    }

    userStorage.addListener(handleUserChange)
    
    // Register this component to potentially show profile if it has an ID
    if (componentId && userStorage.getCurrentUser()) {
      userStorage.registerProfileComponent(componentId)
      setShouldShowProfile(true)
    }
    
    return () => {
      userStorage.removeListener(handleUserChange)
    }
  }, [componentId])

  return {
    user,
    shouldShowProfile: componentId ? shouldShowProfile : false,
    login: (email, password) => {
      const loggedInUser = userStorage.login(email, password)
      if (componentId) {
        userStorage.registerProfileComponent(componentId)
        setShouldShowProfile(true)
      }
      return loggedInUser
    },
    register: (userData) => {
      const newUser = userStorage.register(userData)
      if (componentId) {
        userStorage.registerProfileComponent(componentId)
        setShouldShowProfile(true)
      }
      return newUser
    },
    logout: () => userStorage.logout(),
    isLoggedIn: () => userStorage.isLoggedIn()
  }
}

// Your existing icons (preserved exactly)
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

// Your existing UI components (preserved exactly)
const Button = ({ children, variant = "default", className = "", ...props }) => (
  React.createElement("button", {
    className: `button ${variant === "ghost" ? "button-ghost" : "button-primary"} ${className}`,
    ...props
  }, children)
)

const Input = ({ className = "", ...props }) => (
  React.createElement("input", {
    className: `input ${className}`,
    ...props
  })
)

const Card = ({ children, className = "", ...props }) => (
  React.createElement("div", {
    className: `card ${className}`,
    ...props
  }, children)
)

const CardHeader = ({ children, className = "", ...props }) => (
  React.createElement("div", {
    className: `card-header ${className}`,
    ...props
  }, children)
)

const CardTitle = ({ children, className = "", ...props }) => (
  React.createElement("h2", {
    className: `card-title ${className}`,
    ...props
  }, children)
)

const CardContent = ({ children, className = "", ...props }) => (
  React.createElement("div", {
    className: `card-content ${className}`,
    ...props
  }, children)
)

const CardFooter = ({ children, className = "", ...props }) => (
  React.createElement("div", {
    className: `card-footer ${className}`,
    ...props
  }, children)
)

// Your existing validation function (preserved exactly)
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

// Fixed User Profile Component - only renders if it's the main instance
function UserProfile({ user, onLogout, isMainInstance = true }) {
  // Only render if this is the main instance to prevent duplicates
  if (!isMainInstance || !user) return null

  return React.createElement(
    "div",
    {
      className: "user-profile",
      style: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e5e7eb',
        minWidth: '250px',
        zIndex: 1000
      }
    },
    React.createElement(
      "div",
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }
      },
      React.createElement(
        "div",
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }
        },
        React.createElement(
          "div",
          {
            style: {
              width: '32px',
              height: '32px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          },
          // Show user's initials instead of icon
          user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : React.createElement(UserIcon)
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            {
              style: {
                fontWeight: '500',
                color: '#1f2937',
                margin: '0',
                fontSize: '14px'
              }
            },
            user.name || 'Unknown User'
          ),
          React.createElement(
            "p",
            {
              style: {
                fontSize: '12px',
                color: '#6b7280',
                margin: '0'
              }
            },
            user.email || 'No email'
          )
        )
      )
    ),
    React.createElement(
      Button,
      {
        onClick: onLogout,
        variant: "ghost",
        style: {
          width: '100%',
          color: '#dc2626',
          backgroundColor: 'transparent',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          padding: '8px 12px',
          fontSize: '14px'
        }
      },
      "Logout"
    )
  )
}

// FIXED: Enhanced AuthModal Component - removed UserProfile rendering to prevent duplicates
function AuthModal({ isOpen, onClose, onAuth, componentId = "main-auth" }) {
  const { user, login, register, logout } = useUserSession(componentId)
  const [authMode, setAuthMode] = useState("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [authMessage, setAuthMessage] = useState("")

  // Reset form when auth mode changes
  useEffect(() => {
    setFormData({ name: "", email: "", password: "" })
    setErrors({})
    setAuthMessage("")
  }, [authMode])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    // Clear auth message
    if (authMessage) {
      setAuthMessage("")
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

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
      let authenticatedUser
      if (authMode === "login") {
        authenticatedUser = login(formData.email, formData.password)
        setAuthMessage("Login successful! Welcome back.")
      } else {
        authenticatedUser = register(formData)
        setAuthMessage("Account created successfully! You are now logged in.")
      }
      
      setFormData({ name: "", email: "", password: "" })
      setErrors({})
      
      // Call the original onAuth callback for backward compatibility
      if (onAuth) {
        await onAuth(authMode, formData)
      }
      
      // Close modal after successful auth
      setTimeout(() => {
        onClose()
        setAuthMessage("")
      }, 2000)
      
    } catch (error) {
      setAuthMessage(error.message)
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // FIXED: Removed UserProfile rendering from AuthModal
  // The UserProfile should be rendered separately in your main app component
  // This prevents duplicate logout buttons

  // Don't show modal if not open
  if (!isOpen) return null

  // Show auth modal if not logged in
  return React.createElement(
    "div",
    {
      className: "modal-overlay",
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }
    },
    React.createElement(
      "div",
      {
        className: "modal-content modern-modal",
        style: {
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '400px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }
      },
      React.createElement(
        Card,
        { className: "modern-card" },
        React.createElement(
          CardHeader,
          { className: "modern-card-header" },
          React.createElement(
            "div",
            { className: "modal-header-content" },
            React.createElement(
              "div",
              { className: "modal-title-section" },
              React.createElement("div", { className: "modal-accent-bar" }),
              React.createElement(
                CardTitle,
                { className: "modern-title" },
                authMode === "login" ? "Welcome Back" : "Join Us Today"
              ),
              React.createElement(
                "p",
                { 
                  className: "modal-subtitle",
                  style: {
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: '4px 0 0 0'
                  }
                },
                authMode === "login" ? "Sign in to your account" : "Create your new account"
              )
            ),
            React.createElement(
              Button,
              {
                variant: "ghost",
                onClick: onClose,
                className: "modern-close-btn",
                style: {
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '8px',
                  backgroundColor: 'transparent'
                }
              },
              React.createElement(XIcon)
            )
          )
        ),

        React.createElement(
          CardContent,
          { className: "modern-card-content" },
          authMessage && React.createElement(
            "div",
            {
              style: {
                marginBottom: '16px',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: authMessage.includes('successful') ? '#f0fdf4' : '#fef2f2',
                color: authMessage.includes('successful') ? '#166534' : '#dc2626',
                border: `1px solid ${authMessage.includes('successful') ? '#bbf7d0' : '#fecaca'}`,
                fontSize: '14px'
              }
            },
            authMessage
          ),

          React.createElement(
            "div",
            { className: "modern-form" },
            authMode === "register" && React.createElement(
              "div",
              { className: "modern-form-group" },
              React.createElement(
                "label",
                { 
                  className: "modern-form-label",
                  style: {
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }
                },
                "Full Name"
              ),
              React.createElement(
                "div",
                { className: "modern-input-wrapper" },
                React.createElement(
                  "div",
                  { 
                    className: "modern-input-icon",
                    style: {
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af',
                      zIndex: 1
                    }
                  },
                  React.createElement(UserIcon)
                ),
                React.createElement(Input, {
                  type: "text",
                  name: "name",
                  value: formData.name,
                  onChange: handleInputChange,
                  placeholder: "Enter your full name",
                  className: "modern-input",
                  style: {
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '12px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }
                }),
                React.createElement("div", { className: "modern-input-border" })
              ),
              errors.name && React.createElement(
                "p",
                { 
                  className: "modern-form-error",
                  style: {
                    color: '#dc2626',
                    fontSize: '12px',
                    marginTop: '4px'
                  }
                },
                errors.name
              )
            ),

            React.createElement(
              "div",
              { className: "modern-form-group" },
              React.createElement(
                "label",
                { 
                  className: "modern-form-label",
                  style: {
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }
                },
                "Email"
              ),
              React.createElement(
                "div",
                { className: "modern-input-wrapper" },
                React.createElement(
                  "div",
                  { 
                    className: "modern-input-icon",
                    style: {
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af',
                      zIndex: 1
                    }
                  },
                  React.createElement(MailIcon)
                ),
                React.createElement(Input, {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleInputChange,
                  placeholder: "Enter your email",
                  className: "modern-input",
                  style: {
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '12px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }
                }),
                React.createElement("div", { className: "modern-input-border" })
              ),
              errors.email && React.createElement(
                "p",
                { 
                  className: "modern-form-error",
                  style: {
                    color: '#dc2626',
                    fontSize: '12px',
                    marginTop: '4px'
                  }
                },
                errors.email
              )
            ),

            React.createElement(
              "div",
              { className: "modern-form-group" },
              React.createElement(
                "label",
                { 
                  className: "modern-form-label",
                  style: {
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }
                },
                "Password"
              ),
              React.createElement(
                "div",
                { className: "modern-input-wrapper" },
                React.createElement(
                  "div",
                  { 
                    className: "modern-input-icon",
                    style: {
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af',
                      zIndex: 1
                    }
                  },
                  React.createElement(LockIcon)
                ),
                React.createElement(Input, {
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleInputChange,
                  placeholder: "Enter your password",
                  className: "modern-input",
                  style: {
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '12px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }
                }),
                React.createElement("div", { className: "modern-input-border" })
              ),
              errors.password && React.createElement(
                "p",
                { 
                  className: "modern-form-error",
                  style: {
                    color: '#dc2626',
                    fontSize: '12px',
                    marginTop: '4px'
                  }
                },
                errors.password
              )
            ),

            React.createElement(
              Button,
              {
                type: "submit",
                disabled: isLoading,
                onClick: handleSubmit,
                className: "modern-submit-btn",
                style: {
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1,
                  marginTop: '16px'
                }
              },
              React.createElement(
                "span",
                { className: "modern-btn-content" },
                isLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"
              )
            )
          )
        ),

        React.createElement(
          CardFooter,
          { className: "modern-card-footer" },
          React.createElement(
            "p",
            { 
              className: "modern-footer-text",
              style: {
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '14px',
                margin: '0'
              }
            },
            authMode === "login" ? "Don't have an account?" : "Already have an account?",
            React.createElement(
              Button,
              {
                type: "button",
                onClick: () => {
                  setAuthMode(authMode === "login" ? "register" : "login")
                  setErrors({})
                  setAuthMessage("")
                },
                variant: "ghost",
                className: "modern-link-btn",
                style: {
                  marginLeft: '4px',
                  color: '#3b82f6',
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }
              },
              authMode === "login" ? "Sign up" : "Sign in"
            )
          )
        )
      )
    )
  )
}

// Export the hook and storage for other components to use
export { useUserSession, userStorage, UserProfile }

// Default export
export default AuthModal

// Named export for backward compatibility
export { AuthModal }