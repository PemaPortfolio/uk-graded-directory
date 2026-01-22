'use client'

/**
 * Filter Dropdown Component (Spec 18)
 *
 * Multi-select or single-select dropdown for filter options.
 */

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Search } from 'lucide-react'
import type { FilterDefinition } from '@/types/filters'

interface FilterDropdownProps {
  filter: FilterDefinition
  value: string | string[] | undefined
  counts?: { [value: string]: number }
  onChange: (value: string | string[] | undefined) => void
  disabled?: boolean
  className?: string
}

export function FilterDropdown({
  filter,
  value,
  counts,
  onChange,
  disabled = false,
  className = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const isMulti = filter.type === 'multi-select' || filter.type === 'search-select'
  const hasSearch = filter.type === 'search-select'
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []

  // Filter options by search query
  const filteredOptions = (filter.options || []).filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get display label for button
  const getDisplayLabel = () => {
    if (selectedValues.length === 0) {
      return filter.placeholder || 'All'
    }
    if (selectedValues.length === 1) {
      const option = filter.options?.find((o) => o.value === selectedValues[0])
      return option?.label || selectedValues[0]
    }
    return `${selectedValues.length} selected`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && hasSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, hasSearch])

  const handleSelect = (optionValue: string) => {
    if (isMulti) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue]
      onChange(newValues.length > 0 ? newValues : undefined)
    } else {
      onChange(optionValue === value ? undefined : optionValue)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    onChange(undefined)
    setIsOpen(false)
  }

  const isSelected = (optionValue: string) => selectedValues.includes(optionValue)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between gap-2
          min-w-[140px] px-3 py-2
          bg-white dark:bg-gray-800
          border rounded-lg
          text-sm
          hover:border-gray-400 dark:hover:border-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${selectedValues.length > 0
            ? 'border-[#e85d4c] bg-[#e85d4c]/5'
            : 'border-gray-300 dark:border-gray-600'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex flex-col items-start">
          <span className="text-xs text-gray-500 dark:text-gray-400">{filter.label}</span>
          <span className={`font-medium ${selectedValues.length > 0 ? 'text-[#e85d4c]' : 'text-gray-900 dark:text-gray-100'}`}>
            {getDisplayLabel()}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute left-0 mt-1 w-64
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg
            z-50
          "
          role="listbox"
          aria-multiselectable={isMulti}
        >
          {/* Search input */}
          {hasSearch && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={filter.placeholder || 'Search...'}
                  className="
                    w-full pl-9 pr-3 py-2
                    text-sm
                    border border-gray-300 dark:border-gray-600
                    rounded-md
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-gray-100
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
                  "
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  disabled={option.disabled}
                  className={`
                    w-full flex items-center gap-3
                    px-3 py-2 text-sm text-left
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isSelected(option.value)
                      ? 'text-[#e85d4c] bg-[#e85d4c]/5'
                      : 'text-gray-700 dark:text-gray-200'
                    }
                  `}
                  role="option"
                  aria-selected={isSelected(option.value)}
                >
                  {/* Checkbox/Radio indicator */}
                  <span
                    className={`
                      w-4 h-4 flex items-center justify-center flex-shrink-0
                      border rounded
                      ${isSelected(option.value)
                        ? 'bg-[#e85d4c] border-[#e85d4c]'
                        : 'border-gray-300 dark:border-gray-600'
                      }
                      ${isMulti ? '' : 'rounded-full'}
                    `}
                  >
                    {isSelected(option.value) && <Check className="w-3 h-3 text-white" />}
                  </span>

                  {/* Icon */}
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}

                  {/* Label and count */}
                  <span className="flex-1">
                    {option.label}
                    {filter.showCounts && counts && counts[option.value] !== undefined && (
                      <span className="ml-1 text-gray-400">({counts[option.value]})</span>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Clear button */}
          {selectedValues.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClear}
                className="
                  w-full px-3 py-1.5
                  text-sm text-gray-600 dark:text-gray-400
                  hover:text-[#e85d4c] hover:bg-gray-100 dark:hover:bg-gray-700
                  rounded-md
                  transition-colors
                "
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
