'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Store, Shield, HelpCircle, Megaphone } from 'lucide-react'

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
}

const menuItems: MenuItem[] = [
  {
    label: 'List Your Store',
    href: '/business/add',
    icon: <Store className="w-5 h-5" />,
    description: 'Add your graded appliance business',
  },
  {
    label: 'Claim Your Business',
    href: '/business/claim',
    icon: <Shield className="w-5 h-5" />,
    description: 'Take ownership of an existing listing',
  },
  {
    label: 'Business FAQ',
    href: '/business/help',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Common questions for businesses',
  },
  {
    label: 'Advertise With Us',
    href: '/advertise',
    icon: <Megaphone className="w-5 h-5" />,
    description: 'Promote your business to more customers',
  },
]

/**
 * Business Menu Dropdown (Spec 03)
 *
 * Dropdown menu for business-related actions:
 * - List Your Store
 * - Claim Your Business
 * - Business FAQ
 * - Advertise With Us
 */
export default function BusinessMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#e85d4c] transition-colors rounded-lg hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        For Business
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[#e85d4c] mt-0.5">{item.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
