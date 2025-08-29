"use client"

import React, { useState } from "react"

// Icon components
const ChevronDownIcon = () =>
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
      d: "M19 9l-7 7-7-7",
    }),
  )

const HelpCircleIcon = () =>
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
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    }),
  )

const NetworkIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-category",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
    }),
  )

const CreditCardIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-category",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    }),
  )

const SmartphoneIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-category",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z",
    }),
  )

const GlobeIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-category",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    }),
  )

const UserIcon = () =>
  React.createElement(
    "svg",
    {
      className: "icon-category",
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

export function FAQSection() {
  const [expandedGroups, setExpandedGroups] = useState(new Set())
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())

  const toggleGroup = (groupIndex) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupIndex)) {
      newExpanded.delete(groupIndex)
      // Also close all questions in this group
      const newExpandedQuestions = new Set(expandedQuestions)
      faqGroups[groupIndex].questions.forEach((_, qIndex) => {
        newExpandedQuestions.delete(`${groupIndex}-${qIndex}`)
      })
      setExpandedQuestions(newExpandedQuestions)
    } else {
      newExpanded.add(groupIndex)
    }
    setExpandedGroups(newExpanded)
  }

  const toggleQuestion = (groupIndex, questionIndex) => {
    const key = `${groupIndex}-${questionIndex}`
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedQuestions(newExpanded)
  }

  const faqGroups = [
    {
      title: "Network Issues",
      description: "Connectivity, signal strength, and network performance",
      icon: NetworkIcon,
      color: "primary",
      questions: [
        {
          question: "Why is my network signal weak or fluctuating?",
          answer: "Sometimes signal strength may drop due to tower congestion, poor coverage in your area, or temporary maintenance. Please raise a Network Complaint with your location details so our team can check tower coverage."
        },
        {
          question: "My internet speed is very slow, what should I do?",
          answer: "Restart your device and check APN settings. If issue continues, raise a complaint. We'll verify your 4G/5G connectivity and resolve within 24 hours."
        },
        {
          question: "Why am I not getting 5G signal though my area shows 5G coverage?",
          answer: "It could be due to device compatibility or SIM type. Please check if your handset supports 5G and raise a 5G Connectivity Complaint."
        },
        {
          question: "My VoLTE calls are not working, why?",
          answer: "Ensure VoLTE is enabled in your phone settings. If still not working, raise a VoLTE Service Complaint."
        },
        {
          question: "Why is my hotspot/data sharing not working?",
          answer: "Some plans restrict hotspot usage. Check your pack details or raise a Hotspot/Data Complaint."
        },
        {
          question: "Why are my calls dropping frequently?",
          answer: "Call drops usually happen due to low signal, network congestion, or device compatibility. Please log a complaint with your location and time of issue."
        },
        {
          question: "I cannot make or receive calls, what should I do?",
          answer: "Ensure your SIM is active and not blocked. If the issue continues, raise a Call Connectivity Complaint – our support will fix it."
        }
      ]
    },
    {
      title: "Recharge & Billing",
      description: "Payment issues, billing disputes, and recharge problems",
      icon: CreditCardIcon,
      color: "accent",
      questions: [
        {
          question: "I was charged extra in my bill. How can I get it corrected?",
          answer: "Raise a Billing Complaint with your bill details. Our team will review and adjust the charges within 48 hours."
        },
        {
          question: "My recharge was successful but not credited. What should I do?",
          answer: "Sometimes delay happens in crediting. If it doesn't reflect within 2 hours, raise a Recharge Complaint with transaction ID."
        },
        {
          question: "I paid my bill online, but it still shows unpaid. Why?",
          answer: "Sometimes payment reflection takes up to 24 hours. If not updated, raise a Payment Complaint with transaction ID."
        },
        {
          question: "Why was I charged for international calls I didn't make?",
          answer: "Fraudulent/accidental calls may happen. Raise a Billing Dispute Complaint to investigate."
        },
        {
          question: "Can I get a refund if I recharge wrong number by mistake?",
          answer: "Generally refunds are not possible, but you can raise a Wrong Recharge Complaint. Our support team will check if reversal is possible."
        },
        {
          question: "Why was money deducted for a service I didn't activate?",
          answer: "Sometimes accidental subscription may occur. Raise a VAS Complaint and we will deactivate the service and refund charges if valid."
        },
        {
          question: "How can I deactivate unwanted caller tunes or subscriptions?",
          answer: "Go to Services → Manage Subscriptions in portal OR raise a Deactivation Complaint."
        },
        {
          question: "Why am I being charged for roaming inside my home circle?",
          answer: "If network is latching onto another circle tower, raise a Roaming Billing Complaint."
        },
        {
          question: "Caller tune is not changing even after I purchased a new one. What should I do?",
          answer: "Raise a Caller Tune Complaint with song code or details."
        },
        {
          question: "How to stop daily deductions for games/apps I never subscribed to?",
          answer: "Raise a VAS Deactivation Complaint to stop unwanted subscriptions."
        },
        {
          question: "Will I get compensation if my complaint is not solved on time?",
          answer: "In some cases (like network outage/billing error), compensation or bill waiver may apply. Raise a Compensation Request Complaint."
        }
      ]
    },
    {
      title: "SIM & Device",
      description: "SIM card issues, device compatibility, and eSIM problems",
      icon: SmartphoneIcon,
      color: "success",
      questions: [
        {
          question: "My SIM card is not detected, what can I do?",
          answer: "Try reinserting SIM or testing in another device. If still not working, raise a SIM Complaint and request for SIM replacement."
        },
        {
          question: "My SIM suddenly stopped working (No Service). What should I do?",
          answer: "Try reinserting the SIM and restarting your device. If issue continues, raise a SIM Swap Complaint to get a new SIM."
        },
        {
          question: "Why is my eSIM not activating?",
          answer: "Sometimes eSIM QR code fails. Raise an eSIM Complaint for reactivation."
        }
      ]
    },
    {
      title: "International & Roaming",
      description: "International services and roaming packages",
      icon: GlobeIcon,
      color: "warning",
      questions: [
        {
          question: "My international roaming pack is not activated. Why?",
          answer: "Ensure your number is eligible for roaming. If the pack is not activated after recharge, raise a Service Activation Complaint."
        },
        {
          question: "My international roaming pack is active, but I cannot use internet abroad. Why?",
          answer: "Some operators abroad may block temporary usage. Raise an International Roaming Complaint."
        }
      ]
    },
    {
      title: "Account & Portal",
      description: "Account management, portal access, and complaint tracking",
      icon: UserIcon,
      color: "info",
      questions: [
        {
          question: "I am not receiving OTP for login/payment. What can I do?",
          answer: "Sometimes OTP delay happens due to network load. If continuous, raise an OTP Delivery Complaint."
        },
        {
          question: "How can I track all my past complaints?",
          answer: "Go to My Complaints Dashboard in the portal. You'll see full history with ticket IDs and resolutions."
        },
        {
          question: "What if my complaint is not solved even after resolution?",
          answer: "You can Reopen Complaint from dashboard OR call customer care. The system will escalate it to a higher authority."
        },
        {
          question: "My number is showing as inactive though I paid my bill. Why?",
          answer: "Sometimes payment reflection takes time. If status doesn't update, raise a Service Reactivation Complaint."
        },
        {
          question: "My number got deactivated even though I recharged on time. Why?",
          answer: "If your recharge didn't process properly, raise a Service Reactivation Complaint."
        },
        {
          question: "How can I escalate my complaint to a higher officer?",
          answer: "Use the Escalation Request option available if SLA time has passed."
        },
        {
          question: "My complaint was marked as resolved but issue is still there. What should I do?",
          answer: "You can Reopen Complaint from your dashboard or call customer care."
        }
      ]
    }
  ]

  return React.createElement(
    "div",
    { className: "faq-container" },
    
    // Header
    React.createElement(
      "div",
      { className: "faq-header" },
      React.createElement(
        "div",
        { className: "faq-header-content" },
        React.createElement(HelpCircleIcon),
        React.createElement("h1", { className: "faq-title" }, "Frequently Asked Questions"),
      ),
      React.createElement(
        "p",
        { className: "faq-subtitle" },
        "Find answers to common questions organized by category"
      ),
    ),

    // FAQ Groups
    React.createElement(
      "div",
      { className: "faq-groups" },
      faqGroups.map((group, groupIndex) =>
        React.createElement(
          "div",
          {
            key: groupIndex,
            className: `faq-group faq-group-${group.color}`,
          },
          
          // Group Header
          React.createElement(
            "button",
            {
              className: "faq-group-header",
              onClick: () => toggleGroup(groupIndex),
            },
            React.createElement(
              "div",
              { className: "faq-group-header-content" },
              React.createElement(
                "div",
                { className: "faq-group-icon" },
                React.createElement(group.icon)
              ),
              React.createElement(
                "div",
                { className: "faq-group-text" },
                React.createElement("h3", { className: "faq-group-title" }, group.title),
                React.createElement("p", { className: "faq-group-description" }, group.description),
              ),
            ),
            React.createElement(
              "div",
              {
                className: expandedGroups.has(groupIndex) ? "faq-group-chevron expanded" : "faq-group-chevron",
              },
              React.createElement(ChevronDownIcon)
            ),
          ),

          // Group Questions
          expandedGroups.has(groupIndex) &&
            React.createElement(
              "div",
              { className: "faq-questions" },
              group.questions.map((item, questionIndex) =>
                React.createElement(
                  "div",
                  {
                    key: questionIndex,
                    className: "faq-question-item",
                  },
                  React.createElement(
                    "button",
                    {
                      className: "faq-question-header",
                      onClick: () => toggleQuestion(groupIndex, questionIndex),
                    },
                    React.createElement("h4", { className: "faq-question-text" }, item.question),
                    React.createElement(
                      "div",
                      {
                        className: expandedQuestions.has(`${groupIndex}-${questionIndex}`) 
                          ? "faq-question-chevron expanded" 
                          : "faq-question-chevron",
                      },
                      React.createElement(ChevronDownIcon)
                    ),
                  ),
                  expandedQuestions.has(`${groupIndex}-${questionIndex}`) &&
                    React.createElement(
                      "div",
                      { className: "faq-answer" },
                      React.createElement("p", { className: "faq-answer-text" }, item.answer),
                    ),
                ),
              ),
            ),
        ),
      ),
    ),

    // Contact section
    React.createElement(
      "div",
      { className: "faq-contact-section" },
      React.createElement("h3", { className: "faq-contact-title" }, "Still Need Help?"),
      React.createElement(
        "p",
        { className: "faq-contact-description" },
        "If you couldn't find the answer to your question, we're here to help.",
      ),
      React.createElement(
        "div",
        { className: "faq-contact-actions" },
        React.createElement(
          "button",
          {
            className: "btn btn-primary btn-lg",
            onClick: () => (window.location.href = "tel:1-800-837-4966"),
          },
          "Call 1-800-VERIZON",
        ),
        React.createElement(
          "p",
          { className: "faq-contact-note" },
          "Or visit your local Verizon store for in-person assistance",
        ),
      ),
    ),
  )
}