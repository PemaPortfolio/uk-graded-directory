import SearchStoreCard from './SearchStoreCard'
import SearchProviderCard from './SearchProviderCard'
import type { SearchResultStore, SearchResultProvider } from '@/lib/data/getSearchResults'

interface Props {
  stores: SearchResultStore[]
  providers: SearchResultProvider[]
  filter: 'all' | 'buy' | 'repair'
}

/**
 * Search Results List
 */
export default function SearchResultsList({ stores, providers, filter }: Props) {
  const showStores = filter === 'all' || filter === 'buy'
  const showProviders = filter === 'all' || filter === 'repair'

  return (
    <div className="space-y-8">
      {/* Stores section */}
      {showStores && stores.length > 0 && (
        <section>
          {filter === 'all' && (
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Graded Appliance Retailers ({stores.length})
            </h2>
          )}
          <div className="space-y-4">
            {stores.map((store) => (
              <SearchStoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      )}

      {/* Providers section */}
      {showProviders && providers.length > 0 && (
        <section>
          {filter === 'all' && (
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Repair Engineers ({providers.length})
            </h2>
          )}
          <div className="space-y-4">
            {providers.map((provider) => (
              <SearchProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
