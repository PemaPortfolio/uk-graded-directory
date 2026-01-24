'use client'

import { MapPin } from 'lucide-react'

interface PlaceSuggestionProps {
  name: string
  slug: string
  countrySlug: string
  adminArea?: string | null
  isHighlighted?: boolean
  onSelect: (place: { name: string; slug: string; countrySlug: string; adminArea?: string | null }) => void
}

/**
 * Place suggestion item for autocomplete dropdown
 * Shows pin icon + place name + admin area
 */
export default function PlaceSuggestion({
  name,
  slug,
  countrySlug,
  adminArea,
  isHighlighted = false,
  onSelect,
}: PlaceSuggestionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect({ name, slug, countrySlug, adminArea })}
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
      {/* Pin icon */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center
        ${isHighlighted ? 'bg-[#e85d4c]/20 text-[#e85d4c]' : 'bg-gray-100 text-gray-500'}
      `}>
        <MapPin className="w-4 h-4" />
      </div>

      {/* Name and admin area */}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        {adminArea && (
          <div className="text-sm text-gray-500 truncate">{adminArea}</div>
        )}
      </div>
    </button>
  )
}
