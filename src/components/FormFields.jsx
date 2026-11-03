import { useState } from 'react'
import Icon from './Icon.jsx'
import { MASKS } from '../utils/masks.js'

export const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

// "form" vem do hook useForm; "mask" é o nome de uma máscara de utils/masks.js (cpf, cep, phone...)
export function TextField({ label, form, name, mask, icon, type = 'text', ...rest }) {
  const b = form.bind(name, mask ? MASKS[mask] : undefined)
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={`input${b.error ? ' invalid' : ''}`}>
        {icon && <Icon name={icon} size={16} />}
        <input id={name} name={name} type={type} value={b.value} onChange={b.onChange} onBlur={b.onBlur} {...rest} />
      </div>
      {b.error && <div className="err">{b.error}</div>}
    </div>
  )
}

export function PasswordField({ label, form, name, icon, ...rest }) {
  const [show, setShow] = useState(false)
  const b = form.bind(name)
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={`input${b.error ? ' invalid' : ''}`}>
        {icon && <Icon name={icon} size={16} />}
        <input id={name} name={name} type={show ? 'text' : 'password'} value={b.value} onChange={b.onChange} onBlur={b.onBlur} {...rest} />
        <button type="button" className="toggle" aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShow((s) => !s)}>
          <Icon name={show ? 'eye' : 'eyeoff'} size={16} />
        </button>
      </div>
      {b.error && <div className="err">{b.error}</div>}
    </div>
  )
}

export function SelectField({ label, form, name, placeholder, options }) {
  const b = form.bind(name)
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={`input${b.error ? ' invalid' : ''}`}>
        <select id={name} name={name} value={b.value} onChange={b.onChange} onBlur={b.onBlur}>
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <Icon name="chev" size={14} />
      </div>
      {b.error && <div className="err">{b.error}</div>}
    </div>
  )
}

export function CheckField({ form, name, children }) {
  const b = form.bindCheck(name)
  return (
    <div>
      <label className={`chk${b.error ? ' invalid' : ''}`}>
        <input id={name} name={name} type="checkbox" checked={b.checked} onChange={b.onChange} />
        <span>{children}</span>
      </label>
      {b.error && <div className="err" style={{ marginLeft: 26 }}>{b.error}</div>}
    </div>
  )
}

export function FormSection({ n, title }) {
  return (
    <div className="fsec"><small>{n}</small><h2>{title}</h2></div>
  )
}
