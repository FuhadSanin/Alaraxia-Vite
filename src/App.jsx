import React from "react"
import { Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// context
import { useAuth } from "@context/AuthContext"

import { Admin, Technicain, UnauthenticatedRoutes } from "@routes/routes"

const queryClient = new QueryClient()

function App() {
  const { authToken, userProfile } = useAuth()
  const renderRoutes = () => {
    if (!authToken) {
      return UnauthenticatedRoutes()
    }
    console.log(userProfile)
    switch (userProfile?.kind) {
      case 5:
        return Admin()
      case 1:
        return Technicain()
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
