// App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "@/pages/Dashboard/Dashboard"
import Ticket from "@/pages/Ticket/Ticket"

import tickets from "./constants/constants.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/ticket"
            element={<Ticket title="Open Tickets" tickets={tickets} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
