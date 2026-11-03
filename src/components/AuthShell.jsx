import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import DeadLink from './DeadLink.jsx'

// Moldura das telas de login e cadastros: cabeçalho simples + rodapé simples.
export default function AuthShell({ children, whiteBody = false }) {
  useEffect(() => {
    if (!whiteBody) return undefined
    document.body.classList.add('theme-white')
    return () => document.body.classList.remove('theme-white')
  }, [whiteBody])

  return (
    <>
      <header className="topbar">
        <div className="in">
          <Logo />
          <div className="right">
            <div className="secure"><Icon name="shieldok" size={16} /><span>Ambiente 100% seguro</span></div>
            <Link className="link" to="/catalogo">Voltar à loja <Icon name="ext" size={12} /></Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="foot">
        <div className="in">
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
