/**
 * Country Flag Component
 *
 * Renders SVG flags for UK countries to ensure consistent display
 * across all platforms (emoji flags don't render on Windows desktop).
 */

interface CountryFlagProps {
  country: 'england' | 'scotland' | 'wales' | 'northern-ireland' | string
  className?: string
}

export default function CountryFlag({ country, className = 'w-5 h-4' }: CountryFlagProps) {
  const slug = country.toLowerCase().replace(/\s+/g, '-')

  switch (slug) {
    case 'england':
      // St George's Cross - Red cross on white
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="England flag">
          <rect width="60" height="40" fill="white"/>
          <rect x="25" width="10" height="40" fill="#C8102E"/>
          <rect y="15" width="60" height="10" fill="#C8102E"/>
        </svg>
      )

    case 'scotland':
      // St Andrew's Cross - White diagonal on blue
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="Scotland flag">
          <rect width="60" height="40" fill="#0065BD"/>
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="white" strokeWidth="7"/>
        </svg>
      )

    case 'wales':
      // Welsh flag - Green and white with red dragon
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="Wales flag">
          <rect width="60" height="20" fill="white"/>
          <rect y="20" width="60" height="20" fill="#00AB39"/>
          {/* Simplified dragon silhouette */}
          <path
            d="M30,8 Q25,5 20,8 L15,12 Q12,10 10,12 L8,18 Q10,20 12,18 L18,15 Q20,18 25,16 L28,20 Q30,22 32,20 L35,16 Q40,18 42,15 L48,18 Q50,20 52,18 L50,12 Q48,10 45,12 L40,8 Q35,5 30,8"
            fill="#C8102E"
          />
        </svg>
      )

    case 'northern-ireland':
    case 'n-ireland':
    case 'ni':
      // Union Jack for Northern Ireland
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="Northern Ireland flag">
          <rect width="60" height="40" fill="#012169"/>
          {/* White diagonals */}
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="white" strokeWidth="8"/>
          {/* Red diagonals (offset) */}
          <path d="M0,0 L30,20 M30,20 L60,40" stroke="#C8102E" strokeWidth="4" strokeLinecap="square"/>
          <path d="M60,0 L30,20 M30,20 L0,40" stroke="#C8102E" strokeWidth="4" strokeLinecap="square"/>
          {/* White cross */}
          <rect x="25" width="10" height="40" fill="white"/>
          <rect y="15" width="60" height="10" fill="white"/>
          {/* Red cross */}
          <rect x="27" width="6" height="40" fill="#C8102E"/>
          <rect y="17" width="60" height="6" fill="#C8102E"/>
        </svg>
      )

    default:
      // Generic flag placeholder
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="Flag">
          <rect width="60" height="40" fill="#E5E7EB" stroke="#9CA3AF"/>
          <text x="30" y="25" textAnchor="middle" fontSize="12" fill="#6B7280">?</text>
        </svg>
      )
  }
}
