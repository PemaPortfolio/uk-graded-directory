'use client'

/**
 * Sort Modal Component (Spec 18)
 *
 * Mobile bottom sheet modal for sort selection.
 */

import { useEffect } from 'react'
import { X, Check } from 'lucide-react'
import type { SortOption } from '@/types/filters'

interface SortModalProps {
  options: SortOption[]
  value: string
  isOpen: boolean
  onClose: () => void
  onChange: (value: string) => void
}

export function SortModal({
  options,
  value,
  isOpen,
  onClose,
  onChange,
}: SortModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          bg-white dark:bg-gray-900
          rounded-t-2xl
          shadow-xl
          animate-slide-up
        "
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Sort by
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close sort options"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                w-full flex items-center justify-between
                px-4 py-3.5
                text-left text-base
                transition-colors
                ${option.value === value
                  ? 'text-[#e85d4c] bg-[#e85d4c]/5'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className={option.value === value ? 'font-medium' : ''}>
                {option.label}
              </span>
              {option.value === value && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-8" />
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default SortModal
