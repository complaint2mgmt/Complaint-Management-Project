// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api"

// HTTP Client utility
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem("authToken")
  }

  setAuthToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem("authToken", token)
    } else {
      localStorage.removeItem("authToken")
    }
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL)

// Authentication API
export const authAPI = {
  async login(credentials) {
    try {
      // Mock implementation - replace with actual API call
      console.log("Login attempt:", credentials)

      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            token: "mock-jwt-token-" + Date.now(),
            user: {
              id: 1,
              name: "John Doe",
              email: credentials.email,
            },
          })
        }, 1000)
      })

      if (response.token) {
        httpClient.setAuthToken(response.token)
      }

      return response

      // Actual API call (uncomment when backend is ready):
      // const response = await httpClient.post('/auth/login', credentials)
      // if (response.token) {
      //   httpClient.setAuthToken(response.token)
      // }
      // return response
    } catch (error) {
      throw new Error("Login failed: " + error.message)
    }
  },

  async register(userData) {
    try {
      // Mock implementation - replace with actual API call
      console.log("Registration attempt:", userData)

      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            token: "mock-jwt-token-" + Date.now(),
            user: {
              id: 2,
              name: userData.name,
              email: userData.email,
            },
          })
        }, 1000)
      })

      if (response.token) {
        httpClient.setAuthToken(response.token)
      }

      return response

      // Actual API call (uncomment when backend is ready):
      // const response = await httpClient.post('/auth/register', userData)
      // if (response.token) {
      //   httpClient.setAuthToken(response.token)
      // }
      // return response
    } catch (error) {
      throw new Error("Registration failed: " + error.message)
    }
  },

  async logout() {
    try {
      // Mock implementation
      httpClient.setAuthToken(null)
      return { success: true }

      // Actual API call (uncomment when backend is ready):
      // await httpClient.post('/auth/logout')
      // httpClient.setAuthToken(null)
      // return { success: true }
    } catch (error) {
      throw new Error("Logout failed: " + error.message)
    }
  },

  async getCurrentUser() {
    try {
      // Actual API call (uncomment when backend is ready):
      // return await httpClient.get('/auth/me')

      // Mock implementation
      return {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      }
    } catch (error) {
      throw new Error("Failed to get current user: " + error.message)
    }
  },
}

// Complaint API
export const complaintAPI = {
  async submit(complaintData) {
    try {
      // Mock implementation - replace with actual API call
      console.log("Complaint submission:", complaintData)

      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            complaintId: "CMP-" + Date.now(),
            message: "Complaint submitted successfully",
          })
        }, 1000)
      })

      return response

      // Actual API call (uncomment when backend is ready):
      // return await httpClient.post('/complaints', complaintData)
    } catch (error) {
      throw new Error("Failed to submit complaint: " + error.message)
    }
  },

  async track(complaintId) {
    try {
      // Mock implementation - replace with actual API call
      console.log("Tracking complaint:", complaintId)

      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            complaint: {
              id: complaintId,
              status: "In Progress",
              description: "Network connectivity issues in downtown area",
              createdAt: "2024-01-15T10:30:00Z",
              updatedAt: "2024-01-16T14:20:00Z",
              priority: "High",
              category: "Network Issues",
              assignedTo: "Technical Team",
              estimatedResolution: "2024-01-18T18:00:00Z",
            },
          })
        }, 1000)
      })

      return response

      // Actual API call (uncomment when backend is ready):
      // return await httpClient.get(`/complaints/${complaintId}`)
    } catch (error) {
      throw new Error("Failed to track complaint: " + error.message)
    }
  },

  async getAll() {
    try {
      // Actual API call (uncomment when backend is ready):
      // return await httpClient.get('/complaints')

      // Mock implementation
      return {
        success: true,
        complaints: [],
      }
    } catch (error) {
      throw new Error("Failed to get complaints: " + error.message)
    }
  },

  async update(complaintId, updateData) {
    try {
      // Actual API call (uncomment when backend is ready):
      // return await httpClient.put(`/complaints/${complaintId}`, updateData)

      // Mock implementation
      return {
        success: true,
        message: "Complaint updated successfully",
      }
    } catch (error) {
      throw new Error("Failed to update complaint: " + error.message)
    }
  },
}

// FAQ API (if needed for dynamic FAQ content)
export const faqAPI = {
  async getAll() {
    try {
      // Actual API call (uncomment when backend is ready):
      // return await httpClient.get('/faq')

      // Mock implementation - return static FAQ data
      return {
        success: true,
        faqs: [], // FAQ data is currently static in components
      }
    } catch (error) {
      throw new Error("Failed to get FAQs: " + error.message)
    }
  },
}

// Export HTTP client for custom API calls
export { httpClient }
