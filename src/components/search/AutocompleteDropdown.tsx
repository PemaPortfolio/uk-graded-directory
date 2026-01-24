'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface AutocompleteDropdownProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  isLoading?: boolean
  className?: string
}

/**
 * Generic autocomplete dropdown container
 *
 * Features:
 * - Absolute positioning below input
 * - Max-height 400px with scroll
 * - Escape key to close
 * - Click outside to close
 * - Loading skeleton state
 */
export default function AutocompleteDropdown({
  isOpen,
  onClose,
  children,
  isLoading = false,
  className = '',
}: AutocompleteDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        // Check if the click is on the input (parent element)
        const target = e.target as HTMLElement
        if (!target.closest('[data-search-input]')) {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className={`
        absolute z-50 top-full left-0 right-0 mt-1
        bg-white border border-[#ebe5e5] rounded-lg shadow-lg
        max-h-[400px] overflow-y-auto
        ${className}
      `}
      role="listbox"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        children
      )}
    </div>
  )
}

/**
 * Loading skeleton for dropdown
 */
function LoadingSkeleton() {
  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-center py-4">
        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2 mt-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Section header for dropdown
 */
interface DropdownSectionProps {
  title: string
  children: ReactNode
}

export function DropdownSection({ title, children }: DropdownSectionProps) {
  return (
    <div className="py-2">
      <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </div>
      {children}
    </div>
  )
}
