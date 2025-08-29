// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6
}

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2
}

// Complaint validation
export const validateComplaint = (complaint) => {
  return complaint && complaint.trim().length >= 10
}

// Complaint ID validation
export const validateComplaintId = (id) => {
  const idRegex = /^CMP-\d+$/
  return idRegex.test(id)
}

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const value = formData[field]
    const rule = rules[field]

    if (rule.required && (!value || value.trim() === "")) {
      errors[field] = `${field} is required`
      return
    }

    if (rule.email && !validateEmail(value)) {
      errors[field] = "Please enter a valid email address"
      return
    }

    if (rule.password && !validatePassword(value)) {
      errors[field] = "Password must be at least 6 characters long"
      return
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters long`
      return
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must be no more than ${rule.maxLength} characters long`
      return
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
