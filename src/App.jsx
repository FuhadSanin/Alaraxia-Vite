// App.jsx
import React from "react"
import { Routes, Route, Navigate, Link } from "react-router-dom"

// context
import { useAuth } from "@context/AuthContext"

// pages
import Dashboard from "@/pages/Dashboard/Dashboard"
import Ticket from "@/pages/Ticket/TicketAll/TicketAll"
import Management from "@pages/Management/Management"
import UIAuth from "@pages/Auth/UIAuth"
import Reports from "@pages/Report/Reports"
import TicketAdd from "@pages/Ticket/TicketAll/TicketAdd"
import TicketView from "@pages/Ticket/TicketAll/TicketView"
import { Button } from "@components/ui/button"
import CustomerEdit from "@pages/Ticket/TicketAll/CustomerEdit"

function App() {
  const { authToken } = useAuth()

  return (
    <div className="App">
      <Routes>
        {authToken !== null ? (
          <>
            <Route
              path="/login"
              element={
                <UIAuth
                  title="Sign In"
                  desc="Log in to your account to continue"
                />
              }
            />
            <Route
              path="/forget-password"
              element={
                <UIAuth
                  title="Reset Password"
                  desc="Please enter your email address to continue"
                />
              }
            />
            <Route
              path="/new-password"
              element={
                <UIAuth
                  title="New Password"
                  desc="Please enter your new password to continue"
                />
              }
            />
            <Route
              path="/confirm-mail"
              element={
                <UIAuth
                  title="Email Sent"
                  desc=" An email has been sent to your registered email address with instructions on how to reset your password. Please check your inbox, including the spam or junk folder, if you don't see the email within a few minutes."
                />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Tickets */}
            <Route path="/ticket" element={<Ticket title="Open Tickets" />} />
            <Route path="/ticket/add" element={<TicketAdd />} />
            <Route path="/ticket/view/:id" element={<TicketView />} />
            <Route
              path="/customer/edit/customerid/:customerId/ticketid/:ticketId"
              element={<CustomerEdit />}
            />
            {/* Management */}
            <Route
              path="/management"
              element={<Management title="Management" />}
            />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <UIAuth
                  title="Sign In"
                  desc="Log in to your account to continue"
                />
              }
            />
            <Route
              path="*"
              element={
                <Link to="/login">
                  <Button variant="blue">Login to Continue </Button>
                </Link>
              }
            />
          </>
        )}
      </Routes>
    </div>
  )
}
export default App
