'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react'

interface GuideItem {
  title: string
  slug: string
  description: string
}

interface TopicItem {
  label: string
  slug: string
}

const featuredGuides: GuideItem[] = [
  {
    title: 'What Are Graded Appliances?',
    slug: 'what-are-graded-appliances',
    description: 'Understanding grade levels and what they mean'
  },
  {
    title: 'A-Grade vs B-Grade: Which to Buy?',
    slug: 'a-grade-vs-b-grade',
    description: 'Compare grades to find the best value'
  },
  {
    title: 'How to Spot a Good Deal',
    slug: 'how-to-spot-a-good-deal',
    description: 'Tips for finding genuine bargains'
  },
]

const browseByTopic: TopicItem[] = [
  { label: 'Buying Guides', slug: 'buying' },
  { label: 'Repair Guides', slug: 'repair' },
  { label: 'Grade Explainers', slug: 'grades' },
  { label: 'Brand Comparisons', slug: 'brands' },
  { label: 'Money Saving Tips', slug: 'savings' },
]

/**
 * Guides Dropdown Menu (Spec 23)
 *
 * Dropdown menu for browsing guides:
 * - Featured guides
 * - Browse by topic
 * - View all guides link
 */
export default function GuidesMenu() {
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
        Guides
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[360px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Featured Guides */}
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Featured Guides
            </div>
            <div className="space-y-2">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}/`}
                  className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {guide.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {guide.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Browse by Topic */}
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Browse by Topic
            </div>
            <div className="grid grid-cols-2 gap-1">
              {browseByTopic.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/guides/?category=${topic.slug}`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {topic.label}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Link */}
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/guides/"
              className="flex items-center gap-2 text-sm font-medium text-[#e85d4c] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              View All Guides
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
