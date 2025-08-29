const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api"

export const authAPI = {
  login: async (credentials) => {
    // Future implementation: POST /api/auth/login
    console.log("API Call: POST /api/auth/login", credentials)
    return { success: true, token: "mock-token", user: { email: credentials.email } }
  },

  register: async (userData) => {
    // Future implementation: POST /api/auth/register
    console.log("API Call: POST /api/auth/register", userData)
    return { success: true, token: "mock-token", user: { email: userData.email, name: userData.name } }
  },

  logout: async () => {
    // Future implementation: POST /api/auth/logout
    console.log("API Call: POST /api/auth/logout")
    return { success: true }
  },
}

export const complaintAPI = {
  submit: async (complaintData) => {
    // Future implementation: POST /api/complaints
    console.log("API Call: POST /api/complaints", complaintData)
    const newComplaintId = `CMP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
    return { success: true, complaintId: newComplaintId }
  },

  track: async (complaintId) => {
    // Future implementation: GET /api/complaints/{complaintId}
    console.log("API Call: GET /api/complaints/" + complaintId)
    const mockComplaints = [
      {
        id: "CMP-2024-001",
        title: "Network Signal Issues",
        category: "Network Issues",
        description: "Poor signal strength in my area",
        status: "in-review",
        priority: "high",
        submittedDate: "2024-01-15",
        lastUpdated: "2024-01-16",
      },
      {
        id: "CMP-2024-002",
        title: "Billing Discrepancy",
        category: "Recharge and Billing",
        description: "Extra charges on my bill",
        status: "resolved",
        priority: "medium",
        submittedDate: "2024-01-10",
        lastUpdated: "2024-01-14",
      },
    ]
    return mockComplaints.find((c) => c.id === complaintId) || null
  },

  getAll: async (userId) => {
    // Future implementation: GET /api/complaints?userId={userId}
    console.log("API Call: GET /api/complaints?userId=" + userId)
    return []
  },
}

export const faqAPI = {
  search: async (query) => {
    // Future implementation: GET /api/faq/search?q={query}
    console.log("API Call: GET /api/faq/search?q=" + query)
    return []
  },

  getByCategory: async (category) => {
    // Future implementation: GET /api/faq/category/{category}
    console.log("API Call: GET /api/faq/category/" + category)
    return []
  },
}
