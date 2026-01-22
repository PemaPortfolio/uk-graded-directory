'use client'

/**
 * Filter Trigger Buttons Component (Spec 18)
 *
 * Mobile filter and sort trigger buttons.
 */

import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import type { SortOption } from '@/types/filters'

interface FilterTriggerProps {
  activeCount: number
  onClick: () => void
  className?: string
}

interface SortTriggerProps {
  options: SortOption[]
  value: string
  onClick: () => void
  className?: string
}

export function FilterTrigger({
  activeCount,
  onClick,
  className = '',
}: FilterTriggerProps) {
  const hasFilters = activeCount > 0

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 flex items-center justify-center gap-2
        h-12
        bg-white dark:bg-gray-800
        border rounded-lg
        text-sm font-medium
        text-gray-700 dark:text-gray-200
        transition-colors
        ${hasFilters
          ? 'border-[#e85d4c] border-2 bg-[#e85d4c]/5'
          : 'border-gray-300 dark:border-gray-600'
        }
        ${className}
      `}
    >
      <SlidersHorizontal className="w-4 h-4" />
      <span>Filters</span>
      {hasFilters && (
        <span className="min-w-[20px] h-5 px-1.5 bg-[#e85d4c] text-white text-xs font-semibold rounded-full flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </button>
  )
}

export function SortTrigger({
  options,
  value,
  onClick,
  className = '',
}: SortTriggerProps) {
  const selectedOption = options.find((o) => o.value === value) || options[0]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 flex items-center justify-center gap-2
        h-12
        bg-white dark:bg-gray-800
        border border-gray-300 dark:border-gray-600
        rounded-lg
        text-sm
        text-gray-700 dark:text-gray-200
        ${className}
      `}
    >
      <span className="text-gray-500">Sort:</span>
      <span className="font-medium text-[#e85d4c]">{selectedOption?.label}</span>
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </button>
  )
}

interface MobileFilterTriggersProps {
  activeFilterCount: number
  sortOptions: SortOption[]
  currentSort: string
  onFilterClick: () => void
  onSortClick: () => void
  className?: string
}

export function MobileFilterTriggers({
  activeFilterCount,
  sortOptions,
  currentSort,
  onFilterClick,
  onSortClick,
  className = '',
}: MobileFilterTriggersProps) {
  return (
    <div className={`flex gap-2 px-4 py-2 ${className}`}>
      <FilterTrigger activeCount={activeFilterCount} onClick={onFilterClick} />
      <SortTrigger options={sortOptions} value={currentSort} onClick={onSortClick} />
    </div>
  )
}

export default MobileFilterTriggers
