'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Store, Wrench, BookOpen, Briefcase, LogIn, LogOut, LayoutDashboard, User } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

interface AccordionSection {
  id: string
  label: string
  icon: React.ReactNode
  items: { label: string; href: string }[]
  footerLinks?: { label: string; href: string }[]
}

const sections: AccordionSection[] = [
  {
    id: 'stores',
    label: 'Stores',
    icon: <Store className="w-5 h-5" />,
    items: [
      { label: 'Washing Machines', href: '/washing-machines' },
      { label: 'Fridge Freezers', href: '/fridge-freezers' },
      { label: 'Cookers', href: '/cookers' },
      { label: 'Dishwashers', href: '/dishwashers' },
      { label: 'Tumble Dryers', href: '/tumble-dryers' },
    ],
    footerLinks: [
      { label: 'View All Categories', href: '/categories' },
      { label: 'Browse by Location', href: '/locations' },
    ],
  },
  {
    id: 'repairs',
    label: 'Repairs',
    icon: <Wrench className="w-5 h-5" />,
    items: [
      { label: 'Washing Machine Repair', href: '/washing-machine-repair' },
      { label: 'Fridge Freezer Repair', href: '/fridge-freezer-repair' },
      { label: 'Cooker Repair', href: '/cooker-repair' },
      { label: 'Dishwasher Repair', href: '/dishwasher-repair' },
      { label: 'Tumble Dryer Repair', href: '/tumble-dryer-repair' },
    ],
    footerLinks: [
      { label: 'Find Local Engineers', href: '/locations' },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      { label: 'What Are Graded Appliances?', href: '/guides/what-are-graded-appliances/' },
      { label: 'A-Grade vs B-Grade', href: '/guides/a-grade-vs-b-grade/' },
      { label: 'How to Spot a Good Deal', href: '/guides/how-to-spot-a-good-deal/' },
    ],
    footerLinks: [
      { label: 'View All Guides', href: '/guides/' },
    ],
  },
  {
    id: 'business',
    label: 'For Business',
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      { label: 'Add or Claim Your Business', href: '/business/add' },
      { label: 'Business Dashboard', href: '/dashboard' },
      { label: 'Help for Businesses', href: '/business/help' },
    ],
  },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Mobile Menu Overlay (Spec 23)
 *
 * Full-screen overlay with slide-in animation.
 * Features accordion sections for Stores, Repairs, Guides, Business.
 * Auth-aware footer (Login/Signup or Dashboard/Logout).
 * Closes on escape, click outside, or navigation.
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { user, signOut } = useAuth()

  // Prevent body scroll when menu is open
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

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleLinkClick = () => {
    onClose()
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[99] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white dark:bg-gray-900 z-[100] md:hidden animate-slide-in-right shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Menu
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Accordion Sections */}
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
                aria-expanded={expandedSection === section.id}
              >
                <span className="flex items-center gap-3 text-gray-900 dark:text-gray-100 font-medium">
                  <span className="text-[#e85d4c]">{section.icon}</span>
                  {section.label}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === section.id && (
                <div className="pb-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 pl-12 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {section.footerLinks && (
                    <div className="mt-2 pt-2 mx-4 border-t border-gray-100 dark:border-gray-800">
                      {section.footerLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 pl-8 text-sm font-medium text-[#e85d4c]"
                          onClick={handleLinkClick}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Auth Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-2 py-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="w-5 h-5" />
                <span className="truncate">{user.email}</span>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                onClick={handleLinkClick}
              >
                <LayoutDashboard className="w-5 h-5 text-[#e85d4c]" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#e85d4c] text-white font-medium rounded-lg hover:bg-[#d94f3f] transition-colors"
                onClick={handleLinkClick}
              >
                <LogIn className="w-5 h-5" />
                Login / Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
