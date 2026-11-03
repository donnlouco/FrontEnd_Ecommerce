import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Login from './views/Login.jsx'
import Cadastro from './views/Cadastro.jsx'
import Fornecedor from './views/Fornecedor.jsx'
import Catalogo from './views/Catalogo.jsx'
import Carrinho from './views/Carrinho.jsx'
import Pedidos from './perfil/Pedidos.jsx'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/catalogo" replace />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/fornecedor" element={<Fornecedor />} />
            <Route
              path="/pedidos"
              element={
                <RequireAuth>
                  <Pedidos />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/catalogo" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
