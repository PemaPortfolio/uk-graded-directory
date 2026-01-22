'use client'

/**
 * Filter Bar Component (Spec 18)
 *
 * Desktop filter bar with dropdowns and checkboxes.
 */

import { SlidersHorizontal } from 'lucide-react'
import type { FilterConfig, FilterState, FilterCounts } from '@/types/filters'
import { FilterDropdown } from './FilterDropdown'
import { FilterCheckboxGroup } from './FilterCheckboxGroup'
import { SortDropdown } from './SortDropdown'

interface FilterBarProps {
  config: FilterConfig
  filters: FilterState
  filterCounts?: FilterCounts
  currentSort: string
  hasFilters: boolean
  onFilterChange: (id: string, value: FilterState[string]) => void
  onSortChange: (value: string) => void
  onClearAll: () => void
  className?: string
}

export function FilterBar({
  config,
  filters,
  filterCounts = {},
  currentSort,
  hasFilters,
  onFilterChange,
  onSortChange,
  onClearAll,
  className = '',
}: FilterBarProps) {
  // Group filters by priority
  const highPriorityFilters = config.filters.filter((f) => f.priority === 'high')
  const mediumPriorityFilters = config.filters.filter((f) => f.priority === 'medium')
  // Low priority filters available for future expansion

  // Show first 4 high priority filters inline
  const inlineFilters = highPriorityFilters.slice(0, 4)
  const dropdownFilters = [
    ...highPriorityFilters.slice(4),
    ...mediumPriorityFilters,
  ]

  const renderFilter = (filter: typeof config.filters[0]) => {
    const value = filters[filter.id]
    const counts = filterCounts[filter.id]

    switch (filter.type) {
      case 'multi-select':
      case 'single-select':
      case 'search-select':
        return (
          <FilterDropdown
            key={filter.id}
            filter={filter}
            value={value as string | string[] | undefined}
            counts={counts}
            onChange={(newValue) => onFilterChange(filter.id, newValue)}
          />
        )

      case 'checkbox-group':
        return (
          <FilterCheckboxGroup
            key={filter.id}
            filter={filter}
            value={value as string[] | undefined}
            counts={counts}
            onChange={(newValue) => onFilterChange(filter.id, newValue)}
            inline={true}
          />
        )

      case 'toggle':
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id, !value)}
            className={`
              flex items-center gap-2
              px-3 py-2
              text-sm font-medium
              border rounded-lg
              transition-colors
              ${value
                ? 'bg-[#e85d4c] border-[#e85d4c] text-white'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-400'
              }
            `}
            aria-pressed={!!value}
          >
            {filter.label}
          </button>
        )

      default:
        return null
    }
  }

  return (
    <div className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="py-4">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Filter by
          </span>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-start gap-3">
          {/* Inline filters (dropdowns) */}
          {inlineFilters.map((filter) => {
            if (filter.type === 'checkbox-group') {
              // For checkbox groups, show as dropdown on desktop
              return (
                <FilterDropdown
                  key={filter.id}
                  filter={{ ...filter, type: 'multi-select' }}
                  value={filters[filter.id] as string | string[] | undefined}
                  counts={filterCounts[filter.id]}
                  onChange={(newValue) => onFilterChange(filter.id, newValue)}
                />
              )
            }
            return renderFilter(filter)
          })}

          {/* Medium priority filters */}
          {dropdownFilters.slice(0, 2).map((filter) => (
            <FilterDropdown
              key={filter.id}
              filter={filter.type === 'checkbox-group' ? { ...filter, type: 'multi-select' } : filter}
              value={filters[filter.id] as string | string[] | undefined}
              counts={filterCounts[filter.id]}
              onChange={(newValue) => onFilterChange(filter.id, newValue)}
            />
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort dropdown */}
          <SortDropdown
            options={config.sortOptions}
            value={currentSort}
            onChange={onSortChange}
          />

          {/* Clear filters button */}
          {hasFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="
                px-3 py-2
                text-sm text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                rounded-lg
                transition-colors
              "
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
