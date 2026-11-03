import { useEffect } from 'react'
import { FormSection, SelectField, TextField, UFS } from './FormFields.jsx'

// Seção de endereço usada nos dois cadastros. Ao digitar um CEP válido, busca no ViaCEP
// e preenche rua, bairro, cidade e UF (precisa de internet; sem rede o usuário digita).
export default function AddressSection({ form, n = '03', title, ph }) {
  const cepDigits = form.values.cep.replace(/\D/g, '')
  const { setMany } = form

  useEffect(() => {
    if (cepDigits.length !== 8) return undefined
    const ctrl = new AbortController()
    fetch(`https://viacep.com.br/ws/${cepDigits}/json/`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((a) => {
        if (a.erro) return
        const patch = {}
        if (a.logradouro) patch.rua = a.logradouro
        if (a.bairro) patch.bairro = a.bairro
        if (a.localidade) patch.cidade = a.localidade
        if (a.uf) patch.uf = a.uf
        setMany(patch)
        document.getElementById('numero')?.focus()
      })
      .catch(() => { /* sem rede: preenche manualmente */ })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepDigits])

  return (
    <>
      <FormSection n={n} title={title} />
      <div className="grid g-cep">
        <TextField label="CEP *" form={form} name="cep" mask="cep" inputMode="numeric" placeholder={ph.cep} autoComplete="postal-code" />
        <TextField label="Rua / Avenida *" form={form} name="rua" placeholder={ph.rua} autoComplete="address-line1" />
      </div>
      <div className="grid g-cep">
        <TextField label="Número *" form={form} name="numero" placeholder={ph.numero} />
        <TextField label="Complemento" form={form} name="comp" placeholder={ph.comp} />
      </div>
      <div className="grid g-city">
        <TextField label="Bairro *" form={form} name="bairro" placeholder={ph.bairro} />
        <TextField label="Cidade *" form={form} name="cidade" placeholder={ph.cidade} />
        <SelectField label="UF *" form={form} name="uf" placeholder="UF" options={UFS} />
      </div>
    </>
  )
}

export const ADDRESS_INITIAL = { cep: '', rua: '', numero: '', comp: '', bairro: '', cidade: '', uf: '' }
export const ADDRESS_RULES = {
  cep: { required: true, len: 8 },
  rua: { required: true },
  numero: { required: true },
  bairro: { required: true },
  cidade: { required: true },
  uf: { required: true },
}
