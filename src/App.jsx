// App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import tickets from "./constants/constants.js"

//pages
import Dashboard from "@/pages/Dashboard"
import Ticket from "@/pages/Ticket"
import Management from "@pages/Management"
import SignIn from "@pages/SignIn"
import Reports from "@pages/Reports"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/ticket"
          element={<Ticket title="Open Tickets" tickets={tickets} />}
        />
        <Route
          path="/management"
          element={<Management title="Management" tickets={tickets} />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
