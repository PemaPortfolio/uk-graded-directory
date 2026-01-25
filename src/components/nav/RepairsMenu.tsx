'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Wrench, MapPin } from 'lucide-react'

interface RepairItem {
  label: string
  slug: string
}

// Repair service pages (redirect to /locations if no providers yet)
const repairServices: RepairItem[] = [
  { label: 'Washing Machine Repair', slug: 'washing-machine-repair' },
  { label: 'Fridge Freezer Repair', slug: 'fridge-freezer-repair' },
  { label: 'Cooker Repair', slug: 'cooker-repair' },
  { label: 'Dishwasher Repair', slug: 'dishwasher-repair' },
  { label: 'Tumble Dryer Repair', slug: 'tumble-dryer-repair' },
]

/**
 * Repairs Dropdown Menu (Spec 23)
 *
 * Dropdown menu for finding repair services:
 * - Repair services by appliance type
 * - Certifications
 * - Footer links to find local engineers
 */
export default function RepairsMenu() {
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
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#e85d4c] transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Repairs
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Repair Services */}
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Repair Services
            </div>
            <div className="space-y-1">
              {repairServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {service.label}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <Link
                href="/locations/"
                className="flex items-center gap-2 text-sm font-medium text-[#e85d4c] hover:underline"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                Find Local Engineers
              </Link>
              <Link
                href="/search/?type=repair"
                className="flex items-center gap-2 text-sm font-medium text-[#e85d4c] hover:underline"
                onClick={() => setIsOpen(false)}
              >
                <Wrench className="w-4 h-4" />
                Emergency Repairs
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
