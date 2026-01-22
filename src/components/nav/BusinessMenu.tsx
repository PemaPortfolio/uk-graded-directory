'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Store, LayoutDashboard, HelpCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
  requiresAuth?: boolean
}

const menuItems: MenuItem[] = [
  {
    label: 'Add or Claim Your Business',
    href: '/business/add',
    icon: <Store className="w-5 h-5" />,
    description: 'List your store or claim an existing listing',
  },
  {
    label: 'Business Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    description: 'Manage your listing',
    requiresAuth: true,
  },
  {
    label: 'Help for Businesses',
    href: '/business/help',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'How listings work, FAQs',
  },
]

/**
 * Business Menu Dropdown (Spec 03)
 *
 * Dropdown menu for business-related actions:
 * - Add or Claim Your Business
 * - Business Dashboard
 * - Help for Businesses
 */
export default function BusinessMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#e85d4c] hover:underline transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        For Business
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {menuItems.map((item, index) => {
            const href = item.requiresAuth && !user
              ? `/login?redirect=${encodeURIComponent(item.href)}`
              : item.href

            return (
              <div key={item.href}>
                <Link
                  href={href}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-[#e85d4c] mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </Link>
                {index < menuItems.length - 1 && (
                  <div className="mx-4 my-2 border-t border-gray-100 dark:border-gray-700" />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
