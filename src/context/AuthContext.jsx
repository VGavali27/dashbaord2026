import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('isAuthenticated')
    const savedUser = localStorage.getItem('user')

    if (savedAuth === 'true' && savedUser) {
      try {
        setIsAuthenticated(true)
        setUser(JSON.parse(savedUser))
      } catch (e) {
        // Invalid JSON, clear storage
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    // Dummy login: accept any non-empty username and password
    if (!username || !password) {
      return false
    }

    const userData = {
      username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      role: 'Product Manager',
      loginTime: new Date().toISOString(),
    }

    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
