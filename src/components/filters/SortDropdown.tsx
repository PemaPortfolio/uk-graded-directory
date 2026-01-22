'use client'

/**
 * Sort Dropdown Component (Spec 18)
 *
 * Dropdown for selecting sort order.
 */

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { SortOption } from '@/types/filters'

interface SortDropdownProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SortDropdown({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((o) => o.value === value) || options[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
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
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-3 py-2
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          rounded-lg
          text-sm
          hover:border-gray-400 dark:hover:border-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-500 dark:text-gray-400">Sort:</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {selectedOption?.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-1 w-48
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg
            py-1 z-50
          "
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                w-full flex items-center justify-between
                px-3 py-2 text-sm text-left
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${option.value === value
                  ? 'text-[#e85d4c] font-medium'
                  : 'text-gray-700 dark:text-gray-200'
                }
              `}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
              {option.value === value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown
