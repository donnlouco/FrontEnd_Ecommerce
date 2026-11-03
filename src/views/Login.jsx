import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import Icon from '../components/Icon.jsx'
import Art from '../components/Art.jsx'
import DeadLink from '../components/DeadLink.jsx'
import { CheckField, PasswordField, TextField } from '../components/FormFields.jsx'
import { useForm } from '../hooks/useForm.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { login } = useAuth()
  const { toast } = useToast()
  const [busy, setBusy] = useState(false)

  const form = useForm(
    { email: '', senha: '', lembrar: false },
    { email: { required: true, email: true }, senha: { required: true } }
  )

  // Só aceita voltar para caminhos internos simples (/pedidos, /carrinho...)
  const next = /^\/[a-z]+$/.test(params.get('next') || '') ? params.get('next') : '/catalogo'

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.validateAll()) return
    setBusy(true)
    try {
      await login(form.values.email.trim(), form.values.senha)
      toast('Login realizado! Redirecionando…')
      setTimeout(() => navigate(next, { replace: true }), 800)
    } catch (err) {
      setBusy(false)
      toast(err.message || 'Não foi possível entrar.')
    }
  }

  return (
    <AuthShell whiteBody>
      <main className="auth">
        <section className="auth-left">
          <div className="box">
            <p className="eyebrow">01 / Conecte-se às possibilidades</p>
            <h1 className="h-xl">Seu próximo upgrade começa aqui.</h1>
            <p className="lead">Entre na sua conta para acompanhar pedidos e encontrar as peças certas para o seu setup.</p>

            <form onSubmit={onSubmit} noValidate>
              <TextField label="E-mail" form={form} name="email" type="email" icon="mail" placeholder="seuemail@exemplo.com" autoComplete="email" />
              <PasswordField label="Senha" form={form} name="senha" icon="lock" placeholder="Digite sua senha" autoComplete="current-password" />
              <div className="row-between">
                <CheckField form={form} name="lembrar">Lembrar de mim</CheckField>
                <DeadLink className="link" style={{ fontWeight: 500, fontSize: 12 }}>Esqueci minha senha</DeadLink>
              </div>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                Entrar na minha conta <Icon name="arrow" size={16} />
              </button>
              <div className="divider">Novo por aqui?</div>
              <Link className="btn btn-ghost" to="/cadastro">Criar minha conta</Link>
              <p className="small-note">
                Quer vender com a gente?{' '}
                <Link className="link" to="/fornecedor" style={{ fontWeight: 500, fontSize: 12.5 }}>
                  Seja fornecedor <Icon name="ext" size={11} />
                </Link>
              </p>
            </form>
          </div>
        </section>

        <aside className="auth-right" aria-label="Destaques da ElectroHub">
          <span className="pill"><Icon name="bolt" size={13} />Tecnologia que acompanha você</span>
          <h2>Mais desempenho.<br />Mais possibilidades.</h2>
          <Art kind="desk" className="scene" />
          <div className="perks">
            <div className="perk"><Icon name="shieldok" size={20} /><div><strong>Compra protegida</strong>Do clique à entrega</div></div>
            <div className="perk"><Icon name="truck" size={20} /><div><strong>Envio para todo o Brasil</strong>Seu setup, onde estiver</div></div>
          </div>
        </aside>
      </main>
    </AuthShell>
  )
}
