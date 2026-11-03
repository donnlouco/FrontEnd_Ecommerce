import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StoreShell from '../components/StoreShell.jsx'
import Icon from '../components/Icon.jsx'
import Art from '../components/Art.jsx'
import { artForItem } from '../data/products.js'
import { brl } from '../utils/format.js'
import { MASKS } from '../utils/masks.js'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import api from '../services/api.js'

const FRETE_GRATIS_A_PARTIR_DE = 1500
const FRETE_PADRAO = 29.9

function CartItem({ item, maxQty, onQty, onRemove }) {
  const art = artForItem(item)
  return (
    <article className="c-item">
      <div className="c-thumb"><Art kind={art.kind} arg={art.arg} /></div>
      <div className="c-info">
        <span className="p-brand">{item.brand}</span>
        <strong>{item.name}</strong>
        <span className="p-spec">{item.spec}</span>
        <button className="c-remove" type="button" onClick={onRemove}><Icon name="x" size={13} />Remover</button>
      </div>
      <div className="qty" role="group" aria-label={`Quantidade de ${item.name}`}>
        <button type="button" aria-label="Diminuir" disabled={item.qty <= 1} onClick={() => onQty(item.qty - 1)}>−</button>
        <output>{item.qty}</output>
        <button type="button" aria-label="Aumentar" disabled={item.qty >= maxQty} onClick={() => onQty(item.qty + 1)}>+</button>
      </div>
      <div className="c-price"><small>{brl(item.price)} cada</small><b>{brl(item.price * item.qty)}</b></div>
    </article>
  )
}

export default function Carrinho() {
  const navigate = useNavigate()
  const { items, count, subtotal, maxQty, setQty, remove, clear } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const [cep, setCep] = useState('')
  const [cepOk, setCepOk] = useState(false)
  const [cepError, setCepError] = useState('')
  const [busy, setBusy] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const frete = cepOk ? (subtotal >= FRETE_GRATIS_A_PARTIR_DE ? 0 : FRETE_PADRAO) : null
  const total = subtotal + (frete ?? 0)

  function calcFrete(e) {
    e.preventDefault()
    if (cep.replace(/\D/g, '').length !== 8) {
      setCepOk(false)
      setCepError('Digite um CEP com 8 números.')
      return
    }
    setCepError('')
    setCepOk(true)
  }

  async function checkout() {
    if (!user) { navigate('/login?next=/carrinho'); return }
    setBusy(true)
    try {
      const r = await api.createOrder(items)
      clear()
      setOrderId(r.id)
    } catch (err) {
      toast(err.message || 'Não foi possível finalizar o pedido.')
    } finally {
      setBusy(false)
    }
  }

  let title = 'Meu carrinho'
  let subtitle = 'Revise seus itens antes de finalizar.'
  let body

  if (orderId) {
    title = 'Pedido realizado'
    subtitle = 'Obrigado pela compra!'
    body = (
      <div className="c-empty">
        <span className="ok-ring"><Icon name="check" size={28} /></span>
        <h2>Pedido #{orderId} confirmado</h2>
        <p>Você pode acompanhar cada etapa em Meus pedidos.</p>
        <div className="c-empty-actions">
          <Link className="btn btn-primary btn-sm" to="/pedidos">Ver meus pedidos</Link>
          <Link className="btn btn-ghost btn-sm" to="/catalogo">Continuar comprando</Link>
        </div>
      </div>
    )
  } else if (!items.length) {
    subtitle = 'Você ainda não adicionou nenhum item.'
    body = (
      <div className="c-empty">
        <span className="ok-ring muted"><Icon name="bag" size={28} /></span>
        <h2>Seu carrinho está vazio</h2>
        <p>Explore processadores, placas de vídeo, memórias e mais para montar seu próximo upgrade.</p>
        <div className="c-empty-actions"><Link className="btn btn-primary btn-sm" to="/catalogo">Explorar componentes</Link></div>
      </div>
    )
  } else {
    body = (
      <div className="cart-grid">
        <section className="c-list" aria-label="Itens do carrinho">
          {items.map((i) => (
            <CartItem
              key={i.id}
              item={i}
              maxQty={maxQty}
              onQty={(q) => setQty(i.id, q)}
              onRemove={() => { remove(i.id); toast('Item removido') }}
            />
          ))}
        </section>

        <aside className="c-sum" aria-label="Resumo do pedido">
          <h2>Resumo do pedido</h2>
          <dl>
            <div><dt>Subtotal ({count} {count === 1 ? 'item' : 'itens'})</dt><dd>{brl(subtotal)}</dd></div>
            <div><dt>Frete</dt><dd className={frete === 0 ? 'ok' : ''}>{frete === null ? 'Informe o CEP' : frete === 0 ? 'Grátis' : brl(frete)}</dd></div>
          </dl>

          <form className="cep" onSubmit={calcFrete} noValidate>
            <label htmlFor="cep">Calcular frete</label>
            <div className="cep-row">
              <div className={`input${cepError ? ' invalid' : ''}`}>
                <input id="cep" inputMode="numeric" placeholder="00000-000" maxLength={9} value={cep} onChange={(e) => setCep(MASKS.cep(e.target.value))} />
              </div>
              <button className="btn btn-ghost btn-sm" type="submit">Calcular</button>
            </div>
            <p className="hint">{cepError || `Frete grátis em compras a partir de ${brl(FRETE_GRATIS_A_PARTIR_DE)}.`}</p>
          </form>

          <div className="total"><span>Total à vista no Pix</span><b>{brl(total)}</b></div>
          <p className="p-meta">5% de desconto já aplicado • ou 12x de {brl(total / 0.95 / 12)} sem juros</p>
          <button className="btn btn-primary" type="button" onClick={checkout} disabled={busy}>
            {user ? 'Finalizar compra' : 'Entrar para finalizar'} <Icon name="arrow" size={16} />
          </button>
          <p className="secure-note"><Icon name="shieldok" size={14} />Compra 100% segura</p>
        </aside>
      </div>
    )
  }

  return (
    <StoreShell>
      <main className="wrap">
        <nav className="crumbs" aria-label="Você está em"><Link to="/catalogo">Início</Link> / <b>Carrinho</b></nav>
        <div className="page-head">
          <div><h1>{title}</h1><p>{subtitle}</p></div>
          <Link className="help" to="/catalogo">Continuar comprando <Icon name="arrow" size={15} /></Link>
        </div>
        <div aria-live="polite">{body}</div>
      </main>
    </StoreShell>
  )
}
