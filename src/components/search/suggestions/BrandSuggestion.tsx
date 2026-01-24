'use client'

interface BrandSuggestionProps {
  name: string
  slug: string
  isHighlighted?: boolean
  onSelect: (slug: string, name: string) => void
}

/**
 * Brand suggestion item for autocomplete dropdown
 * Shows initial/logo + brand name
 */
export default function BrandSuggestion({
  name,
  slug,
  isHighlighted = false,
  onSelect,
}: BrandSuggestionProps) {
  // Get first letter for initial
  const initial = name.charAt(0).toUpperCase()

  return (
    <button
      type="button"
      onClick={() => onSelect(slug, name)}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 text-left
        transition-colors
        ${isHighlighted
          ? 'bg-[#e85d4c]/10 text-[#181111]'
          : 'hover:bg-gray-50 text-[#181111]'
        }
      `}
      role="option"
      aria-selected={isHighlighted}
    >
      {/* Initial/Logo */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center font-bold
        ${isHighlighted
          ? 'bg-[#e85d4c]/20 text-[#e85d4c]'
          : 'bg-gray-100 text-gray-600'
        }
      `}>
        {initial}
      </div>

      {/* Name */}
      <span className="font-medium">{name}</span>
    </button>
  )
}
