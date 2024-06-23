import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()
const LOCAL_STORAGE_KEY_TOKEN = "authToken"
const LOCAL_STORAGE_KEY_PROFILE = "userProfile"

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
      return storedToken ? JSON.parse(storedToken) : null
    } catch (error) {
      console.error("Failed to parse auth token from localStorage:", error)
      return null
    }
  })

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE)
      return storedProfile ? JSON.parse(storedProfile) : null
    } catch (error) {
      console.error("Failed to parse user profile from localStorage:", error)
      return null
    }
  })

  useEffect(() => {
    try {
      if (authToken !== null) {
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(authToken))
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN)
      }
    } catch (error) {
      console.error("Failed to set auth token in localStorage:", error)
    }
  }, [authToken])

  useEffect(() => {
    try {
      if (userProfile !== null) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY_PROFILE,
          JSON.stringify(userProfile)
        )
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY_PROFILE)
      }
    } catch (error) {
      console.error("Failed to set user profile in localStorage:", error)
    }
  }, [userProfile])

  const value = {
    authToken,
    setAuthToken,
    userProfile,
    setUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
