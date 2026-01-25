import { Clock, Calendar } from 'lucide-react'
import type { Guide } from '@/lib/data/getGuidesIndexData'

interface GuideContentProps {
  guide: Guide
}

/**
 * Guide Content Component
 *
 * Displays the full content of a guide article.
 * Includes title, metadata, featured image, and rendered content.
 */
export default function GuideContent({ guide }: GuideContentProps) {
  const publishedDate = guide.published_at
    ? new Date(guide.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <article className="max-w-3xl">
      {/* Category Badge */}
      {guide.category && (
        <span className="inline-block px-3 py-1 text-sm font-medium text-[#e85d4c] bg-[#e85d4c]/10 rounded-full mb-4">
          {guide.category.name}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {guide.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
        {publishedDate && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {publishedDate}
          </span>
        )}
        {guide.reading_time_minutes && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {guide.reading_time_minutes} min read
          </span>
        )}
      </div>

      {/* Featured Image */}
      {guide.featured_image_url && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
          <img
            src={guide.featured_image_url}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:text-gray-600 dark:prose-p:text-gray-300
          prose-a:text-[#e85d4c] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
          prose-ul:text-gray-600 dark:prose-ul:text-gray-300
          prose-ol:text-gray-600 dark:prose-ol:text-gray-300
          prose-li:marker:text-[#e85d4c]
          prose-blockquote:border-l-[#e85d4c] prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
          prose-hr:border-gray-200 dark:prose-hr:border-gray-700"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />
    </article>
  )
}
