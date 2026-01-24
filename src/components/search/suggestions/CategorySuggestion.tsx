'use client'

import { Package } from 'lucide-react'

interface CategorySuggestionProps {
  name: string
  slug: string
  icon?: string | null
  isHighlighted?: boolean
  onSelect: (slug: string, name: string) => void
}

/**
 * Category suggestion item for autocomplete dropdown
 * Shows icon + category name
 */
export default function CategorySuggestion({
  name,
  slug,
  icon,
  isHighlighted = false,
  onSelect,
}: CategorySuggestionProps) {
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
      {/* Icon */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center text-lg
        ${isHighlighted ? 'bg-[#e85d4c]/20' : 'bg-gray-100'}
      `}>
        {icon || <Package className="w-4 h-4 text-gray-500" />}
      </div>

      {/* Name */}
      <span className="font-medium">{name}</span>
    </button>
  )
}
