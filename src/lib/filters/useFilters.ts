'use client'

/**
 * Filter Hook (Spec 18)
 *
 * Custom hook for managing filter state with URL synchronization.
 */

import { useCallback, useMemo, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { FilterState, FilterConfig, FilterCounts, RangeValue } from '@/types/filters'
import {
  parseFiltersFromURL,
  buildSearchParams,
  hasActiveFilters,
  getActiveFilterCount,
  getActiveFilterTags,
} from './urlUtils'

const DEBOUNCE_MS = 300

interface UseFiltersOptions {
  config: FilterConfig
  totalCount?: number
  filteredCount?: number
  filterCounts?: FilterCounts
}

interface UseFiltersReturn {
  filters: FilterState
  filterCounts: FilterCounts
  totalCount: number
  filteredCount: number
  hasFilters: boolean
  activeFilterCount: number
  activeFilterTags: Array<{ filterId: string; value: string; label: string }>
  currentSort: string
  currentPage: number
  setFilter: (id: string, value: FilterState[string]) => void
  toggleFilter: (id: string, value: string) => void
  clearFilter: (id: string) => void
  clearAllFilters: () => void
  setSort: (value: string) => void
  setPage: (page: number) => void
}

export function useFilters({
  config,
  totalCount = 0,
  filteredCount = 0,
  filterCounts = {},
}: UseFiltersOptions): UseFiltersReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Parse current filters from URL
  const filters = useMemo(() => {
    return parseFiltersFromURL(searchParams, config)
  }, [searchParams, config])

  // Derived state
  const hasFilters = useMemo(() => hasActiveFilters(filters), [filters])
  const activeFilterCount = useMemo(() => getActiveFilterCount(filters), [filters])
  const activeFilterTags = useMemo(
    () => getActiveFilterTags(filters, config),
    [filters, config]
  )
  const currentSort = (filters._sort as string) || config.defaultSort
  const currentPage = (filters._page as number) || 1

  // Update URL with debounce
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        const params = buildSearchParams(newFilters, config)
        const queryString = params.toString()
        const newURL = queryString ? `${pathname}?${queryString}` : pathname
        router.push(newURL, { scroll: false })
      }, DEBOUNCE_MS)
    },
    [pathname, router, config]
  )

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  // Set a filter value
  const setFilter = useCallback(
    (id: string, value: FilterState[string]) => {
      const newFilters = { ...filters, [id]: value, _page: 1 } // Reset to page 1
      updateURL(newFilters)
    },
    [filters, updateURL]
  )

  // Toggle a value in a multi-select filter
  const toggleFilter = useCallback(
    (id: string, value: string) => {
      const currentValue = filters[id]
      let newValue: string[]

      if (Array.isArray(currentValue)) {
        if (currentValue.includes(value)) {
          newValue = currentValue.filter((v) => v !== value)
        } else {
          newValue = [...currentValue, value]
        }
      } else {
        newValue = [value]
      }

      setFilter(id, newValue.length > 0 ? newValue : undefined)
    },
    [filters, setFilter]
  )

  // Clear a specific filter
  const clearFilter = useCallback(
    (id: string) => {
      const newFilters = { ...filters }
      delete newFilters[id]
      newFilters._page = 1
      updateURL(newFilters)
    },
    [filters, updateURL]
  )

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const newFilters: FilterState = {}
    // Keep sort if it's not default
    if (filters._sort && filters._sort !== config.defaultSort) {
      newFilters._sort = filters._sort
    }
    updateURL(newFilters)
  }, [filters, config.defaultSort, updateURL])

  // Set sort
  const setSort = useCallback(
    (value: string) => {
      const newFilters = { ...filters, _sort: value, _page: 1 }
      updateURL(newFilters)
    },
    [filters, updateURL]
  )

  // Set page
  const setPage = useCallback(
    (page: number) => {
      const newFilters = { ...filters, _page: page }
      // Immediate update for pagination (no debounce)
      const params = buildSearchParams(newFilters, config)
      const queryString = params.toString()
      const newURL = queryString ? `${pathname}?${queryString}` : pathname
      router.push(newURL, { scroll: false })
    },
    [filters, config, pathname, router]
  )

  return {
    filters,
    filterCounts,
    totalCount,
    filteredCount,
    hasFilters,
    activeFilterCount,
    activeFilterTags,
    currentSort,
    currentPage,
    setFilter,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    setSort,
    setPage,
  }
}

/**
 * Helper to check if a value is selected in a filter
 */
export function isFilterValueSelected(
  filters: FilterState,
  filterId: string,
  value: string
): boolean {
  const filterValue = filters[filterId]
  if (Array.isArray(filterValue)) {
    return filterValue.includes(value)
  }
  return filterValue === value
}

/**
 * Helper to check if a range filter is set
 */
export function isRangeFilterSet(
  filters: FilterState,
  filterId: string
): boolean {
  const value = filters[filterId]
  return typeof value === 'object' && value !== null && 'min' in value
}

/**
 * Helper to get range filter value
 */
export function getRangeFilterValue(
  filters: FilterState,
  filterId: string,
  defaultMin: number,
  defaultMax: number
): RangeValue {
  const value = filters[filterId]
  if (typeof value === 'object' && value !== null && 'min' in value) {
    return value as RangeValue
  }
  return { min: defaultMin, max: defaultMax }
}
