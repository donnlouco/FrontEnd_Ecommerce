import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StoreShell from '../components/StoreShell.jsx'
import Icon from '../components/Icon.jsx'
import Art from '../components/Art.jsx'
import DeadLink from '../components/DeadLink.jsx'
import { DEMO_TODAY, ORDERS, STATUS } from '../data/orders.js'
import { brl, initials, norm } from '../utils/format.js'
import { useAuth } from '../context/AuthContext.jsx'

function OrderCard({ o }) {
  const [label, cls] = STATUS[o.status]
  return (
    <article className={`order${o.status === 'transit' ? ' hl' : ''}`}>
      <div className="o-top">
        <strong>#{o.id}</strong>
        <span>Realizado em {o.label}</span>
        <span className={`badge ${cls}`}>{label}</span>
      </div>
      <div className="o-body">
        <div className="thumb"><Art kind={o.art} /></div>
        <div className="o-info"><strong>{o.name}</strong><span>{o.meta}</span></div>
        <div className="o-total"><small>Total do pedido</small><b>{brl(o.total)}</b></div>
        <DeadLink className="link">Ver detalhes <Icon name="arrow" size={12} /></DeadLink>
      </div>
      {o.track && (
        <div className="track">
          <Icon name="truck" size={15} /><span>{o.track}</span>
          <DeadLink className="link">Rastrear pedido <Icon name="ext" size={11} /></DeadLink>
        </div>
      )}
    </article>
  )
}

export default function Pedidos() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [days, setDays] = useState('30')
  const [status, setStatus] = useState('')

  const rows = useMemo(() => {
    const term = norm(q.trim())
    return ORDERS.filter((o) => {
      if ((DEMO_TODAY - o.date) / 86400000 > +days) return false
      if (status && o.status !== status) return false
      if (term && !norm(`#${o.id} ${o.name}`).includes(term)) return false
      return true
    })
  }, [q, days, status])

  const count = (s) => ORDERS.filter((o) => o.status === s).length

  function sair(e) {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  return (
    <StoreShell>
      <main className="wrap">
        <nav className="crumbs" aria-label="Você está em"><Link to="/catalogo">Início</Link> / <DeadLink>Minha conta</DeadLink> / <b>Meus pedidos</b></nav>

        <div className="account">
          <aside className="side-card" aria-label="Menu da conta">
            <div className="me">
              <span className="avatar">{initials(user.nome)}</span>
              <div><strong>{user.nome}</strong><span>Conta pessoal</span></div>
            </div>
            <nav className="menu">
              <Link className="on" to="/pedidos"><Icon name="box" size={17} />Meus pedidos</Link>
              <DeadLink><Icon name="user" size={17} />Meus dados</DeadLink>
              <DeadLink><Icon name="pin" size={17} />Endereços</DeadLink>
              <DeadLink><Icon name="heart" size={17} />Favoritos</DeadLink>
              <a href="/login" onClick={sair}><Icon name="logout" size={17} />Sair da conta</a>
            </nav>
          </aside>

          <section aria-labelledby="t">
            <div className="page-head">
              <div><h1 id="t">Meus pedidos</h1><p>Acompanhe suas compras e cada etapa do seu upgrade.</p></div>
              <DeadLink className="help">Preciso de ajuda <Icon name="headset" size={16} /></DeadLink>
            </div>

            <div className="stats">
              <div className="stat"><Icon name="box" size={22} /><div><b>{ORDERS.length}</b><span>Pedidos realizados</span></div></div>
              <div className="stat"><Icon name="truck" size={22} /><div><b>{count('transit')}</b><span>A caminho</span></div></div>
              <div className="stat"><Icon name="shieldok" size={22} /><div><b>{count('done')}</b><span>Pedido entregue</span></div></div>
            </div>

            <div className="toolbar">
              <label className="input">
                <Icon name="search" size={16} /><span className="sr">Buscar pedido</span>
                <input type="search" placeholder="Buscar por número ou produto" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
              <div className="sel">
                <div className="input">
                  <select aria-label="Período" value={days} onChange={(e) => setDays(e.target.value)}>
                    <option value="30">Últimos 30 dias</option>
                    <option value="90">Últimos 90 dias</option>
                    <option value="365">Último ano</option>
                  </select>
                </div>
                <Icon name="chev" size={14} />
              </div>
              <div className="sel">
                <div className="input">
                  <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Todos os status</option>
                    <option value="transit">Em transporte</option>
                    <option value="done">Entregue</option>
                    <option value="pick">Em separação</option>
                    <option value="cancel">Cancelado</option>
                  </select>
                </div>
                <Icon name="chev" size={14} />
              </div>
            </div>

            <div className="orders" aria-live="polite">
              {rows.length ? rows.map((o) => <OrderCard key={o.id} o={o} />) : <div className="empty">Nenhum pedido encontrado com esses filtros.</div>}
            </div>
            <div className="pager"><span>Mostrando {rows.length} de {ORDERS.length} pedidos</span><b>1</b></div>
          </section>
        </div>
      </main>
    </StoreShell>
  )
}
