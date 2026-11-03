import { createContext, useContext, useState } from 'react'
import api from '../services/api.js'

const AuthContext = createContext(null)
const KEY = 'eh-user'

function readUser() {
  try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)

  async function login(email, senha) {
    const u = await api.login(email, senha)
    try { localStorage.setItem(KEY, JSON.stringify(u)) } catch { /* sem storage */ }
    setUser(u)
    return u
  }

  function logout() {
    try { localStorage.removeItem(KEY) } catch { /* sem storage */ }
    api.logout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
