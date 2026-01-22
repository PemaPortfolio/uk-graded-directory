'use client'

/**
 * Quick Filter Chips Component (Spec 18)
 *
 * Horizontal scrolling chips for quick filter access on mobile.
 */

import { Check } from 'lucide-react'
import type { FilterConfig, FilterState } from '@/types/filters'

interface QuickFilterChipsProps {
  config: FilterConfig
  filters: FilterState
  onToggle: (filterId: string, value: string) => void
  className?: string
}

interface QuickFilterChipProps {
  label: string
  icon?: string
  active: boolean
  onClick: () => void
  disabled?: boolean
}

function QuickFilterChip({
  label,
  icon,
  active,
  onClick,
  disabled = false,
}: QuickFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-1.5
        px-3.5 py-2.5
        text-sm font-medium
        whitespace-nowrap
        border rounded-full
        transition-all
        snap-start
        min-h-[44px]
        ${active
          ? 'bg-[#e85d4c] border-[#e85d4c] text-white'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
      `}
      aria-pressed={active}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      {active && <Check className="w-3.5 h-3.5" />}
    </button>
  )
}

export function QuickFilterChips({
  config,
  filters,
  onToggle,
  className = '',
}: QuickFilterChipsProps) {
  // Build quick filter options from config
  const quickFilterOptions = (config.quickFilters || []).map((quickFilterId) => {
    // Handle special quick filter IDs that map to specific filter+value
    if (quickFilterId.includes('_')) {
      const [filterId, value] = quickFilterId.split('_')
      const filter = config.filters.find((f) => f.id === filterId)
      const option = filter?.options?.find((o) => o.value === value || o.value === quickFilterId)

      return {
        id: quickFilterId,
        filterId: filterId,
        value: value || quickFilterId,
        label: option?.label || quickFilterId,
        icon: option?.icon,
      }
    }

    // Find the filter that contains this quick filter
    for (const filter of config.filters) {
      const option = filter.options?.find((o) => o.value === quickFilterId)
      if (option) {
        return {
          id: quickFilterId,
          filterId: filter.id,
          value: option.value,
          label: option.label,
          icon: option.icon,
        }
      }
    }

    // Fallback for toggle filters
    const toggleFilter = config.filters.find((f) => f.id === quickFilterId && f.type === 'toggle')
    if (toggleFilter) {
      return {
        id: quickFilterId,
        filterId: quickFilterId,
        value: 'true',
        label: toggleFilter.label,
        icon: undefined,
      }
    }

    return null
  }).filter(Boolean) as Array<{
    id: string
    filterId: string
    value: string
    label: string
    icon?: string
  }>

  const isActive = (filterId: string, value: string) => {
    const filterValue = filters[filterId]
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value)
    }
    if (typeof filterValue === 'boolean') {
      return filterValue
    }
    return filterValue === value
  }

  if (quickFilterOptions.length === 0) {
    return null
  }

  return (
    <div
      className={`
        flex gap-2
        overflow-x-auto
        px-4 py-3
        -mx-4
        scrollbar-hide
        snap-x snap-mandatory
        ${className}
      `}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}
    >
      {quickFilterOptions.map((option) => (
        <QuickFilterChip
          key={option.id}
          label={option.label}
          icon={option.icon}
          active={isActive(option.filterId, option.value)}
          onClick={() => onToggle(option.filterId, option.value)}
        />
      ))}
    </div>
  )
}

export default QuickFilterChips
