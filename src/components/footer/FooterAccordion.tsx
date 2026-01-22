'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface FooterAccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  count?: number
  icon?: ReactNode
}

/**
 * Reusable Accordion Component for Footer (Spec 05)
 *
 * - Uses CSS max-height for collapse animation (SEO-safe)
 * - Links always in DOM for crawlers
 * - aria-expanded for accessibility
 */
export default function FooterAccordion({
  title,
  children,
  defaultOpen = false,
  count,
  icon,
}: FooterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-slate-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 font-semibold text-white">
          {icon && <span className="text-lg">{icon}</span>}
          {title}
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] pb-4' : 'max-h-0'
        }`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  )
}
