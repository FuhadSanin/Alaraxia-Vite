import React from "react"
import { Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// context
import { useAuth } from "@context/AuthContext"

import {
  Admin,
  Technicain,
  CallCenterAgent,
  CustomerCareOfficer,
  AreaServiceManager,
  UnauthenticatedRoutes,
} from "@routes/routes"

const queryClient = new QueryClient()

function App() {
  const { authToken, userProfile } = useAuth()
  const renderRoutes = () => {
    if (!authToken) {
      return UnauthenticatedRoutes()
    }
    console.log(userProfile)
    switch (userProfile?.kind) {
      case 1:
        return Technicain()
      case 2:
        return CallCenterAgent()
      case 3:
        return CustomerCareOfficer()
      case 4:
        return AreaServiceManager()
      case 5:
        return Admin()
      default:
        return UnauthenticatedRoutes()
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes> {renderRoutes()}</Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
