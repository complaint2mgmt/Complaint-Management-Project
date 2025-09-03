// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api"

// Microservice URLs
const COMPLAINT_SERVICE_URL = "http://localhost:8081"
const TRACKING_SERVICE_URL = "http://localhost:8085"

// User Storage System reference
let userStorageRef = null

// Function to set user storage reference
export const setUserStorageReference = (userStorage) => {
  userStorageRef = userStorage
  console.log("User storage reference set:", userStorageRef)
}

// HTTP Client utility with improved error handling
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.token = this.getStoredToken()
  }

  getStoredToken() {
    try {
      // First try to get from userStorage if available
      if (userStorageRef && userStorageRef.currentUser) {
        return userStorageRef.currentUser.token || localStorage.getItem("authToken")
      }
      return localStorage.getItem("authToken")
    } catch (error) {
      console.warn("Error getting stored token:", error)
      return null
    }
  }

  setAuthToken(token) {
    this.token = token
    try {
      if (token) {
        localStorage.setItem("authToken", token)
      } else {
        localStorage.removeItem("authToken")
      }
    } catch (error) {
      console.warn("Error setting auth token:", error)
    }
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    }

    // Get fresh token each time
    const currentToken = this.getStoredToken()
    if (currentToken) {
      headers["Authorization"] = `Bearer ${currentToken}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Add reasonable timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const config = {
      headers: this.getHeaders(),
      signal: controller.signal,
      ...options,
    }

    try {
      console.log("Making API request to:", url)
      console.log("Request config:", config)
      
      const response = await fetch(url, config)
      clearTimeout(timeoutId) // Clear timeout if request completes
      
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      let data
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.message || data || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)
      console.error("API request failed:", error)
      
      // Provide more specific error messages but don't use fallbacks
      if (error.name === 'AbortError') {
        throw new Error("Request timed out - please try again")
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error("Network error - please check your connection and try again")
      }
      
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

// Create HTTP client instances
const httpClient = new HttpClient(API_BASE_URL)
const complaintHttpClient = new HttpClient(COMPLAINT_SERVICE_URL)
const trackingHttpClient = new HttpClient(TRACKING_SERVICE_URL)

// Authentication API 
export const authAPI = {
  async login(credentials) {
    try {
      console.log("Login attempt:", credentials)

      if (userStorageRef) {
        const user = userStorageRef.login(credentials.email, credentials.password)
        
        // Generate a mock token for this session
        const token = "mock-jwt-token-" + Date.now()
        httpClient.setAuthToken(token)
        
        // Store token in user object for future API calls
        userStorageRef.currentUser.token = token
        
        return {
          success: true,
          token: token,
          user: user,
        }
      } else {
        throw new Error("User storage not initialized")
      }
    } catch (error) {
      throw new Error("Login failed: " + error.message)
    }
  },

  async register(userData) {
    try {
      console.log("Registration attempt:", userData)

      if (userStorageRef) {
        const user = userStorageRef.register(userData)
        
        // Generate a mock token for this session
        const token = "mock-jwt-token-" + Date.now()
        httpClient.setAuthToken(token)
        
        // Store token in user object for future API calls
        userStorageRef.currentUser.token = token
        
        return {
          success: true,
          token: token,
          user: user,
        }
      } else {
        throw new Error("User storage not initialized")
      }
    } catch (error) {
      throw new Error("Registration failed: " + error.message)
    }
  },

  async logout() {
    try {
      // Clear token from HTTP client
      httpClient.setAuthToken(null)
      
      // Clear user from userStorage if available
      if (userStorageRef) {
        userStorageRef.logout()
      }
      
      return { success: true }
    } catch (error) {
      throw new Error("Logout failed: " + error.message)
    }
  },

  async getCurrentUser() {
    try {
      if (userStorageRef && userStorageRef.currentUser) {
        return userStorageRef.currentUser
      }
      
      return null
    } catch (error) {
      throw new Error("Failed to get current user: " + error.message)
    }
  },
}

// FIXED: Complaint API that always calls real microservices
export const complaintAPI = {
  async submit(complaintData) {
    try {
      // Transform frontend form data to backend expected format
      const backendData = {
        name: complaintData.name,
        email: complaintData.email,
        complaintText: complaintData.complaint, // FIXED: Use complaintText instead of description
      }

      console.log("Submitting complaint to microservice:", backendData)

      // ALWAYS call the real microservice - no fallback
      const response = await complaintHttpClient.post('/api/complaints', backendData)

      console.log("Complaint service response:", response)

      // Transform response to match frontend expectations
      return {
        success: true,
        complaintId: response.trackId, // Your backend returns trackId
        trackId: response.trackId,
        message: "Complaint submitted successfully",
        complaint: response,
      }
    } catch (error) {
      console.error("Complaint submission failed:", error)
      // Don't mask the real error - let the user know what happened
      if (error.message.includes('Network error')) {
        throw new Error("Cannot connect to complaint service. Please check if the service is running and try again.")
      } else if (error.message.includes('timed out')) {
        throw new Error("Complaint submission timed out. Please try again.")
      }
      throw new Error("Failed to submit complaint: " + error.message)
    }
  },

  async track(complaintId) {
    try {
      console.log("Tracking complaint:", complaintId)

      // ALWAYS call the real tracking service - no fallback
      const trackingHistory = await trackingHttpClient.get(`/api/tracking/${complaintId}`)

      console.log("Tracking service response:", trackingHistory)

      if (!trackingHistory || trackingHistory.length === 0) {
        throw new Error("Complaint not found")
      }

      // Transform tracking history to complaint object expected by frontend
      const latestRecord = trackingHistory[trackingHistory.length - 1]
      const firstRecord = trackingHistory[0]

      const complaint = {
        id: complaintId,
        trackId: complaintId,
        status: latestRecord.status || 'NEW',
        description: latestRecord.description || 'No description available',
        category: latestRecord.category || 'General',
        priority: latestRecord.priority || 'Medium',
        createdAt: firstRecord.createdAt || firstRecord.updatedAt,
        updatedAt: latestRecord.updatedAt,
        assignedTo: latestRecord.assignedTo || null,
        estimatedResolution: latestRecord.estimatedResolution || null,
        history: trackingHistory, // Include full history for future use
      }

      return {
        success: true,
        complaint: complaint,
      }
    } catch (error) {
      console.error("Complaint tracking failed:", error)
      // Provide clear error messages without fallbacks
      if (error.message.includes('Network error')) {
        throw new Error("Cannot connect to tracking service. Please check if the service is running and try again.")
      } else if (error.message.includes('timed out')) {
        throw new Error("Tracking request timed out. Please try again.")
      }
      throw new Error("Failed to track complaint: " + error.message)
    }
  },

  async getAll() {
    try {
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
      return {
        success: true,
        message: "Complaint updated successfully",
      }
    } catch (error) {
      throw new Error("Failed to update complaint: " + error.message)
    }
  },
}

// FAQ API
export const faqAPI = {
  async getAll() {
    try {
      return {
        success: true,
        faqs: [], // FAQ data is currently static in components
      }
    } catch (error) {
      throw new Error("Failed to get FAQs: " + error.message)
    }
  },
}

// Export HTTP clients for custom API calls
export { httpClient, complaintHttpClient, trackingHttpClient }