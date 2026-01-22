/**
 * URL State Management Utilities (Spec 18)
 *
 * Functions for parsing and building filter URLs.
 */

import type { FilterState, FilterConfig, RangeValue } from '@/types/filters'

/**
 * Parse URL search params into filter state
 */
export function parseFiltersFromURL(
  searchParams: URLSearchParams,
  config: FilterConfig
): FilterState {
  const filters: FilterState = {}

  config.filters.forEach((filter) => {
    const value = searchParams.get(filter.id)

    if (!value) return

    switch (filter.type) {
      case 'multi-select':
      case 'checkbox-group':
      case 'search-select':
        filters[filter.id] = value.split(',').filter(Boolean)
        break

      case 'range-slider':
        const [min, max] = value.split('_').map(Number)
        if (!isNaN(min) && !isNaN(max)) {
          filters[filter.id] = { min, max }
        }
        break

      case 'toggle':
        filters[filter.id] = value === '1' || value === 'true'
        break

      default:
        filters[filter.id] = value
    }
  })

  // Parse sort
  const sort = searchParams.get('sort')
  if (sort && config.sortOptions.find((s) => s.value === sort)) {
    filters._sort = sort
  }

  // Parse page
  const page = searchParams.get('page')
  if (page) {
    const pageNum = parseInt(page, 10)
    if (!isNaN(pageNum) && pageNum > 0) {
      filters._page = pageNum
    }
  }

  return filters
}

/**
 * Build URL search params from filter state
 */
export function buildFilterURL(
  baseURL: string,
  filters: FilterState,
  config: FilterConfig
): string {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (key.startsWith('_')) {
      // Handle special keys
      if (key === '_sort' && value !== config.defaultSort) {
        params.set('sort', value as string)
      }
      if (key === '_page' && (value as number) > 1) {
        params.set('page', String(value))
      }
      return
    }

    if (value === null || value === undefined) return
    if (Array.isArray(value) && value.length === 0) return

    const filter = config.filters.find((f) => f.id === key)
    if (!filter) return

    switch (filter.type) {
      case 'multi-select':
      case 'checkbox-group':
      case 'search-select':
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','))
        }
        break

      case 'range-slider':
        if (typeof value === 'object' && 'min' in value) {
          const rangeVal = value as RangeValue
          params.set(key, `${rangeVal.min}_${rangeVal.max}`)
        }
        break

      case 'toggle':
        if (value === true) {
          params.set(key, '1')
        }
        break

      default:
        if (value) {
          params.set(key, String(value))
        }
    }
  })

  const queryString = params.toString()
  return queryString ? `${baseURL}?${queryString}` : baseURL
}

/**
 * Build URLSearchParams from filter state (for router.push)
 */
export function buildSearchParams(
  filters: FilterState,
  config: FilterConfig
): URLSearchParams {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (key.startsWith('_')) {
      if (key === '_sort' && value !== config.defaultSort) {
        params.set('sort', value as string)
      }
      if (key === '_page' && (value as number) > 1) {
        params.set('page', String(value))
      }
      return
    }

    if (value === null || value === undefined) return
    if (Array.isArray(value) && value.length === 0) return

    const filter = config.filters.find((f) => f.id === key)
    if (!filter) return

    switch (filter.type) {
      case 'multi-select':
      case 'checkbox-group':
      case 'search-select':
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','))
        }
        break

      case 'range-slider':
        if (typeof value === 'object' && 'min' in value) {
          const rangeVal = value as RangeValue
          params.set(key, `${rangeVal.min}_${rangeVal.max}`)
        }
        break

      case 'toggle':
        if (value === true) {
          params.set(key, '1')
        }
        break

      default:
        if (value) {
          params.set(key, String(value))
        }
    }
  })

  return params
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return Object.entries(filters).some(([key, value]) => {
    if (key.startsWith('_')) return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value !== null) return true
    return Boolean(value)
  })
}

/**
 * Get count of active filters
 */
export function getActiveFilterCount(filters: FilterState): number {
  return Object.entries(filters).reduce((count, [key, value]) => {
    if (key.startsWith('_')) return count
    if (Array.isArray(value)) return count + value.length
    if (typeof value === 'object' && value !== null) return count + 1
    if (value) return count + 1
    return count
  }, 0)
}

/**
 * Get active filter values as label-value pairs for display
 */
export function getActiveFilterTags(
  filters: FilterState,
  config: FilterConfig
): Array<{ filterId: string; value: string; label: string }> {
  const tags: Array<{ filterId: string; value: string; label: string }> = []

  Object.entries(filters).forEach(([key, value]) => {
    if (key.startsWith('_')) return

    const filter = config.filters.find((f) => f.id === key)
    if (!filter) return

    if (Array.isArray(value)) {
      value.forEach((v) => {
        const option = filter.options?.find((o) => o.value === v)
        tags.push({
          filterId: key,
          value: v,
          label: option?.label || v,
        })
      })
    } else if (typeof value === 'object' && value !== null && 'min' in value) {
      const rangeVal = value as RangeValue
      tags.push({
        filterId: key,
        value: `${rangeVal.min}_${rangeVal.max}`,
        label: `${filter.unit || ''}${rangeVal.min} - ${filter.unit || ''}${rangeVal.max}`,
      })
    } else if (typeof value === 'boolean' && value) {
      tags.push({
        filterId: key,
        value: 'true',
        label: filter.label,
      })
    } else if (value) {
      const option = filter.options?.find((o) => o.value === value)
      tags.push({
        filterId: key,
        value: String(value),
        label: option?.label || String(value),
      })
    }
  })

  return tags
}
