"use client"

import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as api from "../api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const { data } = await api.getUserProfile()
          setUser(data)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.register(userData)
      localStorage.setItem("token", data.token)
      setUser(data)
      setIsAuthenticated(true)
      navigate("/")
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.login(userData)
      localStorage.setItem("token", data.token)
      setUser(data)
      setIsAuthenticated(true)
      navigate("/")
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    navigate("/signin")
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.updateUserProfile(userData)
      setUser(data)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
