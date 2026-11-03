import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function Logo() {
  return (
    <Link className="logo" to="/catalogo" aria-label="ElectroHub, página inicial">
      <span className="logo-mark"><Icon name="bolt" size={20} /></span>
      Electro<b>Hub</b>
    </Link>
  )
}
