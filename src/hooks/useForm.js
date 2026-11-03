import { useState } from 'react'
import { validateField } from '../utils/validators.js'

/**
 * Estado + validação de formulário.
 *   const form = useForm({ email: '' }, { email: { required: true, email: true } })
 *   form.bind('email', 'cpf')  -> { value, onChange, onBlur, error }   (2º argumento = máscara opcional)
 *   form.bindCheck('termos')   -> { checked, onChange, error }
 *   form.validateAll()         -> true se tudo ok (foca o primeiro campo com erro)
 */
export function useForm(initial, rules = {}) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const check = (name, vals) => validateField(rules[name], vals[name], vals)

  function set(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: check(name, { ...values, [name]: value }) }))
  }

  function setMany(patch) {
    setValues((prev) => ({ ...prev, ...patch }))
    setErrors((e) => {
      const next = { ...e }
      Object.keys(patch).forEach((k) => delete next[k])
      return next
    })
  }

  function bind(name, mask) {
    return {
      value: values[name],
      error: errors[name],
      onChange: (ev) => set(name, mask ? mask(ev.target.value) : ev.target.value),
      onBlur: () => setErrors((e) => ({ ...e, [name]: check(name, values) })),
    }
  }

  function bindCheck(name) {
    return {
      checked: !!values[name],
      error: errors[name],
      onChange: (ev) => {
        const val = ev.target.checked
        setValues((prev) => ({ ...prev, [name]: val }))
        if (rules[name]) setErrors((e) => ({ ...e, [name]: check(name, { ...values, [name]: val }) }))
      },
    }
  }

  function validateAll() {
    const next = {}
    let first = null
    Object.keys(rules).forEach((name) => {
      const msg = check(name, values)
      if (msg) {
        next[name] = msg
        if (!first) first = name
      }
    })
    setErrors(next)
    if (first) document.getElementById(first)?.focus()
    return !first
  }

  return { values, errors, bind, bindCheck, set, setMany, validateAll }
}
