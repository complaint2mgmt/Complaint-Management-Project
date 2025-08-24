import React, { useState } from "react";
import "./App.css";
import FAQ from "./components/FAQ/FAQ";
import RegisterComplaint from "./components/Register_complaint/Register";
import TrackComplaint from "./components/Track_complaint/Track";
    // New changes made on 24-08-2025
function App() {
  const [activeTab, setActiveTab] = useState("faq");
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Theme toggle logic
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to handle tab clicks and close the menu if open
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsMenuOpen(false); // Close menu on tab selection
  };

  return (
    <div className={`App ${theme}`}>
      <header className="header">
        {/* Menu/Options Container in the left corner */}
        <div className="left-controls">
          {/* Menu Toggle Button */}
          <button 
            className="menu-toggle-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="dropdown-menu"
          >
            {/* Dynamic text for better feedback */}
            {isMenuOpen ? "✕ Close" : "☰ Menu"} 
          </button>
          
          {/* Dropdown Menu */}
          <nav 
            id="dropdown-menu" 
            className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}
          >
            <button 
              className={activeTab === "register" ? "active" : ""} 
              onClick={() => handleTabClick("register")}
            >
              Register Complaint
            </button>
            <button 
              className={activeTab === "track" ? "active" : ""} 
              onClick={() => handleTabClick("track")}
            >
              Track Complaint
            </button>
          </nav>
        </div>

        <h1>Complaint Management System</h1>

        {/* FAQs button remains as a primary tab in the header's navigation */}
        <nav className="primary-nav">
          <button 
            className={activeTab === "faq" ? "active" : ""} 
            onClick={() => handleTabClick("faq")}
          >
            FAQs
          </button>
        </nav>
        
        <div className="theme-toggle">
          <label>
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
            {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </label>
        </div>
      </header>

      <main className="fade-in">
        {activeTab === "faq" && <FAQ />}
        {activeTab === "register" && <RegisterComplaint />}
        {activeTab === "track" && <TrackComplaint />}
      </main>

      <footer className="footer">
        {/* Footer is intentionally empty */}
      </footer>
    </div>
  );
}

export default App;