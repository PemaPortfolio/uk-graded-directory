import { Metadata } from 'next'
import { Suspense } from 'react'
import { getSearchResultsSafe, parseFilterType } from '@/lib/data/getSearchResults'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  SearchResultsHeader,
  SearchFilters,
  SearchResultsList,
  SearchSuggestions,
  NoResultsState,
} from '@/components/search'

interface Props {
  searchParams: Promise<{ q?: string; loc?: string; type?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = '' } = await searchParams

  return {
    title: q
      ? `Search Results for "${q}" | UK Graded Appliances`
      : 'Search | UK Graded Appliances',
    description:
      'Search for graded appliances and repair services across the UK. Find the best deals on ex-display, factory seconds, and B-grade appliances.',
    robots: {
      index: false, // IMPORTANT: Search results page is noindex
      follow: true,
    },
  }
}

/**
 * Search Results Page
 *
 * This is a noindex fallback page for freeform queries that don't match
 * specific categories, brands, or businesses.
 */
export default async function SearchPage({ searchParams }: Props) {
  const { q = '', loc, type } = await searchParams
  const filterType = parseFilterType(type)

  const [results, footerData] = await Promise.all([
    getSearchResultsSafe(q, loc || null, filterType),
    getFooterDataSafe(),
  ])

  const hasResults = results.totalStores > 0 || results.totalProviders > 0
  const hasSuggestions =
    results.matchedCategories.length > 0 ||
    results.matchedBrands.length > 0 ||
    results.suggestedPlaces.length > 0

  return (
    <>
      {/* noindex meta tag */}
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>

      <SearchResultsHeader
        query={results.query}
        location={results.location}
        totalStores={results.totalStores}
        totalProviders={results.totalProviders}
        filter={results.filter}
      />

      <Suspense fallback={<div className="animate-pulse bg-gray-100 h-14" />}>
        <SearchFilters
          currentFilter={results.filter}
          storeCount={results.totalStores}
          providerCount={results.totalProviders}
        />
      </Suspense>

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {hasResults ? (
            <div className="space-y-8">
              <SearchResultsList
                stores={results.stores}
                providers={results.providers}
                filter={results.filter}
              />

              {hasSuggestions && (
                <SearchSuggestions
                  categories={results.matchedCategories}
                  brands={results.matchedBrands}
                  suggestedPlaces={results.suggestedPlaces}
                  query={results.query}
                  location={results.location}
                />
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <NoResultsState query={results.query} />

              {hasSuggestions && (
                <SearchSuggestions
                  categories={results.matchedCategories}
                  brands={results.matchedBrands}
                  suggestedPlaces={results.suggestedPlaces}
                  query={results.query}
                  location={results.location}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer data={footerData} />
    </>
  )
}

// Force dynamic rendering for search
export const dynamic = 'force-dynamic'
