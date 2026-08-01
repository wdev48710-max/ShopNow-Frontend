import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const login = (newToken) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }
  
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }
  // Token se role nikaalo
  let role = "user"
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      role = payload.role || "user"
    } catch (e) {
      role = "user"
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuth: !!token, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)