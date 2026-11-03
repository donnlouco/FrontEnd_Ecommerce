# ElectroHub — front-end (React + Vite)

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera a pasta dist/
```

## Páginas

| Rota          | Arquivo                      | Observação                              |
|---------------|------------------------------|-----------------------------------------|
| `/catalogo`   | `src/views/Catalogo.jsx`     | página inicial (`/` redireciona para cá)|
| `/carrinho`   | `src/views/Carrinho.jsx`     | itens, quantidade, frete, finalizar     |
| `/login`      | `src/views/Login.jsx`        |                                         |
| `/cadastro`   | `src/views/Cadastro.jsx`     | cliente                                 |
| `/fornecedor` | `src/views/Fornecedor.jsx`   |                                         |
| `/pedidos`    | `src/perfil/Pedidos.jsx`     | **exige login** (`RequireAuth`)         |

## Como o código está organizado

- `src/components/` peças reutilizáveis: moldura da loja (`StoreShell`), moldura de login/cadastros (`AuthShell`), campos de formulário, endereço com busca de CEP, ícones e ilustrações.
- `src/context/` estado global: `AuthContext` (usuário logado), `CartContext` (carrinho) e `ToastContext` (avisos). Login e carrinho ficam salvos no `localStorage`.
- `src/services/api.js` **único lugar que fala com o back-end**.
- `src/hooks/useForm.js` + `src/utils/` máscaras (CPF, CNPJ, CEP, telefone, data) e validações.
- `src/data/` produtos e pedidos de demonstração.

## Conectar ao FastAPI

1. Copie `.env.example` para `.env` e troque `VITE_USE_API=true`.
2. Suba o FastAPI na porta 8000: `uvicorn main:app --reload --port 8000`.
3. Em desenvolvimento o Vite encaminha `/api/*` para `http://localhost:8000` (veja `vite.config.js`), então **não precisa de CORS**.
4. Ajuste os caminhos e campos em `src/services/api.js` para os das suas rotas. Hoje ele espera:

| Função                  | Chamada                                                       |
|-------------------------|---------------------------------------------------------------|
| `login(email, senha)`   | `POST /auth/login` → `{ access_token, user: { nome, email } }` |
| `registerCustomer(...)` | `POST /clientes`                                              |
| `registerSupplier(...)` | `POST /fornecedores`                                          |
| `createOrder(itens)`    | `POST /pedidos` com `{ itens: [{ produto_id, quantidade }] }` |
| `listProducts()`        | `GET /produtos` (ainda não usado pelo catálogo)               |
| `listOrders()`          | `GET /pedidos` (ainda não usado por Meus pedidos)             |

O token é enviado como `Authorization: Bearer ...` em todas as chamadas.

**Para produção** (sem o proxy do Vite), defina `VITE_API_URL` com a URL completa do back-end e libere o front no CORS do FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Sem back-end

Com `VITE_USE_API=false` (padrão) o login aceita qualquer e-mail e senha válidos, os cadastros só mostram o aviso de sucesso e o pedido finalizado recebe um número de exemplo. Serve para demonstrar a interface.
