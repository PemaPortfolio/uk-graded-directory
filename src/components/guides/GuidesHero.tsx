import { BookOpen } from 'lucide-react'

/**
 * Guides Index Hero Section
 *
 * Hero section for the guides index page with title and description.
 */
export default function GuidesHero() {
  return (
    <section className="bg-gradient-to-br from-[#e85d4c]/10 via-white to-white dark:from-[#e85d4c]/5 dark:via-gray-900 dark:to-gray-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e85d4c]/10 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-[#e85d4c]" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Guides & Resources
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Everything you need to know about buying graded appliances, understanding grade levels,
            finding the best deals, and making informed decisions about appliance repairs.
          </p>
        </div>
      </div>
    </section>
  )
}
