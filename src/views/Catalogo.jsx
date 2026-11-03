import { useMemo, useRef, useState } from 'react'
import StoreShell from '../components/StoreShell.jsx'
import Icon from '../components/Icon.jsx'
import Art from '../components/Art.jsx'
import { BRANDS, CATS, PRODUCTS } from '../data/products.js'
import { brl, norm } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const DEFAULTS = { min: 0, max: 5000, stock: true }
const toNumber = (v, fallback) => {
  const n = parseInt(String(v).replace(/\D/g, ''), 10)
  return Number.isNaN(n) ? fallback : n
}

function ProductCard({ p, fav, onFav, onAdd }) {
  const parcela = p.price / 0.95 / 12
  return (
    <article className="p-card">
      <div className="p-img">
        <span className="p-tag">{p.tag}</span>
        <button className={`fav${fav ? ' on' : ''}`} type="button" onClick={onFav} aria-label={`Favoritar ${p.name}`} aria-pressed={fav}>
          <Icon name="heart" size={17} />
        </button>
        <Art kind={p.art.kind} arg={p.art.arg} />
      </div>
      <div className="p-body">
        <span className="p-brand">{p.brand}</span>
        <h3 className="p-name">{p.name}</h3>
        <span className="p-spec">{p.spec}</span>
        <div className="stars" aria-label="Avaliação 5 de 5">★★★★★<span>({p.rev})</span></div>
        <span className="old">{brl(p.old)}</span>
        <span className="price">{brl(p.price)}</span>
        <span className="p-meta">à vista no Pix • 5% de desconto</span>
        <span className="p-meta">ou 12x de {brl(parcela)} sem juros</span>
        {p.stock ? (
          <button className="btn btn-primary" type="button" onClick={onAdd}>
            Adicionar ao carrinho <Icon name="plus" size={15} />
          </button>
        ) : (
          <button className="btn btn-ghost" type="button" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Indisponível</button>
        )}
      </div>
    </article>
  )
}

