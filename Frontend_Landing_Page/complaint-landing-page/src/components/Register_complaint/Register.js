import React, { useState } from "react";
import "./Register.css";

const RegisterComplaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterComplaint = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", details: "" });

    // In real app: send data to API here
  };

  return (
    <section className="register-section">
      <h2 className="register-title">Register a Complaint</h2>
      {!submitted ? (
        <form onSubmit={handleRegisterComplaint} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="details"
            placeholder="Complaint Details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            Submit Complaint
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Complaint Registered!</h3>
          <p>Our team will get back to you within 48 hours.</p>
          <button onClick={() => setSubmitted(false)} className="new-complaint-btn">
            Register Another Complaint
          </button>
        </div>
      )}
    </section>
  );
};

export default RegisterComplaint;
