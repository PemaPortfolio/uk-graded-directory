import { Search, MapPin } from 'lucide-react'
import type { SearchResultPlace } from '@/lib/data/getSearchResults'

interface Props {
  query: string
  location: SearchResultPlace | null
  totalStores: number
  totalProviders: number
  filter: 'all' | 'buy' | 'repair'
}

/**
 * Search Results Header
 */
export default function SearchResultsHeader({
  query,
  location,
  totalStores,
  totalProviders,
  filter,
}: Props) {
  const totalResults =
    filter === 'buy'
      ? totalStores
      : filter === 'repair'
        ? totalProviders
        : totalStores + totalProviders

  return (
    <div className="bg-white border-b border-gray-200 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results
            {query && (
              <span className="font-normal text-gray-600"> for &quot;{query}&quot;</span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location.name}</span>
            </div>
          )}
          <span>
            {totalResults} result{totalResults !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
    </div>
  )
}
