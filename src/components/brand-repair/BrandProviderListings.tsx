import BrandProviderCard from './BrandProviderCard'
import type { ProviderWithAuthorization, BrandData, PlaceData } from '@/lib/data/getBrandRepairData'

interface Props {
  providers: ProviderWithAuthorization[]
  brand: BrandData
  place: PlaceData
}

/**
 * Provider Listings Section for Brand Repair Page (Spec 15)
 */
export default function BrandProviderListings({
  providers,
  brand,
  place,
}: Props) {
  if (providers.length === 0) return null

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {brand.name}-Authorized Engineers in {place.name}
        </h2>

        <div className="text-sm text-gray-600 mb-4">
          Showing {providers.length} {brand.name}-authorized engineer{providers.length !== 1 ? 's' : ''} in {place.name}
        </div>

        <div className="space-y-4">
          {providers.map((provider) => (
            <BrandProviderCard
              key={provider.id}
              provider={provider}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
