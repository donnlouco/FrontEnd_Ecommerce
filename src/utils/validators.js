// Regras aceitas: required, email, len (qtde de dígitos), password, match (nome de outro campo)
export function validateField(rule = {}, value, values) {
  const isBool = typeof value === 'boolean'
  const empty = isBool ? !value : !String(value ?? '').trim()
  if (rule.required && empty) return isBool ? 'Aceite para continuar.' : 'Preencha este campo.'
  if (empty) return ''
  const v = String(value).trim()
  if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Digite um e-mail válido.'
  if (rule.len && v.replace(/\D/g, '').length !== rule.len) return 'Confira o número digitado.'
  if (rule.password && !(v.length >= 8 && /[a-zA-Z]/.test(v) && /\d/.test(v))) {
    return 'Use 8 ou mais caracteres, com letras e números.'
  }
  if (rule.match && String(values[rule.match] ?? '').trim() !== v) return 'Os campos não conferem.'
  return ''
}