export default function Catalogo() {
  const { add } = useCart()
  const { toast } = useToast()
  const catsRef = useRef(null)
  const listRef = useRef(null)

  const [cats, setCats] = useState({})
  const [brands, setBrands] = useState({})
  const [applied, setApplied] = useState(DEFAULTS)           // filtros em vigor
  const [draft, setDraft] = useState({ min: '', max: '', stock: true }) // preço/estoque aguardam "Aplicar"
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('rel')
  const [favs, setFavs] = useState({})

  const selectedCats = Object.keys(cats).filter((k) => cats[k])
  const selectedBrands = Object.keys(brands).filter((k) => brands[k])

  const rows = useMemo(() => {
    const term = norm(q.trim())
    const list = PRODUCTS.filter((p) => {
      if (selectedCats.length && !cats[p.cat]) return false
      if (selectedBrands.length && !brands[p.brand]) return false
      if (p.price < applied.min || p.price > applied.max) return false
      if (applied.stock && !p.stock) return false
      if (term && !norm(`${p.name} ${p.brand} ${CATS[p.cat]} ${p.spec}`).includes(term)) return false
      return true
    })
    list.sort((a, b) => {
      if (sort === 'menor') return a.price - b.price
      if (sort === 'maior') return b.price - a.price
      if (sort === 'nome') return a.name.localeCompare(b.name, 'pt-BR')
      return b.rel - a.rel
    })
    return list
  }, [q, cats, brands, applied, sort]) // eslint-disable-line react-hooks/exhaustive-deps

  function applyFilters() {
    setApplied({ min: toNumber(draft.min, 0), max: toNumber(draft.max, 5000), stock: draft.stock })
    toast('Filtros aplicados')
  }

  function clearAll() {
    setCats({}); setBrands({}); setApplied(DEFAULTS); setDraft({ min: '', max: '', stock: true }); setQ(''); setSort('rel')
  }

  function pickCategory(k) {
    const only = selectedCats.length === 1 && cats[k]
    setCats(only ? {} : { [k]: true })
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function addToCart(p) {
    add({ id: p.id, name: p.name, spec: p.spec, price: p.price, old: p.old, cat: p.cat, brand: p.brand })
    toast(`${p.name} adicionado ao carrinho`)
  }

  return (
    <StoreShell>
      <div className="searchrow">
        <div className="in">
          <button className="allcats" type="button" onClick={() => catsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
            <Icon name="menu" size={18} /><span>Todas as categorias</span>
          </button>
          <div className="search">
            <label className="input">
              <span className="sr">Buscar produtos</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="O que falta no seu setup? Busque por produto, marca ou modelo" />
              <Icon name="search" size={16} />
            </label>
          </div>
        </div>
      </div>

      <main className="wrap">
        <section className="hero" id="ofertas" aria-label="Semana do upgrade">
          <div>
            <p className="eyebrow">Semana do upgrade</p>
            <h1>O próximo nível do seu setup começa na peça certa.</h1>
            <p>Potência para jogar, criar e ir além. RTX 4060 a partir de R$ 2.198,90.</p>
            <button className="btn btn-white" type="button" onClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Explorar ofertas <Icon name="arrow" size={15} />
            </button>
          </div>
          <Art kind="gpu" className="art" />
          <div className="badge-off"><b>-15%</b><small>na RTX 4060</small></div>
        </section>

        <div className="benefits">
          <div><Icon name="truck" size={17} />Entrega em todo o Brasil</div>
          <div><Icon name="card" size={17} />Até 12x sem juros</div>
          <div><Icon name="shieldok" size={17} />Compra 100% segura</div>
          <div><Icon name="percent" size={17} />5% de desconto no Pix</div>
        </div>

        <div className="cats" ref={catsRef}>
          {Object.entries(CATS).map(([k, label]) => (
            <button key={k} type="button" className={`cat${selectedCats.length === 1 && cats[k] ? ' on' : ''}`} onClick={() => pickCategory(k)}>
              <Icon name={k} size={18} />{label}
            </button>
          ))}
        </div>

        <div className="shop" ref={listRef}>
          <aside className="filters" aria-label="Filtros">
            <div className="head"><h2>Filtros</h2><button className="link" type="button" onClick={clearAll}>Limpar</button></div>

            <div className="fgroup">
              <h3>Categorias</h3>
              {Object.entries(CATS).map(([k, label]) => (
                <label className="chk" key={k}>
                  <input type="checkbox" checked={!!cats[k]} onChange={(e) => setCats((c) => ({ ...c, [k]: e.target.checked }))} />
                  <span>{label} ({PRODUCTS.filter((p) => p.cat === k).length})</span>
                </label>
              ))}
            </div>

            <div className="fgroup">
              <h3>Marcas</h3>
              {BRANDS.map((b) => (
                <label className="chk" key={b}>
                  <input type="checkbox" checked={!!brands[b]} onChange={(e) => setBrands((x) => ({ ...x, [b]: e.target.checked }))} />
                  <span>{b}</span>
                </label>
              ))}
            </div>

            <div className="fgroup">
              <h3>Preço</h3>
              <div className="price-row">
                <label className="input"><span className="sr">Preço mínimo</span>
                  <input inputMode="numeric" placeholder="R$ 0" value={draft.min} onChange={(e) => setDraft((d) => ({ ...d, min: e.target.value }))} />
                </label>
                <label className="input"><span className="sr">Preço máximo</span>
                  <input inputMode="numeric" placeholder="R$ 5.000" value={draft.max} onChange={(e) => setDraft((d) => ({ ...d, max: e.target.value }))} />
                </label>
              </div>
              <input
                className="range" type="range" min="0" max="5000" step="50" aria-label="Preço máximo"
                value={applied.max}
                onChange={(e) => {
                  const v = +e.target.value
                  setApplied((a) => ({ ...a, max: v }))
                  setDraft((d) => ({ ...d, max: `R$ ${v}` }))
                }}
              />
            </div>

            <label className="chk">
              <input type="checkbox" checked={draft.stock} onChange={(e) => setDraft((d) => ({ ...d, stock: e.target.checked }))} />
              <span>Somente em estoque</span>
            </label>
            <button className="btn btn-primary" type="button" onClick={applyFilters}>Aplicar filtros</button>
          </aside>

          <section aria-labelledby="rt">
            <div className="results-head">
              <div>
                <h2 id="rt">Encontre seu próximo upgrade</h2>
                <p>{rows.length} componentes • Selecionados para o seu setup</p>
              </div>
              <div className="sel">
                <div className="input">
                  <select aria-label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="rel">Mais relevantes</option>
                    <option value="menor">Menor preço</option>
                    <option value="maior">Maior preço</option>
                    <option value="nome">Nome (A–Z)</option>
                  </select>
                </div>
                <Icon name="chev" size={14} />
              </div>
            </div>

            <div className="grid-p" aria-live="polite">
              {rows.length ? (
                rows.map((p) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    fav={!!favs[p.id]}
                    onFav={() => setFavs((f) => ({ ...f, [p.id]: !f[p.id] }))}
                    onAdd={() => addToCart(p)}
                  />
                ))
              ) : (
                <div className="empty no-res">Nenhum componente encontrado. Tente limpar os filtros.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </StoreShell>
  )
}
