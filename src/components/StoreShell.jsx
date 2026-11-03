import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import DeadLink from './DeadLink.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

// Moldura da loja: barra de avisos, cabeçalho com conta e carrinho, rodapé completo.
export default function StoreShell({ children }) {
  const { user } = useAuth()
  const { count } = useCart()

  return (
    <>
      <div className="announce">
        <div className="in">
          <span>Seu próximo upgrade começa aqui. • 5% de desconto no Pix</span>
          <span>Atendimento especializado • Seg-Sex, 9h às 18h</span>
        </div>
      </div>

      <header className="hdr">
        <div className="in">
          <Logo />
          <nav className="nav" aria-label="Principal">
            <NavLink to="/catalogo" end className={({ isActive }) => (isActive ? 'on' : undefined)}>Componentes</NavLink>
            <Link to="/catalogo#ofertas">Ofertas</Link>
            <Link to="/fornecedor">Seja fornecedor</Link>
          </nav>
          <div className="acts">
            <Link className="acct" to={user ? '/pedidos' : '/login'}>
              <Icon name="user" size={20} />
              <div>
                <span>{user ? `Olá, ${user.nome.split(' ')[0]}` : 'Bem-vindo à ElectroHub'}</span>
                <strong>{user ? 'Minha conta' : 'Entre ou cadastre-se'}</strong>
              </div>
            </Link>
            <Link className="cart" to="/carrinho" aria-label="Carrinho">
              <Icon name="bag" size={18} />
              <span>Carrinho (<b style={{ fontWeight: 500 }}>{count}</b>)</span>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="store-foot">
        <div className="top">
          <Logo />
          <span className="tag">Tecnologia certa. Possibilidades sem limite.</span>
          <nav className="links">
            <DeadLink>Sobre nós</DeadLink>
            <DeadLink>Ajuda</DeadLink>
            <Link to="/fornecedor">Seja fornecedor</Link>
          </nav>
        </div>
        <div className="bottom">
          <span>© 2026 ElectroHub. Todos os direitos reservados.</span>
          <ul>
            <li><DeadLink>Privacidade e LGPD</DeadLink></li>
            <li><DeadLink>Termos de uso</DeadLink></li>
            <li><DeadLink>Compra protegida</DeadLink></li>
          </ul>
        </div>
      </footer>
    </>
  )
}
