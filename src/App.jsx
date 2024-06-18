// App.jsx
import React from "react"
import { Routes, Route, Navigate, Link } from "react-router-dom"

// context
import { useAuth } from "@context/AuthContext"

// pages
import Dashboard from "@/pages/Dashboard/Dashboard"
import Ticket from "@/pages/Ticket/TicketAll/TicketAll"
import ManagementStaff from "@pages/Management/StaffManagement/ManagementStaff"
import UIAuth from "@pages/Auth/UIAuth"
import Reports from "@pages/Report/Reports"
import TicketAdd from "@pages/Ticket/TicketAll/TicketAdd"
import TicketView from "@pages/Ticket/TicketAll/TicketView"
import CustomerEdit from "@pages/Ticket/TicketAll/CustomerEdit"
import Layout from "@layouts/layout"
import BlankLayout from "@layouts/blankLayout"
import TicketOpen from "@pages/Ticket/TicketOpen"
import TicketPending from "@pages/Ticket/TicketPending"
import TicketCancelled from "@pages/Ticket/TicketCancelled"
import TicketClosed from "@pages/Ticket/TicketClosed/TicketClosed"
import TicketAssign from "@pages/Ticket/TicketAssign"

function App() {
  const { authToken } = useAuth()

  return (
    <div className="App">
      <Routes>
        {authToken !== null ? (
          <>
            <Route element={<BlankLayout />}>
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
            </Route>
            {/* Dashboard */}
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />

              {/* Tickets */}
              <Route path="/ticket" element={<Ticket title="Open Tickets" />} />
              <Route path="/ticket/add" element={<TicketAdd />} />
              <Route path="/ticket/view/:id" element={<TicketView />} />
              <Route
                path="/customer/edit/customerid/:customerId/ticketid/:ticketId"
                element={<CustomerEdit />}
              />
              <Route path="/ticket/open" element={<TicketOpen />} />
              <Route path="/ticket/assigned" element={<TicketAssign />} />
              <Route path="/ticket/pending" element={<TicketPending />} />
              <Route path="/ticket/cancelled" element={<TicketCancelled />} />
              <Route path="/ticket/closed" element={<TicketClosed />} />

              {/* Management */}
              <Route path="/management/staff" element={<ManagementStaff />} />

              {/* Reports */}
              <Route path="/reports" element={<Reports />} />

              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
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
            <Route path="*" element={<Link to="/login">Login Required</Link>} />
          </>
        )}
      </Routes>
    </div>
  )
}
export default App
