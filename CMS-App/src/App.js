import React from "react"
import { ComplaintManagementApp } from "./components/ComplaintManagementApp"
import "./App.css"
import "./globals.css"

function App() {
  return React.createElement("div", { style: { textAlign: "left" } }, React.createElement(ComplaintManagementApp))
}

export default App
