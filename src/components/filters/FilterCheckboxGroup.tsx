'use client'

/**
 * Filter Checkbox Group Component (Spec 18)
 *
 * Inline checkboxes for filter options.
 */

import { Check } from 'lucide-react'
import type { FilterDefinition } from '@/types/filters'

interface FilterCheckboxGroupProps {
  filter: FilterDefinition
  value: string[] | undefined
  counts?: { [value: string]: number }
  onChange: (value: string[] | undefined) => void
  disabled?: boolean
  className?: string
  inline?: boolean
}

export function FilterCheckboxGroup({
  filter,
  value = [],
  counts,
  onChange,
  disabled = false,
  className = '',
  inline = true,
}: FilterCheckboxGroupProps) {
  const selectedValues = value || []

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]
    onChange(newValues.length > 0 ? newValues : undefined)
  }

  const isSelected = (optionValue: string) => selectedValues.includes(optionValue)

  return (
    <div className={className}>
      {/* Label */}
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
        {filter.label}
      </span>

      {/* Options */}
      <div className={`flex ${inline ? 'flex-wrap gap-2' : 'flex-col gap-1'}`}>
        {(filter.options || []).map((option) => {
          const selected = isSelected(option.value)
          const count = counts?.[option.value]
          const isDisabled = disabled || option.disabled || (count === 0 && filter.showCounts)

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !isDisabled && handleToggle(option.value)}
              disabled={isDisabled}
              className={`
                flex items-center gap-2
                px-3 py-2
                text-sm
                border rounded-lg
                transition-colors
                ${selected
                  ? 'bg-[#e85d4c] border-[#e85d4c] text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              title={option.description}
              aria-pressed={selected}
            >
              {/* Checkbox indicator */}
              <span
                className={`
                  w-4 h-4 flex items-center justify-center flex-shrink-0
                  border rounded
                  ${selected
                    ? 'bg-white border-white'
                    : 'border-gray-400 dark:border-gray-500'
                  }
                `}
              >
                {selected && <Check className="w-3 h-3 text-[#e85d4c]" />}
              </span>

              {/* Icon */}
              {option.icon && <span className="flex-shrink-0">{option.icon}</span>}

              {/* Label */}
              <span>{option.label}</span>

              {/* Count */}
              {filter.showCounts && count !== undefined && (
                <span className={`text-xs ${selected ? 'text-white/80' : 'text-gray-400'}`}>
                  ({count})
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Compact version for mobile filter sections
 */
export function FilterCheckboxList({
  filter,
  value = [],
  counts,
  onChange,
  disabled = false,
  className = '',
}: FilterCheckboxGroupProps) {
  const selectedValues = value || []

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]
    onChange(newValues.length > 0 ? newValues : undefined)
  }

  const isSelected = (optionValue: string) => selectedValues.includes(optionValue)

  return (
    <div className={`space-y-1 ${className}`}>
      {(filter.options || []).map((option) => {
        const selected = isSelected(option.value)
        const count = counts?.[option.value]
        const isDisabled = disabled || option.disabled || (count === 0 && filter.showCounts)

        return (
          <label
            key={option.value}
            className={`
              flex items-center gap-3
              px-3 py-2.5
              text-sm
              rounded-lg
              cursor-pointer
              transition-colors
              ${selected
                ? 'bg-[#e85d4c]/10 text-[#e85d4c]'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="checkbox"
              checked={selected}
              onChange={() => !isDisabled && handleToggle(option.value)}
              disabled={isDisabled}
              className="sr-only"
            />

            {/* Checkbox indicator */}
            <span
              className={`
                w-5 h-5 flex items-center justify-center flex-shrink-0
                border-2 rounded
                ${selected
                  ? 'bg-[#e85d4c] border-[#e85d4c]'
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}
            >
              {selected && <Check className="w-3.5 h-3.5 text-white" />}
            </span>

            {/* Icon */}
            {option.icon && <span className="flex-shrink-0 text-base">{option.icon}</span>}

            {/* Label */}
            <span className="flex-1">{option.label}</span>

            {/* Count */}
            {filter.showCounts && count !== undefined && (
              <span className="text-xs text-gray-400">({count})</span>
            )}
          </label>
        )
      })}
    </div>
  )
}

export default FilterCheckboxGroup
