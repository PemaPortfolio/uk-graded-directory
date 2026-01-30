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
      // Ulster Banner - Red cross on white with six-pointed star, Red Hand, and Crown
      return (
        <svg className={className} viewBox="0 0 60 40" aria-label="Northern Ireland flag">
          {/* White background */}
          <rect width="60" height="40" fill="white"/>
          {/* Red St George's Cross */}
          <rect x="26" width="8" height="40" fill="#C8102E"/>
          <rect y="16" width="60" height="8" fill="#C8102E"/>
          {/* Six-pointed Star (white with gold/yellow border) */}
          <g transform="translate(30, 22)">
            {/* Star background - creates the six-pointed star shape */}
            <polygon
              points="0,-10 2.5,-4 8.7,-5 5,0 8.7,5 2.5,4 0,10 -2.5,4 -8.7,5 -5,0 -8.7,-5 -2.5,-4"
              fill="white"
              stroke="#FFD700"
              strokeWidth="0.8"
            />
            {/* Red Hand of Ulster */}
            <g transform="translate(0, 0) scale(0.4)">
              <path
                d="M0,-12 L-3,-12 L-3,-4 Q-4,-4 -5,-5 L-5,-12 L-8,-12 L-8,-4 Q-9,-4 -10,-5 L-10,-10 L-12,-10 L-12,-2 Q-12,4 -6,8 L-6,12 L6,12 L6,8 Q12,4 12,-2 L12,-10 L10,-10 L10,-5 Q9,-4 8,-4 L8,-12 L5,-12 L5,-5 Q4,-4 3,-4 L3,-12 Z"
                fill="#C8102E"
              />
            </g>
          </g>
          {/* Crown (St Edward's Crown - simplified) */}
          <g transform="translate(30, 8)">
            {/* Crown base band */}
            <rect x="-6" y="2" width="12" height="2.5" fill="#FFD700"/>
            {/* Crown arches */}
            <path
              d="M-6,2 Q-6,-2 -3,-1 Q0,-4 3,-1 Q6,-2 6,2"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
            />
            {/* Crown orb on top */}
            <circle cx="0" cy="-3" r="1.5" fill="#FFD700"/>
            <line x1="0" y1="-4.5" x2="0" y2="-2" stroke="#FFD700" strokeWidth="0.8"/>
            <line x1="-1" y1="-3" x2="1" y2="-3" stroke="#FFD700" strokeWidth="0.8"/>
            {/* Jewels */}
            <circle cx="-3" cy="0" r="0.8" fill="#C8102E"/>
            <circle cx="3" cy="0" r="0.8" fill="#0065BD"/>
            <circle cx="0" cy="-1" r="0.8" fill="#C8102E"/>
          </g>
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
