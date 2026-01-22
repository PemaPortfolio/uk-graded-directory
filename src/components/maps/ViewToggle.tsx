'use client'

/**
 * View Toggle Component (Spec 20)
 *
 * Toggle between list and map views.
 * Persists preference in localStorage.
 */

import { useState } from 'react'
import { List, Map } from 'lucide-react'

type ViewMode = 'list' | 'map'

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
  className?: string
}

const STORAGE_KEY = 'uk-graded-view-preference'

export function ViewToggle({ value, onChange, className = '' }: ViewToggleProps) {
  return (
    <div
      className={`
        inline-flex
        border border-gray-300 dark:border-gray-600
        rounded-lg
        overflow-hidden
        ${className}
      `}
      role="tablist"
      aria-label="View mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === 'list'}
        onClick={() => onChange('list')}
        className={`
          flex items-center gap-2
          px-4 py-2
          text-sm font-medium
          transition-colors
          min-h-[44px]
          ${value === 'list'
            ? 'bg-[#e85d4c]/10 text-[#e85d4c] border-b-2 border-[#e85d4c]'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }
        `}
      >
        <List className="w-4 h-4" />
        <span>List</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={value === 'map'}
        onClick={() => onChange('map')}
        className={`
          flex items-center gap-2
          px-4 py-2
          text-sm font-medium
          transition-colors
          min-h-[44px]
          ${value === 'map'
            ? 'bg-[#e85d4c]/10 text-[#e85d4c] border-b-2 border-[#e85d4c]'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }
        `}
      >
        <Map className="w-4 h-4" />
        <span>Map</span>
      </button>
    </div>
  )
}

/**
 * Hook for managing view preference with localStorage persistence
 *
 * Note: Due to SSR, the initial render will always use defaultView.
 * After hydration, it will sync with localStorage if a preference exists.
 */
export function useViewPreference(defaultView: ViewMode = 'list'): [ViewMode, (view: ViewMode) => void] {
  // Use lazy initialization to read from localStorage on client
  const [view, setView] = useState<ViewMode>(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'list' || stored === 'map') {
        return stored
      }
    }
    return defaultView
  })

  // Save preference to localStorage
  const handleChange = (newView: ViewMode) => {
    setView(newView)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newView)
    }
  }

  return [view, handleChange]
}

export default ViewToggle
