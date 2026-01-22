'use client'

/**
 * Results Count Component (Spec 18)
 *
 * Shows "Showing X of Y results" with active filters.
 */

import { ActiveFilters } from './ActiveFilters'

interface ActiveFilterTag {
  filterId: string
  value: string
  label: string
}

interface ResultsCountProps {
  filteredCount: number
  totalCount: number
  entityLabel: string
  activeFilterTags: ActiveFilterTag[]
  onRemoveFilter: (filterId: string, value: string) => void
  onClearAll: () => void
  className?: string
}

export function ResultsCount({
  filteredCount,
  totalCount,
  entityLabel,
  activeFilterTags,
  onRemoveFilter,
  onClearAll,
  className = '',
}: ResultsCountProps) {
  const hasFilters = activeFilterTags.length > 0
  const showing = hasFilters ? filteredCount : totalCount

  return (
    <div
      className={`
        flex flex-wrap items-center gap-x-3 gap-y-2
        py-3 border-b border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      {/* Count text */}
      <span className="text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
        {hasFilters ? (
          <>
            Showing{' '}
            <span className="font-semibold text-[#e85d4c]">{showing}</span>
            {' of '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">{totalCount}</span>
            {' '}{entityLabel}
          </>
        ) : (
          <>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{totalCount}</span>
            {' '}{entityLabel} found
          </>
        )}
      </span>

      {/* Active filter tags */}
      {hasFilters && (
        <ActiveFilters
          tags={activeFilterTags}
          onRemove={onRemoveFilter}
          onClearAll={onClearAll}
        />
      )}
    </div>
  )
}

export default ResultsCount
