import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { Guide } from '@/lib/data/getGuidesIndexData'

interface RelatedGuidesProps {
  guides: Guide[]
  title?: string
}

/**
 * Related Guides Component
 *
 * Displays a sidebar or section of related guides for cross-navigation.
 */
export default function RelatedGuides({ guides, title = 'Related Guides' }: RelatedGuidesProps) {
  if (guides.length === 0) {
    return null
  }

  return (
    <aside className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.slug}/`}
            className="group block"
          >
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#e85d4c] transition-colors line-clamp-2">
              {guide.title}
            </h3>
            {guide.reading_time_minutes && (
              <span className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {guide.reading_time_minutes} min read
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link
        href="/guides/"
        className="flex items-center gap-1 mt-6 text-sm font-medium text-[#e85d4c] hover:gap-2 transition-all"
      >
        View All Guides
        <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  )
}
