import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import Icon from '../components/Icon.jsx'
import AddressSection, { ADDRESS_INITIAL, ADDRESS_RULES } from '../components/AddressSection.jsx'
import { CheckField, FormSection, SelectField, TextField } from '../components/FormFields.jsx'
import { useForm } from '../hooks/useForm.js'
import { useToast } from '../context/ToastContext.jsx'
import api from '../services/api.js'

const CATEGORIAS = ['Componentes de informática', 'Periféricos', 'Notebooks e computadores', 'Games', 'Redes e conectividade', 'Outros']

const INITIAL = {
  razao: '', fantasia: '', cnpj: '', ie: '',
  resp: '', tel: '', email: '', cat: CATEGORIAS[0],
  ...ADDRESS_INITIAL,
  termos: false,
}

const RULES = {
  razao: { required: true },
  fantasia: { required: true },
  cnpj: { required: true, len: 14 },
  resp: { required: true },
  tel: { required: true },
  email: { required: true, email: true },
  cat: { required: true },
  ...ADDRESS_RULES,
  termos: { required: true },
}

export default function Fornecedor() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [busy, setBusy] = useState(false)
  const form = useForm(INITIAL, RULES)

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.validateAll()) return
    setBusy(true)
    try {
      const { termos, ...payload } = form.values
      await api.registerSupplier(payload)
      toast('Cadastro enviado para análise. Falamos por e-mail!')
      setTimeout(() => navigate('/catalogo'), 1600)
    } catch (err) {
      setBusy(false)
      toast(err.message || 'Não foi possível enviar o cadastro.')
    }
  }

  return (
    <AuthShell>
      <main className="split">
        <section className="side">
          <p className="eyebrow">01 / Conecte sua empresa</p>
          <h1 className="h-lg">Grandes peças.<br />Grandes parcerias.</h1>
          <p className="lead">Faça parte da nossa rede de fornecedores e leve seus componentes a quem entende de tecnologia.</p>

          <div className="how">
            <h3>Como funciona</h3>
            <ol>
              <li><span className="n">1</span><div><strong>Cadastre sua empresa</strong><span>Informe os dados e seu contato comercial.</span></div></li>
              <li><span className="n">2</span><div><strong>Análise do nosso time</strong><span>Retornamos em até 2 dias úteis.</span></div></li>
              <li><span className="n">3</span><div><strong>Vamos crescer juntos</strong><span>Alinhamos catálogo, condições e integração.</span></div></li>
            </ol>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="headset" size={18} style={{ color: 'var(--primary)' }} />
            <div>
              <strong style={{ display: 'block', color: 'var(--ink)', fontSize: 13 }}>Vamos conversar?</strong>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>parcerias@electrohub.example</span>
            </div>
          </div>
          <p className="tiny">Empresa e documentos fictícios para demonstração.</p>
        </section>

        <section className="card-form" aria-labelledby="t">
          <div className="card-head">
            <div>
              <h1 id="t">Seja nosso fornecedor</h1>
              <p>Conte sobre sua empresa. Campos com * são obrigatórios.</p>
            </div>
            <Icon name="building" size={22} style={{ color: 'var(--primary)' }} />
          </div>

          <form onSubmit={onSubmit} noValidate>
            <FormSection n="01" title="Dados da empresa" />
            <div className="grid g2">
              <TextField label="Razão social *" form={form} name="razao" placeholder="Circuito Tech Distribuidora Ltda." />
              <TextField label="Nome fantasia *" form={form} name="fantasia" placeholder="Circuito Tech" />
            </div>
            <div className="grid g2">
              <TextField label="CNPJ *" form={form} name="cnpj" mask="cnpj" inputMode="numeric" placeholder="00.000.000/0001-00" />
              <TextField label="Inscrição estadual" form={form} name="ie" mask="ie" inputMode="numeric" placeholder="000.000.000.000" />
            </div>

            <FormSection n="02" title="Contato comercial" />
            <div className="grid g2">
              <TextField label="Nome do responsável *" form={form} name="resp" placeholder="Marina Oliveira" autoComplete="name" />
              <TextField label="Telefone comercial *" form={form} name="tel" mask="phone" type="tel" placeholder="(11) 3333-4567" />
            </div>
            <div className="grid g2">
              <TextField label="E-mail comercial *" form={form} name="email" type="email" placeholder="marina@circuitotech.example" autoComplete="email" />
              <SelectField label="Categoria principal *" form={form} name="cat" placeholder="Selecione" options={CATEGORIAS} />
            </div>

            <AddressSection
              form={form}
              title="Endereço da empresa"
              ph={{ cep: '01310-100', rua: 'Avenida Paulista', numero: '1000', comp: 'Conjunto 42', bairro: 'Bela Vista', cidade: 'São Paulo' }}
            />

            <div className="form-foot">
              <CheckField form={form} name="termos">Sou representante autorizado e aceito os Termos de parceria e a Política de privacidade. *</CheckField>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                Enviar cadastro para análise <Icon name="arrow" size={16} />
              </button>
              <p className="form-note">O envio não garante aprovação. Nosso time entrará em contato por e-mail.</p>
            </div>
          </form>
        </section>
      </main>
    </AuthShell>
  )
}
