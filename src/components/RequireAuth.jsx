import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Protege rotas: sem login, vai para /login e volta para cá depois de entrar.
export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const { pathname } = useLocation()
  if (!user) return <Navigate to={`/login?next=${pathname}`} replace />
  return children
}
