'use client'

/**
 * Filter Modal Component (Spec 18)
 *
 * Mobile bottom sheet modal for filters.
 */

import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import type { FilterConfig, FilterState, FilterCounts, RangeValue } from '@/types/filters'
import { FilterCheckboxList } from './FilterCheckboxGroup'
import { FilterDropdown } from './FilterDropdown'

interface FilterModalProps {
  config: FilterConfig
  filters: FilterState
  filterCounts?: FilterCounts
  filteredCount: number
  isOpen: boolean
  onClose: () => void
  onFilterChange: (id: string, value: FilterState[string]) => void
  onClearAll: () => void
  onApply: () => void
}

interface FilterSectionProps {
  title: string
  defaultExpanded?: boolean
  children: React.ReactNode
}

function FilterSection({ title, defaultExpanded = true, children }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          w-full flex items-center justify-between
          px-4 py-3
          text-sm font-medium text-gray-900 dark:text-gray-100
          hover:bg-gray-50 dark:hover:bg-gray-800
        "
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

export function FilterModal({
  config,
  filters,
  filterCounts = {},
  filteredCount,
  isOpen,
  onClose,
  onFilterChange,
  onClearAll,
  onApply,
}: FilterModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleApply = () => {
    onApply()
    onClose()
  }

  const renderFilterContent = (filter: typeof config.filters[0]) => {
    const value = filters[filter.id]
    const counts = filterCounts[filter.id]

    switch (filter.type) {
      case 'checkbox-group':
      case 'multi-select':
        return (
          <FilterCheckboxList
            filter={filter}
            value={value as string[] | undefined}
            counts={counts}
            onChange={(newValue) => onFilterChange(filter.id, newValue)}
          />
        )

      case 'single-select':
      case 'search-select':
        return (
          <FilterDropdown
            filter={filter}
            value={value as string | string[] | undefined}
            counts={counts}
            onChange={(newValue) => onFilterChange(filter.id, newValue)}
            className="w-full"
          />
        )

      case 'toggle':
        return (
          <button
            type="button"
            onClick={() => onFilterChange(filter.id, !value)}
            className={`
              w-full flex items-center justify-between
              px-4 py-3
              text-sm
              border rounded-lg
              transition-colors
              ${value
                ? 'bg-[#e85d4c] border-[#e85d4c] text-white'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
              }
            `}
          >
            <span>{filter.label}</span>
            <span
              className={`
                w-10 h-6 rounded-full relative
                ${value ? 'bg-white/30' : 'bg-gray-200 dark:bg-gray-600'}
              `}
            >
              <span
                className={`
                  absolute top-1 w-4 h-4 rounded-full
                  transition-transform
                  ${value
                    ? 'translate-x-5 bg-white'
                    : 'translate-x-1 bg-gray-400 dark:bg-gray-500'
                  }
                `}
              />
            </span>
          </button>
        )

      case 'range-slider':
        // Simplified range for mobile - use preset options
        const rangeValue = value as RangeValue | undefined
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                {filter.unit}{filter.min} - {filter.unit}{filter.max}
              </span>
              {rangeValue && (
                <span className="font-medium text-[#e85d4c]">
                  {filter.unit}{rangeValue.min} - {filter.unit}{rangeValue.max}
                </span>
              )}
            </div>
            <input
              type="range"
              min={filter.min}
              max={filter.max}
              step={filter.step}
              value={rangeValue?.max || filter.max}
              onChange={(e) => {
                const max = parseInt(e.target.value, 10)
                onFilterChange(filter.id, { min: filter.min || 0, max })
              }}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#e85d4c]"
            />
          </div>
        )

      default:
        return null
    }
  }

  // Group filters by priority
  const highPriorityFilters = config.filters.filter((f) => f.priority === 'high')
  const mediumPriorityFilters = config.filters.filter((f) => f.priority === 'medium')
  const lowPriorityFilters = config.filters.filter((f) => f.priority === 'low')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          max-h-[85vh]
          bg-white dark:bg-gray-900
          rounded-t-2xl
          shadow-xl
          flex flex-col
          animate-slide-up
        "
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* High priority filters */}
          {highPriorityFilters.map((filter) => (
            <FilterSection
              key={filter.id}
              title={filter.label}
              defaultExpanded={true}
            >
              {renderFilterContent(filter)}
            </FilterSection>
          ))}

          {/* Medium priority filters */}
          {mediumPriorityFilters.map((filter) => (
            <FilterSection
              key={filter.id}
              title={filter.label}
              defaultExpanded={false}
            >
              {renderFilterContent(filter)}
            </FilterSection>
          ))}

          {/* Low priority filters */}
          {lowPriorityFilters.map((filter) => (
            <FilterSection
              key={filter.id}
              title={filter.label}
              defaultExpanded={false}
            >
              {renderFilterContent(filter)}
            </FilterSection>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={onClearAll}
            className="
              flex-1 py-3
              text-sm font-medium
              text-gray-700 dark:text-gray-200
              bg-gray-100 dark:bg-gray-800
              rounded-lg
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors
            "
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="
              flex-1 py-3
              text-sm font-medium
              text-white
              bg-[#e85d4c] hover:bg-[#d94f3f]
              rounded-lg
              transition-colors
            "
          >
            Show {filteredCount} results
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default FilterModal
