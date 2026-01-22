import Link from 'next/link'
import { SearchX, ArrowRight } from 'lucide-react'

interface Props {
  query: string
}

/**
 * No Results State for Search
 */
export default function NoResultsState({ query }: Props) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <SearchX className="w-8 h-8 text-gray-400" />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        No results found
        {query && <span className="font-normal text-gray-600"> for &quot;{query}&quot;</span>}
      </h2>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Try adjusting your search terms or browse our popular categories below.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-semibold rounded-lg transition-colors"
        >
          Browse All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/england/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          Browse by Location
        </Link>
      </div>
    </div>
  )
}
