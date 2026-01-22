'use client'

/**
 * Active Filters Component (Spec 18)
 *
 * Displays active filter tags with remove buttons.
 */

import { X } from 'lucide-react'

interface ActiveFilterTag {
  filterId: string
  value: string
  label: string
}

interface ActiveFiltersProps {
  tags: ActiveFilterTag[]
  onRemove: (filterId: string, value: string) => void
  onClearAll: () => void
  className?: string
}

export function ActiveFilters({
  tags,
  onRemove,
  onClearAll,
  className = '',
}: ActiveFiltersProps) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={`${tag.filterId}-${tag.value}`}
          className="
            inline-flex items-center gap-1.5
            px-2.5 py-1
            bg-blue-50 dark:bg-blue-900/20
            border border-blue-200 dark:border-blue-800
            rounded-full
            text-sm text-blue-800 dark:text-blue-200
          "
        >
          <span>{tag.label}</span>
          <button
            type="button"
            onClick={() => onRemove(tag.filterId, tag.value)}
            className="
              w-4 h-4 flex items-center justify-center
              rounded-full
              hover:bg-blue-100 dark:hover:bg-blue-800
              transition-colors
            "
            aria-label={`Remove ${tag.label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {tags.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="
            px-3 py-1
            text-sm text-red-600 dark:text-red-400
            border border-red-300 dark:border-red-700
            rounded-full
            hover:bg-red-50 dark:hover:bg-red-900/20
            transition-colors
          "
        >
          Clear all
        </button>
      )}
    </div>
  )
}

export default ActiveFilters
