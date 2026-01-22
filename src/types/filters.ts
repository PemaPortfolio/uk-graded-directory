/**
 * Filter & Sort System Types (Spec 18)
 *
 * Type definitions for the unified filter/sort UI system.
 */

/**
 * Base filter option type
 */
export interface FilterOption {
  value: string
  label: string
  count?: number
  disabled?: boolean
  icon?: string
  description?: string
}

/**
 * Filter types supported by the system
 */
export type FilterType =
  | 'multi-select'
  | 'single-select'
  | 'checkbox-group'
  | 'range-slider'
  | 'toggle'
  | 'search-select'

/**
 * Complete filter definition
 */
export interface FilterDefinition {
  id: string
  label: string
  type: FilterType
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
  unit?: string
  defaultValue?: string | string[] | number[]
  placeholder?: string
  showCounts?: boolean
  collapsible?: boolean
  priority?: 'high' | 'medium' | 'low'
  mobileQuickFilter?: boolean
  dbField?: string
  dbOperator?: 'eq' | 'gte' | 'lte' | 'contains' | 'overlaps'
  dbJoinTable?: string
}

/**
 * Sort option definition
 */
export interface SortOption {
  value: string
  label: string
  field: string
  direction: 'asc' | 'desc'
  nullsFirst?: boolean
}

/**
 * Complete filter configuration for a page type
 */
export interface FilterConfig {
  pageType: 'retail_category' | 'repair_category' | 'brand_repair' | 'city_hub'
  entityType: 'store' | 'provider'
  filters: FilterDefinition[]
  sortOptions: SortOption[]
  defaultSort: string
  quickFilters?: string[]
}

/**
 * Range value type
 */
export interface RangeValue {
  min: number
  max: number
}

/**
 * Filter state - stores current filter values
 */
export interface FilterState {
  [key: string]: string | string[] | boolean | RangeValue | number | undefined
  _sort?: string
  _page?: number
}

/**
 * Filter counts - number of items matching each filter option
 */
export interface FilterCounts {
  [filterId: string]: {
    [optionValue: string]: number
  }
}

/**
 * Filter context type for provider
 */
export interface FilterContextType {
  filters: FilterState
  filterCounts: FilterCounts
  config: FilterConfig
  totalCount: number
  filteredCount: number
  isLoading: boolean
  setFilter: (id: string, value: FilterState[string]) => void
  clearFilter: (id: string) => void
  clearAllFilters: () => void
  setSort: (value: string) => void
  setPage: (page: number) => void
}

/**
 * Props for filter components
 */
export interface FilterDropdownProps {
  filter: FilterDefinition
  value: string | string[] | undefined
  counts?: { [value: string]: number }
  onChange: (value: string | string[]) => void
  disabled?: boolean
}

export interface FilterCheckboxGroupProps {
  filter: FilterDefinition
  value: string[] | undefined
  counts?: { [value: string]: number }
  onChange: (value: string[]) => void
  disabled?: boolean
}

export interface FilterRangeSliderProps {
  filter: FilterDefinition
  value: RangeValue | undefined
  onChange: (value: RangeValue) => void
  disabled?: boolean
}

export interface SortDropdownProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export interface QuickFilterChipProps {
  label: string
  icon?: string
  active: boolean
  onClick: () => void
  disabled?: boolean
}

export interface ActiveFilterTagProps {
  label: string
  value: string
  onRemove: () => void
}

export interface FilterBarProps {
  config: FilterConfig
  className?: string
}

export interface FilterModalProps {
  config: FilterConfig
  isOpen: boolean
  onClose: () => void
}
