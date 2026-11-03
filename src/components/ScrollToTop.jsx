import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Ao trocar de página volta ao topo; se a URL tem #âncora, rola até ela.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
