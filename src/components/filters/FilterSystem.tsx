'use client'

/**
 * Filter System Component (Spec 18)
 *
 * Main component that integrates all filter components.
 * Handles responsive behavior between desktop and mobile.
 */

import { useState, Suspense } from 'react'
import type { FilterConfig, FilterCounts } from '@/types/filters'
import { useFilters } from '@/lib/filters/useFilters'
import { FilterBar } from './FilterBar'
import { QuickFilterChips } from './QuickFilterChips'
import { MobileFilterTriggers } from './FilterTriggers'
import { FilterModal } from './FilterModal'
import { SortModal } from './SortModal'
import { ResultsCount } from './ResultsCount'

interface FilterSystemProps {
  config: FilterConfig
  totalCount: number
  filteredCount: number
  filterCounts?: FilterCounts
  entityLabel: string
  children: React.ReactNode
  className?: string
}

function FilterSystemContent({
  config,
  totalCount,
  filteredCount,
  filterCounts = {},
  entityLabel,
  children,
  className = '',
}: FilterSystemProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSortModalOpen, setIsSortModalOpen] = useState(false)

  const {
    filters,
    hasFilters,
    activeFilterCount,
    activeFilterTags,
    currentSort,
    setFilter,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    setSort,
  } = useFilters({
    config,
    totalCount,
    filteredCount,
    filterCounts,
  })

  const handleRemoveFilter = (filterId: string, value: string) => {
    const filterValue = filters[filterId]
    if (Array.isArray(filterValue)) {
      const newValue = filterValue.filter((v) => v !== value)
      setFilter(filterId, newValue.length > 0 ? newValue : undefined)
    } else {
      clearFilter(filterId)
    }
  }

  return (
    <div className={className}>
      {/* Desktop Filter Bar - hidden on mobile */}
      <div className="hidden lg:block">
        <FilterBar
          config={config}
          filters={filters}
          filterCounts={filterCounts}
          currentSort={currentSort}
          hasFilters={hasFilters}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Mobile Filters - hidden on desktop */}
      <div className="lg:hidden">
        {/* Quick filter chips */}
        <QuickFilterChips
          config={config}
          filters={filters}
          onToggle={toggleFilter}
        />

        {/* Filter and Sort triggers */}
        <MobileFilterTriggers
          activeFilterCount={activeFilterCount}
          sortOptions={config.sortOptions}
          currentSort={currentSort}
          onFilterClick={() => setIsFilterModalOpen(true)}
          onSortClick={() => setIsSortModalOpen(true)}
        />

        {/* Filter Modal */}
        <FilterModal
          config={config}
          filters={filters}
          filterCounts={filterCounts}
          filteredCount={filteredCount}
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onFilterChange={setFilter}
          onClearAll={clearAllFilters}
          onApply={() => setIsFilterModalOpen(false)}
        />

        {/* Sort Modal */}
        <SortModal
          options={config.sortOptions}
          value={currentSort}
          isOpen={isSortModalOpen}
          onClose={() => setIsSortModalOpen(false)}
          onChange={setSort}
        />
      </div>

      {/* Results count and active filters */}
      <ResultsCount
        filteredCount={filteredCount}
        totalCount={totalCount}
        entityLabel={entityLabel}
        activeFilterTags={activeFilterTags}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={clearAllFilters}
        className="px-4 lg:px-0"
      />

      {/* Results content */}
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function FilterSystem(props: FilterSystemProps) {
  return (
    <Suspense fallback={<FilterSystemSkeleton />}>
      <FilterSystemContent {...props} />
    </Suspense>
  )
}

function FilterSystemSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Desktop skeleton */}
      <div className="hidden lg:block py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1" />
          <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="lg:hidden">
        <div className="flex gap-2 px-4 py-3">
          <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="flex gap-2 px-4 py-2">
          <div className="h-12 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      {/* Results count skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4 mx-4 lg:mx-0" />
    </div>
  )
}

export default FilterSystem
