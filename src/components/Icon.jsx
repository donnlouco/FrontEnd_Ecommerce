import { ICONS } from '../data/icons.js'

export default function Icon({ name, size = 18, className = '', style }) {
  return (
    <i className={`ico ${className}`.trim()} style={style} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }}
      />
    </i>
  )
}
