import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()
const LOCAL_STORAGE_KEY = "authToken"

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    try {
      const storedLoginUser = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedLoginUser) {
        setAuthToken(JSON.parse(storedLoginUser))
      }
    } catch (error) {
      console.error("Failed to parse auth token from localStorage:", error)
      setAuthToken(null)
    }
  }, [])

  useEffect(() => {
    if (authToken !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authToken))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [authToken])

  const value = {
    authToken,
    setAuthToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
