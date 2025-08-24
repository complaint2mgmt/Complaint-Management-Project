import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    category: "Network Issues",
    questions: [
      { q: "Why is my network signal weak or fluctuating?", a: "Sometimes signal strength may drop due to tower congestion, poor coverage in your area, or temporary maintenance. Please raise a Network Complaint with your location details so our team can check tower coverage." },
      { q: "My internet speed is very slow, what should I do?", a: "Restart your device and check APN settings. If issue continues, raise a complaint. We’ll verify your 4G/5G connectivity and resolve within 24 hours." },
      { q: "Why am I not getting 5G signal though my area shows 5G coverage?", a: "It could be due to device compatibility or SIM type. Please check if your handset supports 5G and raise a 5G Connectivity Complaint." },
      { q: "My VoLTE calls are not working, why?", a: "Ensure VoLTE is enabled in your phone settings. If still not working, raise a VoLTE Service Complaint." },
      { q: "Why is my hotspot/data sharing not working?", a: "Some plans restrict hotspot usage. Check your pack details or raise a Hotspot/Data Complaint." },
      { q: "Why are my calls dropping frequently?", a: "Call drops usually happen due to low signal, network congestion, or device compatibility. Please log a complaint with your location and time of issue." },
      { q: "I cannot make or receive calls, what should I do?", a: "Ensure your SIM is active and not blocked. If the issue continues, raise a Call Connectivity Complaint – our support will fix it." }
    ]
  },
  {
    category: "Recharge & Billing",
    questions: [
      { q: "I was charged extra in my bill. How can I get it corrected?", a: "Raise a Billing Complaint with your bill details. Our team will review and adjust the charges within 48 hours." },
      { q: "My recharge was successful but not credited. What should I do?", a: "Sometimes delay happens in crediting. If it doesn’t reflect within 2 hours, raise a Recharge Complaint with transaction ID." },
      { q: "I paid my bill online, but it still shows unpaid. Why?", a: "Sometimes payment reflection takes up to 24 hours. If not updated, raise a Payment Complaint with transaction ID." },
      { q: "Why was I charged for international calls I didn’t make?", a: "Fraudulent/accidental calls may happen. Raise a Billing Dispute Complaint to investigate." },
      { q: "Can I get a refund if I recharge wrong number by mistake?", a: "Generally refunds are not possible, but you can raise a Wrong Recharge Complaint. Our support team will check if reversal is possible." },
      { q: "Why was money deducted for a service I didn’t activate?", a: "Sometimes accidental subscription may occur. Raise a VAS Complaint and we will deactivate the service and refund charges if valid." },
      { q: "How can I deactivate unwanted caller tunes or subscriptions?", a: "Go to Services → Manage Subscriptions in portal OR raise a Deactivation Complaint." },
      { q: "Why am I being charged for roaming inside my home circle?", a: "If network is latching onto another circle tower, raise a Roaming Billing Complaint." },
      { q: "Caller tune is not changing even after I purchased a new one. What should I do?", a: "Raise a Caller Tune Complaint with song code or details." },
      { q: "How to stop daily deductions for games/apps I never subscribed to?", a: "Raise a VAS Deactivation Complaint to stop unwanted subscriptions." },
      { q: "Will I get compensation if my complaint is not solved on time?", a: "In some cases (like network outage/billing error), compensation or bill waiver may apply. Raise a Compensation Request Complaint." }
    ]
  },
  {
    category: "SIM & Device",
    questions: [
      { q: "My SIM card is not detected, what can I do?", a: "Try reinserting SIM or testing in another device. If still not working, raise a SIM Complaint and request for SIM replacement." },
      { q: "My SIM suddenly stopped working (No Service). What should I do?", a: "Try reinserting the SIM and restarting your device. If issue continues, raise a SIM Swap Complaint to get a new SIM." },
      { q: "Why is my eSIM not activating?", a: "Sometimes eSIM QR code fails. Raise an eSIM Complaint for reactivation." }
    ]
  },
  {
    category: "International & Roaming",
    questions: [
      { q: "My international roaming pack is not activated. Why?", a: "Ensure your number is eligible for roaming. If the pack is not activated after recharge, raise a Service Activation Complaint." },
      { q: "My international roaming pack is active, but I cannot use internet abroad. Why?", a: "Some operators abroad may block temporary usage. Raise an International Roaming Complaint." }
    ]
  },
  {
    category: "Account & Portal",
    questions: [
      { q: "I am not receiving OTP for login/payment. What can I do?", a: "Sometimes OTP delay happens due to network load. If continuous, raise an OTP Delivery Complaint." },
      { q: "How can I track all my past complaints?", a: "Go to My Complaints Dashboard in the portal. You’ll see full history with ticket IDs and resolutions." },
      { q: "What if my complaint is not solved even after resolution?", a: "You can Reopen Complaint from dashboard OR call customer care. The system will escalate it to a higher authority." },
      { q: "My number is showing as inactive though I paid my bill. Why?", a: "Sometimes payment reflection takes time. If status doesn’t update, raise a Service Reactivation Complaint." },
      { q: "My number got deactivated even though I recharged on time. Why?", a: "If your recharge didn’t process properly, raise a Service Reactivation Complaint." },
      { q: "How can I escalate my complaint to a higher officer?", a: "Use the Escalation Request option available if SLA time has passed." },
      { q: "My complaint was marked as resolved but issue is still there. What should I do?", a: "You can Reopen Complaint from your dashboard or call customer care." }
    ]
  }
];

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleCategory = (catIndex) => {
    setOpenCategory(openCategory === catIndex ? null : catIndex);
    setOpenQuestion({});
  };

  const toggleQuestion = (catIndex, qIndex) => {
    setOpenQuestion((prev) => ({
      ...prev,
      [catIndex]: prev[catIndex] === qIndex ? null : qIndex
    }));
  };

  // NEW HANDLER: Clears all search-related state
  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedQuestion(null);
  };

  const allQuestions = faqData.flatMap((cat) =>
    cat.questions.map((q) => ({ text: q.q, answer: q.a, category: cat.category }))
  );

  const suggestions = searchTerm
    ? allQuestions.filter((item) =>
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
    : [];

  const filteredData = faqData
    .map((cat) => {
      const filteredQuestions = cat.questions.filter((qItem) =>
        qItem.q.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (
        !searchTerm ||
        filteredQuestions.length > 0 ||
        cat.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return {
          ...cat,
          questions: searchTerm ? filteredQuestions : cat.questions
        };
      }
      return null;
    })
    .filter((cat) => cat !== null);

return (
  <section className="faq-container">
    <h2 className="faq-title">Frequently Asked Questions</h2>

    <div className="faq-search-wrapper">
      <input
        type="text"
        placeholder="Search questions..."
        className="faq-search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedQuestion(null); // reset answer if typing new search
        }}
      />
      {/* CLEAR BUTTON: Visible only when searchTerm has text */}
      {searchTerm && (
        <button 
          className="search-clear-btn" 
          onClick={handleClearSearch}
          aria-label="Clear Search"
        >
          &times;
        </button>
      )}

      {searchTerm && suggestions.length > 0 && (
        <div className="faq-suggestions">
          {suggestions.map((s, i) => (
            <div key={i} className="suggestion-card">
              <div
                className="suggestion-question"
                onClick={() => {
                  setSelectedQuestion({
                    text: s.text,
                    answer: faqData.flatMap(cat => cat.questions).find(q => q.q === s.text)?.a
                  });
                  setSearchTerm(s.text);
                }}

              >
                <span>{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Show answer immediately when a suggestion is selected */}
    {selectedQuestion && (
      <div className="selected-answer">
        <button 
          className="close-btn"
          onClick={() => setSelectedQuestion(null)}
        >
          &times;
        </button>
        <h4>{selectedQuestion.text}</h4>
        <p>{selectedQuestion.answer}</p>
      </div>
    )}

    {/* Show category cards ONLY when searchTerm is empty and NO suggestion is selected */}
    {!searchTerm && !selectedQuestion && (
      <div className="faq-category-list">
        {filteredData.length > 0 ? (
          filteredData.map((cat, catIndex) => (
            <div
              key={catIndex}
              className={`faq-category-card ${openCategory === catIndex ? "open" : ""}`}
            >
              <div
                className="faq-category-header"
                onClick={() => toggleCategory(catIndex)}
              >
                <span>{cat.category}</span>
                <span className="faq-icon">
                  {openCategory === catIndex ? "−" : "+"}
                </span>
              </div>

              <div
                className="faq-category-content"
                style={{ maxHeight: openCategory === catIndex ? "1200px" : "0" }}
              >
                {cat.questions.length > 0 ? (
                  cat.questions.map((qItem, qIndex) => (
                    <div
                      key={qIndex}
                      className={`faq-card ${openQuestion[catIndex] === qIndex ? "open" : ""}`}
                    >
                      <div
                        className="faq-question"
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                      >
                        <span>{qItem.q}</span>
                        <span className="faq-icon">
                          {openQuestion[catIndex] === qIndex ? "−" : "+"}
                        </span>
                      </div>
                      <div
                        className="faq-answer"
                        style={{ maxHeight: openQuestion[catIndex] === qIndex ? "300px" : "0" }}
                      >
                        <p>{qItem.a}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-questions">No matching questions in this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    )}
    
    {/* Show filtered results ONLY when searchTerm is not empty and no suggestion is selected */}
    {searchTerm && !selectedQuestion && (
        <div className="faq-category-list">
             {filteredData.length > 0 ? (
          filteredData.map((cat, catIndex) => (
            <div
              key={catIndex}
              className={`faq-category-card open`} /* Always show header for filtered results */
            >
              <div
                className="faq-category-header"
              >
                <span>{cat.category} ({cat.questions.length})</span>
              </div>

              <div
                className="faq-category-content"
                style={{ maxHeight: "1200px" }}
              >
                {cat.questions.length > 0 ? (
                  cat.questions.map((qItem, qIndex) => (
                    <div
                      key={qIndex}
                      className={`faq-card`} 
                    >
                      <div
                        className="faq-question"
                        onClick={() => setSelectedQuestion({ text: qItem.q, answer: qItem.a })}
                      >
                        <span>{qItem.q}</span>
                        <span className="faq-icon">
                          →
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-questions">No matching questions in this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
        </div>
    )}
  </section>
);

}