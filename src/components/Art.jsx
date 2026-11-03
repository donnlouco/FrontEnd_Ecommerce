import { useMemo } from 'react'
import { ART } from '../data/art.js'

// Desenha a ilustração SVG de um componente. Com className, vira o próprio contêiner.
export default function Art({ kind, arg, className }) {
  const html = useMemo(() => (ART[kind] ? ART[kind](arg) : ''), [kind, arg])
  if (className) return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
}
