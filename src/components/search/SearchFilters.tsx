'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  currentFilter: 'all' | 'buy' | 'repair'
  storeCount: number
  providerCount: number
}

/**
 * Search Filter Pills
 */
export default function SearchFilters({ currentFilter, storeCount, providerCount }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (filter: 'all' | 'buy' | 'repair') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('type', filter)
    router.push(`/search?${params.toString()}`)
  }

  const filters = [
    { id: 'all' as const, label: 'All', count: storeCount + providerCount },
    { id: 'buy' as const, label: 'Buy', count: storeCount },
    { id: 'repair' as const, label: 'Repair', count: providerCount },
  ]

  return (
    <div className="flex items-center gap-2 py-4 px-4 bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Filter:</span>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  currentFilter === filter.id
                    ? 'bg-[#e85d4c] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }
              `}
            >
              {filter.label}
              <span className="ml-1.5 text-xs opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
