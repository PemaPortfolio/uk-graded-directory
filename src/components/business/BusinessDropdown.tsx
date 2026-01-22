'use client'

/**
 * Business Dropdown Component (Spec 03)
 *
 * Header dropdown for business-related actions.
 * Links to add/claim, dashboard, and help pages.
 */

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Store, LayoutDashboard, HelpCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

interface BusinessDropdownProps {
  className?: string
}

export function BusinessDropdown({ className = '' }: BusinessDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1
          text-sm font-medium
          text-[#e85d4c]
          hover:underline
          transition-colors
        "
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>For Business</span>
        <ChevronDown
          className={`
            w-3 h-3
            transition-transform duration-150
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-2
            w-[280px]
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg
            shadow-lg
            z-50
            py-2
          "
          role="menu"
          aria-orientation="vertical"
        >
          {/* Add or Claim */}
          <Link
            href="/business/add"
            className="
              flex items-start gap-3
              px-4 py-3
              hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors
            "
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <Store className="w-5 h-5 text-[#e85d4c] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Add or Claim Your Business
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                List your store or claim an existing listing
              </div>
            </div>
          </Link>

          <div className="my-2 border-t border-gray-100 dark:border-gray-700" />

          {/* Business Dashboard */}
          <Link
            href={user ? '/dashboard' : '/login?redirect=/dashboard'}
            className="
              flex items-start gap-3
              px-4 py-3
              hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors
            "
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5 text-[#e85d4c] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Business Dashboard
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Manage your listing
              </div>
            </div>
          </Link>

          <div className="my-2 border-t border-gray-100 dark:border-gray-700" />

          {/* Help */}
          <Link
            href="/business/help"
            className="
              flex items-start gap-3
              px-4 py-3
              hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors
            "
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <HelpCircle className="w-5 h-5 text-[#e85d4c] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Help for Businesses
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                How listings work, FAQs
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default BusinessDropdown
