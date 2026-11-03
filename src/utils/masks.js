export const onlyDigits = (v, max) => String(v).replace(/\D/g, '').slice(0, max)

function format(d, sizes, seps) {
  let out = ''
  let i = 0
  for (let k = 0; k < sizes.length && i < d.length; k++) {
    if (k > 0) out += seps[k - 1]
    out += d.slice(i, i + sizes[k])
    i += sizes[k]
  }
  return out
}

export const MASKS = {
  cpf: (v) => format(onlyDigits(v, 11), [3, 3, 3, 2], ['.', '.', '-']),
  cnpj: (v) => format(onlyDigits(v, 14), [2, 3, 3, 4, 2], ['.', '.', '/', '-']),
  cep: (v) => format(onlyDigits(v, 8), [5, 3], ['-']),
  date: (v) => format(onlyDigits(v, 8), [2, 2, 4], ['/', '/']),
  ie: (v) => format(onlyDigits(v, 12), [3, 3, 3, 3], ['.', '.', '.']),
  phone: (v) => {
    const d = onlyDigits(v, 11)
    if (!d.length) return ''
    if (d.length <= 2) return '(' + d
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + (d.length > 6 ? '-' + d.slice(6) : '')
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7)
  },
}
