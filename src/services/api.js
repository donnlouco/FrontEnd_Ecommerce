/* ElectroHub — camada de acesso ao back-end (FastAPI)
 *
 * Todas as chamadas ao servidor passam por aqui. Com VITE_USE_API=false (padrão),
 * o site roda sozinho com dados de demonstração. Para conectar:
 *   1. Suba o FastAPI:  uvicorn main:app --reload --port 8000
 *   2. Crie o arquivo .env com VITE_USE_API=true
 *   3. Ajuste os caminhos e campos abaixo para os das suas rotas
 *
 * Em desenvolvimento o Vite encaminha /api/* para http://localhost:8000 (veja vite.config.js).
 */
const CONFIG = {
  USE_API: import.meta.env.VITE_USE_API === 'true',
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
}

const TOKEN_KEY = 'eh-token'

function getToken() {
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}
function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch { /* sem storage */ }
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { Accept: 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(CONFIG.BASE_URL + path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  } catch {
    throw new Error('Não foi possível conectar ao servidor.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data?.detail
    throw new Error(typeof detail === 'string' ? detail : `Erro ${res.status} ao falar com o servidor.`)
  }
  return data
}

function nameFromEmail(email) {
  const base = (email || 'cliente').split('@')[0].replace(/[._-]+/g, ' ').trim()
  return base.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Cliente'
}

const api = {
  config: CONFIG,

  /** POST /auth/login  { email, senha }  ->  { access_token, user: { nome, email } } */
  async login(email, senha) {
    if (!CONFIG.USE_API) return { nome: nameFromEmail(email), email } // demonstração: aceita qualquer login
    const data = await request('/auth/login', { method: 'POST', body: { email, senha } })
    setToken(data.access_token)
    return data.user || { nome: nameFromEmail(email), email }
  },

  logout() {
    setToken(null)
  },

  /** POST /clientes  ->  cliente criado */
  async registerCustomer(payload) {
    if (!CONFIG.USE_API) return payload
    return request('/clientes', { method: 'POST', body: payload })
  },

  /** POST /fornecedores  ->  pedido de cadastro enviado para análise */
  async registerSupplier(payload) {
    if (!CONFIG.USE_API) return payload
    return request('/fornecedores', { method: 'POST', body: payload })
  },

  /** GET /produtos  ->  lista de produtos (null = usar a lista local da página) */
  async listProducts() {
    if (!CONFIG.USE_API) return null
    return request('/produtos')
  },

  /** GET /pedidos  ->  pedidos do usuário logado (null = usar os de demonstração) */
  async listOrders() {
    if (!CONFIG.USE_API) return null
    return request('/pedidos')
  },

  /** POST /pedidos  { itens: [{ produto_id, quantidade }] }  ->  { id } */
  async createOrder(items) {
    if (!CONFIG.USE_API) return { id: 'EH' + (10500 + Math.floor(Math.random() * 400)) }
    return request('/pedidos', {
      method: 'POST',
      body: { itens: items.map((i) => ({ produto_id: i.id, quantidade: i.qty })) },
    })
  },
}

export default api
