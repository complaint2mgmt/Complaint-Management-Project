import React, { useState } from "react";
import "./App.css";
import FAQ from "./components/FAQ/FAQ";
import RegisterComplaint from "./components/Register_complaint/Register";
import TrackComplaint from "./components/Track_complaint/Track";


function App() {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <div className="App">
      <header className="header">
        <h1>Complaint Management System</h1>
        <nav>
          <button onClick={() => setActiveTab("faq")}>FAQs</button>
          <button onClick={() => setActiveTab("register")}>Register Complaint</button>
          <button onClick={() => setActiveTab("track")}>Track Complaint</button>
        </nav>
      </header>

      <main>
        {activeTab === "faq" && <FAQ />}
        {activeTab === "register" && <RegisterComplaint />}
        {activeTab === "track" && <TrackComplaint />}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Complaint Management System</p>
      </footer>
    </div>
  );
}

export default App;
