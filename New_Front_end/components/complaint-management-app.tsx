"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Send,
  Shield,
  User,
  LogIn,
  UserPlus,
  Network,
  CreditCard,
  Smartphone,
  Globe,
  Settings,
} from "lucide-react"

interface Complaint {
  id: string
  title: string
  category: string
  description: string
  status: "submitted" | "in-review" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  submittedDate: string
  lastUpdated: string
}

const mockComplaints: Complaint[] = [
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

const faqData = [
  {
    category: "Network Issues",
    icon: <Network className="h-5 w-5" />,
    color: "bg-red-600",
    questions: [
      {
        question: "Why is my network signal weak or fluctuating?",
        answer:
          "Sometimes signal strength may drop due to tower congestion, poor coverage in your area, or temporary maintenance. Please raise a Network Complaint with your location details so our team can check tower coverage.",
      },
      {
        question: "My internet speed is very slow, what should I do?",
        answer:
          "Restart your device and check APN settings. If issue continues, raise a complaint. We'll verify your 4G/5G connectivity and resolve within 24 hours.",
      },
      {
        question: "Why am I not getting 5G signal though my area shows 5G coverage?",
        answer:
          "It could be due to device compatibility or SIM type. Please check if your handset supports 5G and raise a 5G Connectivity Complaint.",
      },
      {
        question: "My VoLTE calls are not working, why?",
        answer:
          "Ensure VoLTE is enabled in your phone settings. If still not working, raise a VoLTE Service Complaint.",
      },
      {
        question: "Why is my hotspot/data sharing not working?",
        answer: "Some plans restrict hotspot usage. Check your pack details or raise a Hotspot/Data Complaint.",
      },
      {
        question: "Why are my calls dropping frequently?",
        answer:
          "Call drops usually happen due to low signal, network congestion, or device compatibility. Please log a complaint with your location and time of issue.",
      },
      {
        question: "I cannot make or receive calls, what should I do?",
        answer:
          "Ensure your SIM is active and not blocked. If the issue continues, raise a Call Connectivity Complaint – our support will fix it.",
      },
      {
        question: "I am not receiving OTP for login/payment. What can I do?",
        answer: "Sometimes OTP delay happens due to network load. If continuous, raise an OTP Delivery Complaint.",
      },
    ],
  },
  {
    category: "Recharge and Billing",
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-red-600",
    questions: [
      {
        question: "I was charged extra in my bill. How can I get it corrected?",
        answer:
          "Raise a Billing Complaint with your bill details. Our team will review and adjust the charges within 48 hours.",
      },
      {
        question: "My recharge was successful but not credited. What should I do?",
        answer:
          "Sometimes delay happens in crediting. If it doesn't reflect within 2 hours, raise a Recharge Complaint with transaction ID.",
      },
      {
        question: "Why was money deducted for a service I didn't activate?",
        answer:
          "Sometimes accidental subscription may occur. Raise a VAS Complaint and we will deactivate the service and refund charges if valid.",
      },
      {
        question: "How can I deactivate unwanted caller tunes or subscriptions?",
        answer: "Go to Services → Manage Subscriptions in portal OR raise a Deactivation Complaint.",
      },
      {
        question: "My number is showing as inactive though I paid my bill. Why?",
        answer:
          "Sometimes payment reflection takes time. If status doesn't update, raise a Service Reactivation Complaint.",
      },
      {
        question: "I paid my bill online, but it still shows unpaid. Why?",
        answer:
          "Sometimes payment reflection takes up to 24 hours. If not updated, raise a Payment Complaint with transaction ID.",
      },
      {
        question: "Why was I charged for international calls I didn't make?",
        answer: "Fraudulent/accidental calls may happen. Raise a Billing Dispute Complaint to investigate.",
      },
      {
        question: "Can I get a refund if I recharge wrong number by mistake?",
        answer:
          "Generally refunds are not possible, but you can raise a Wrong Recharge Complaint. Our support team will check if reversal is possible.",
      },
      {
        question: "Caller tune is not changing even after I purchased a new one. What should I do?",
        answer: "Raise a Caller Tune Complaint with song code or details.",
      },
      {
        question: "How to stop daily deductions for games/apps I never subscribed to?",
        answer: "Raise a VAS Deactivation Complaint to stop unwanted subscriptions.",
      },
      {
        question: "Will I get compensation if my complaint is not solved on time?",
        answer:
          "In some cases (like network outage/billing error), compensation or bill waiver may apply. Raise a Compensation Request Complaint.",
      },
    ],
  },
  {
    category: "SIM and Device",
    icon: <Smartphone className="h-5 w-5" />,
    color: "bg-red-600",
    questions: [
      {
        question: "My SIM card is not detected, what can I do?",
        answer:
          "Try reinserting SIM or testing in another device. If still not working, raise a SIM Complaint and request for SIM replacement.",
      },
      {
        question: "My SIM suddenly stopped working (No Service). What should I do?",
        answer:
          "Try reinserting the SIM and restarting your device. If issue continues, raise a SIM Swap Complaint to get a new SIM.",
      },
      {
        question: "Why is my eSIM not activating?",
        answer: "Sometimes eSIM QR code fails. Raise an eSIM Complaint for reactivation.",
      },
      {
        question: "My number got deactivated even though I recharged on time. Why?",
        answer: "If your recharge didn't process properly, raise a Service Reactivation Complaint.",
      },
    ],
  },
  {
    category: "International Roaming",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-red-600",
    questions: [
      {
        question: "My international roaming pack is not activated. Why?",
        answer:
          "Ensure your number is eligible for roaming. If the pack is not activated after recharge, raise a Service Activation Complaint.",
      },
      {
        question: "My international roaming pack is active, but I cannot use internet abroad. Why?",
        answer: "Some operators abroad may block temporary usage. Raise an International Roaming Complaint.",
      },
      {
        question: "Why am I being charged for roaming inside my home circle?",
        answer: "If network is latching onto another circle tower, raise a Roaming Billing Complaint.",
      },
    ],
  },
  {
    category: "Account and Portal",
    icon: <Settings className="h-5 w-5" />,
    color: "bg-red-600",
    questions: [
      {
        question: "I cannot log in to my complaint portal. What should I do?",
        answer:
          'Use "Forgot Password" option. If still not working, raise a Login Complaint – our support team will reset your account access.',
      },
      {
        question: "How can I track all my past complaints?",
        answer: "Go to My Complaints Dashboard in the portal. You'll see full history with ticket IDs and resolutions.",
      },
      {
        question: "What if my complaint is not solved even after resolution?",
        answer:
          "You can Reopen Complaint from dashboard OR call customer care. The system will escalate it to a higher authority.",
      },
      {
        question: "I cannot log in to the telecom app. How do I fix it?",
        answer: "Try resetting password. If still fails, raise a Login/App Complaint.",
      },
      {
        question: "My complaint portal is not loading on browser. Why?",
        answer: "Clear cache/cookies or try different browser. If still fails, raise a Portal Access Complaint.",
      },
      {
        question: "My complaint was marked as resolved but issue is still there. What should I do?",
        answer: "You can Reopen Complaint from your dashboard or call customer care.",
      },
      {
        question: "How can I escalate my complaint to a higher officer?",
        answer: "Use the Escalation Request option available if SLA time has passed.",
      },
    ],
  },
]

export function ComplaintManagementApp() {
  const [activeTab, setActiveTab] = useState("faq")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" })
  const [complaintForm, setComplaintForm] = useState({
    name: "",
    email: "",
    complaint: "",
  })
  const [trackingId, setTrackingId] = useState("")
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ question: string; answer: string; category: string }>>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call Spring Boot REST API
    // POST /api/auth/login or POST /api/auth/register
    setIsAuthenticated(true)
    setShowAuthModal(false)
    setAuthForm({ email: "", password: "", name: "" })
    alert(`${authMode === "login" ? "Login" : "Registration"} successful!`)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveTab("faq")
  }

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    // In a real app, this would call Spring Boot REST API
    // POST /api/complaints with { name, email, complaint, userId }
    const newComplaintId = `CMP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
    alert(`Complaint submitted successfully! Your complaint ID is: ${newComplaintId}`)
    setComplaintForm({ name: "", email: "", complaint: "" })
  }

  const handleTrackComplaint = () => {
    // In a real app, this would call Spring Boot REST API
    // GET /api/complaints/{trackingId}
    const found = mockComplaints.find((c) => c.id === trackingId)
    setTrackedComplaint(found || null)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const results: Array<{ question: string; answer: string; category: string }> = []
    faqData.forEach((category) => {
      category.questions.forEach((faq) => {
        if (
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            question: faq.question,
            answer: faq.answer,
            category: category.category,
          })
        }
      })
    })

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "in-review":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <Shield className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "submitted":
        return 25
      case "in-review":
        return 50
      case "resolved":
        return 100
      case "closed":
        return 100
      default:
        return 0
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 text-white"
      case "medium":
        return "bg-gray-400 text-white"
      case "low":
        return "bg-gray-300 text-black"
      default:
        return "bg-gray-300 text-black"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 transition-all duration-500">
      <header className="border-b bg-black shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                TelecomCare
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-2">
                <Button
                  variant={activeTab === "faq" ? "default" : "ghost"}
                  onClick={() => setActiveTab("faq")}
                  className={`transition-all duration-200 hover:scale-105 ${
                    activeTab === "faq"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  FAQ
                </Button>
                <Button
                  variant={activeTab === "register" ? "default" : "ghost"}
                  onClick={() => setActiveTab("register")}
                  className={`transition-all duration-200 hover:scale-105 ${
                    activeTab === "register"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  Register Complaint
                </Button>
                <Button
                  variant={activeTab === "track" ? "default" : "ghost"}
                  onClick={() => setActiveTab("track")}
                  className={`transition-all duration-200 hover:scale-105 ${
                    activeTab === "track"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  Track Complaint
                </Button>
              </nav>
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="transition-all duration-200 hover:scale-105 border-gray-400 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 bg-transparent"
                >
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="transition-all duration-200 hover:scale-105 bg-red-600 hover:bg-red-700 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden border-b bg-black">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black">
            <TabsTrigger
              value="faq"
              className="transition-all duration-200 text-gray-300 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="transition-all duration-200 text-gray-300 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
            <TabsTrigger
              value="track"
              className="transition-all duration-200 text-gray-300 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Track
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl border-gray-300">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                {authMode === "login" ? "Sign In" : "Create Account"}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(false)}
                  className="text-white hover:bg-red-500"
                >
                  ×
                </Button>
              </CardTitle>
              <CardDescription className="text-red-100">
                {authMode === "login" ? "Sign in to register and track complaints" : "Create an account to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                >
                  {authMode === "login" ? <LogIn className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                  {authMode === "login" ? "Sign In" : "Create Account"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-red-600"
                  onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                >
                  {authMode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {activeTab === "faq" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto font-medium">
                Find quick answers to common telecom service questions. Browse by category or search for specific
                topics.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search questions..."
                  className="pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] border-gray-400 focus:border-red-500 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-red-100 transition-all duration-200"
                    onClick={() => {
                      setSearchQuery("")
                      setSearchResults([])
                      setShowSearchResults(false)
                    }}
                  >
                    <span className="text-gray-500 hover:text-red-600 text-lg">×</span>
                  </Button>
                )}
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div key={index} className="border-b last:border-b-0 border-gray-200">
                        <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-black text-sm">{result.question}</h4>
                            <Badge className="text-xs bg-red-600 text-white">{result.category}</Badge>
                          </div>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={`search-result-${index}`} className="border-0">
                              <AccordionTrigger className="py-2 text-xs text-red-600 hover:text-red-800 hover:no-underline">
                                View Answer
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-gray-700 leading-relaxed">
                                {result.answer}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-50 to-red-100 border-red-300 shadow-lg"
                onClick={() => setActiveTab("register")}
              >
                <CardHeader className="text-center">
                  <FileText className="h-12 w-12 text-red-600 mx-auto mb-2" />
                  <CardTitle className="text-black">Register Complaint</CardTitle>
                  <CardDescription className="text-gray-700">
                    Submit a new complaint and get a tracking ID
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-400 shadow-lg"
                onClick={() => setActiveTab("track")}
              >
                <CardHeader className="text-center">
                  <Search className="h-12 w-12 text-black mx-auto mb-2" />
                  <CardTitle className="text-black">Track Complaint</CardTitle>
                  <CardDescription className="text-gray-700">
                    Check the status of your existing complaint
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqData.map((category, categoryIndex) => (
                  <AccordionItem
                    key={categoryIndex}
                    value={`category-${categoryIndex}`}
                    className="border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 [&[data-state=open]>div>svg]:rotate-180">
                      <div className="flex items-center space-x-3 w-full">
                        <div className={`p-2 rounded-lg ${category.color} shadow-md`}>
                          <div className="text-white">{category.icon}</div>
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-semibold text-black">{category.category}</h3>
                          <p className="text-sm text-gray-600">{category.questions.length} questions</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0">
                      <div className="border-t border-gray-200">
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, questionIndex) => (
                            <AccordionItem
                              key={questionIndex}
                              value={`question-${categoryIndex}-${questionIndex}`}
                              className="border-b last:border-b-0 border-gray-200"
                            >
                              <AccordionTrigger className="text-left px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                                <span className="text-sm font-medium text-black">{faq.question}</span>
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-4 text-gray-700 bg-gray-50">
                                <p className="text-sm leading-relaxed">{faq.answer}</p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Card className="bg-gradient-to-r from-red-600 to-black text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Our Commitment to You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <div className="text-4xl font-bold text-gray-200">24hrs</div>
                    <div className="text-gray-300">Initial Response Time</div>
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <div className="text-4xl font-bold text-gray-200">95%</div>
                    <div className="text-gray-300">Resolution Rate</div>
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <div className="text-4xl font-bold text-gray-200">7 days</div>
                    <div className="text-gray-300">Average Resolution Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "register" && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border border-gray-300 bg-white">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Register New Complaint</span>
                </CardTitle>
                <CardDescription className="text-red-100">
                  Please provide your details and complaint information. You must be signed in to submit a complaint.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!isAuthenticated && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
                    <p className="text-red-800 text-sm">Please sign in or create an account to register a complaint.</p>
                    <Button
                      onClick={() => setShowAuthModal(true)}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In / Register
                    </Button>
                  </div>
                )}

                <form onSubmit={handleComplaintSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={complaintForm.name}
                      onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={complaintForm.email}
                      onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complaint">Complaint Details *</Label>
                    <Textarea
                      id="complaint"
                      placeholder="Please describe your complaint in detail. Include relevant information such as dates, times, and any steps you've already taken..."
                      rows={6}
                      value={complaintForm.complaint}
                      onChange={(e) => setComplaintForm({ ...complaintForm, complaint: e.target.value })}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 text-white"
                    size="lg"
                    disabled={!isAuthenticated}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "track" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border border-gray-300 bg-white">
              <CardHeader className="bg-gradient-to-r from-black to-gray-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Track Your Complaint</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your complaint ID to check the current status and progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter complaint ID (e.g., CMP-2024-001)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="transition-all duration-200 focus:scale-[1.02] border-gray-400 focus:border-red-500"
                  />
                  <Button
                    onClick={handleTrackComplaint}
                    className="bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105 text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {trackedComplaint && (
              <Card className="shadow-xl border border-gray-300 bg-white transform transition-all duration-500 scale-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-black">{trackedComplaint.title}</CardTitle>
                    <Badge className={getPriorityColor(trackedComplaint.priority)}>
                      {trackedComplaint.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">ID: {trackedComplaint.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(trackedComplaint.status)}
                    <span className="font-medium capitalize text-black">
                      {trackedComplaint.status.replace("-", " ")}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2 text-black">
                      <span>Progress</span>
                      <span>{getStatusProgress(trackedComplaint.status)}%</span>
                    </div>
                    <Progress
                      value={getStatusProgress(trackedComplaint.status)}
                      className="transition-all duration-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                    <div>
                      <span className="font-medium">Category:</span> {trackedComplaint.category}
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span> {trackedComplaint.submittedDate}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span> {trackedComplaint.lastUpdated}
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-black">Description:</span>
                    <p className="text-gray-700 mt-1">{trackedComplaint.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {trackingId && !trackedComplaint && (
              <Card className="shadow-xl border border-gray-300 bg-white">
                <CardContent className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-700">No complaint found with ID: {trackingId}</p>
                  <p className="text-sm text-gray-600 mt-2">Please check your complaint ID and try again.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="border-t bg-black mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2024 TelecomCare. We're committed to resolving your concerns efficiently and fairly.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
