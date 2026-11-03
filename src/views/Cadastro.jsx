import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import Icon from '../components/Icon.jsx'
import AddressSection, { ADDRESS_INITIAL, ADDRESS_RULES } from '../components/AddressSection.jsx'
import { CheckField, FormSection, PasswordField, TextField } from '../components/FormFields.jsx'
import { useForm } from '../hooks/useForm.js'
import { useToast } from '../context/ToastContext.jsx'
import api from '../services/api.js'

const INITIAL = {
  nome: '', cpf: '', nasc: '', cel: '',
  email: '', email2: '', senha: '', senha2: '',
  ...ADDRESS_INITIAL,
  termos: false, ofertas: false,
}

const RULES = {
  nome: { required: true },
  cpf: { required: true, len: 11 },
  nasc: { required: true, len: 8 },
  cel: { required: true },
  email: { required: true, email: true },
  email2: { required: true, email: true, match: 'email' },
  senha: { required: true, password: true },
  senha2: { required: true, match: 'senha' },
  ...ADDRESS_RULES,
  termos: { required: true },
}

export default function Cadastro() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [busy, setBusy] = useState(false)
  const form = useForm(INITIAL, RULES)

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.validateAll()) return
    setBusy(true)
    try {
      const { email2, senha2, termos, ...payload } = form.values // confirmações não vão para o servidor
      await api.registerCustomer(payload)
      toast('Conta criada! Vamos para o login…')
      setTimeout(() => navigate('/login'), 1100)
    } catch (err) {
      setBusy(false)
      toast(err.message || 'Não foi possível criar a conta.')
    }
  }

  return (
    <AuthShell>
      <main className="split">
        <section className="side">
          <p className="eyebrow">01 / Sua conta ElectroHub</p>
          <h1 className="h-lg">Um cadastro.<br />Infinitas possibilidades.</h1>
          <p className="lead">Crie sua conta e dê o próximo passo no seu setup. Comprar tecnologia pode ser simples.</p>
          <ul className="feat">
            <li><span className="tile"><Icon name="box" size={18} /></span><div><strong>Tudo sobre seus pedidos</strong><span>Acompanhe cada etapa em um só lugar.</span></div></li>
            <li><span className="tile"><Icon name="heart" size={18} /></span><div><strong>Seu próximo upgrade</strong><span>Salve favoritos e encontre suas peças.</span></div></li>
            <li><span className="tile"><Icon name="shield" size={18} /></span><div><strong>Seus dados protegidos</strong><span>Segurança em todas as suas compras.</span></div></li>
          </ul>
          <div className="callout">
            <strong>Já tem uma conta?</strong>
            <Link className="link" to="/login" style={{ fontWeight: 500, fontSize: 12.5 }}>Entre na ElectroHub <Icon name="arrow" size={13} /></Link>
          </div>
          <p className="tiny">Dados ilustrativos para demonstração da interface.</p>
        </section>

        <section className="card-form" aria-labelledby="t">
          <div className="card-head">
            <div>
              <h1 id="t">Crie sua conta</h1>
              <p>Preencha seus dados. Campos com * são obrigatórios.</p>
            </div>
            <Icon name="userplus" size={22} />
          </div>

          <form onSubmit={onSubmit} noValidate>
            <FormSection n="01" title="Dados pessoais" />
            <div className="grid g2">
              <TextField label="Nome completo *" form={form} name="nome" placeholder="Rafael Almeida Costa" autoComplete="name" />
              <TextField label="CPF *" form={form} name="cpf" mask="cpf" inputMode="numeric" placeholder="000.000.000-00" />
            </div>
            <div className="grid g2">
              <TextField label="Data de nascimento *" form={form} name="nasc" mask="date" inputMode="numeric" placeholder="15/08/1995" autoComplete="bday" />
              <TextField label="Celular *" form={form} name="cel" mask="phone" type="tel" placeholder="(11) 99999-1234" autoComplete="tel" />
            </div>

            <FormSection n="02" title="Contato e acesso" />
            <div className="grid g2">
              <TextField label="E-mail *" form={form} name="email" type="email" placeholder="rafael.costa@example.com" autoComplete="email" />
              <TextField label="Confirmar e-mail *" form={form} name="email2" type="email" placeholder="rafael.costa@example.com" />
            </div>
            <div className="grid g2">
              <PasswordField label="Senha *" form={form} name="senha" placeholder="••••••••••••" autoComplete="new-password" />
              <PasswordField label="Confirmar senha *" form={form} name="senha2" placeholder="••••••••••••" autoComplete="new-password" />
            </div>

            <AddressSection
              form={form}
              title="Endereço de entrega"
              ph={{ cep: '05422-001', rua: 'Rua dos Pinheiros', numero: '870', comp: 'Apartamento 42', bairro: 'Pinheiros', cidade: 'São Paulo' }}
            />

            <div className="form-foot">
              <p className="hint">Use uma senha com 8 ou mais caracteres, letras e números.</p>
              <CheckField form={form} name="termos">Li e aceito os Termos de uso e a Política de privacidade. *</CheckField>
              <CheckField form={form} name="ofertas">Quero receber ofertas e novidades por e-mail.</CheckField>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                Criar minha conta <Icon name="arrow" size={16} />
              </button>
            </div>
          </form>
        </section>
      </main>
    </AuthShell>
  )
}
