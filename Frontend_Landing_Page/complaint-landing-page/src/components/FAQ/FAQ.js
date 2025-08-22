import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "How to register a complaint?",
    answer:
      "You can register a complaint using the Register Complaint tab by filling in the required details and submitting the form."
  },
  {
    question: "How long will resolution take?",
    answer:
      "Most complaints are resolved within 48 hours depending on complexity."
  },
  {
    question: "How to track my complaint?",
    answer:
      "Use the Track Complaint tab and enter your complaint ID to see the current status."
  },
  {
    question: "Can I edit a complaint after submitting?",
    answer:
      "No, complaints cannot be edited once submitted. You may raise a new complaint referencing the old one."
  },
  {
    question: "Do I need to visit office?",
    answer:
      "No physical visit is required. Everything can be done online."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-card ${openIndex === index ? "open" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            <div
              className="faq-answer"
              style={{ maxHeight: openIndex === index ? "200px" : "0" }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
