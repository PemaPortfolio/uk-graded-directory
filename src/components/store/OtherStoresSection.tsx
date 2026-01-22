import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

interface Store {
  id: string
  business_name: string
  slug: string
  average_rating: number | null
  review_count: number
}

interface Props {
  stores: Store[]
  cityName: string
  countrySlug: string
  citySlug: string
}

/**
 * Other Stores In City Section (Spec 06 - Section 11)
 */
export default function OtherStoresSection({
  stores,
  cityName,
  countrySlug,
  citySlug,
}: Props) {
  if (stores.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Other Stores in {cityName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/store/${store.slug}/`}
            className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-[#e85d4c]">
                {store.business_name}
              </h3>
              {store.average_rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-600">
                    {store.average_rating.toFixed(1)} ({store.review_count})
                  </span>
                </div>
              )}
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#e85d4c]" />
          </Link>
        ))}
      </div>

      <Link
        href={`/${countrySlug}/${citySlug}/`}
        className="inline-flex items-center gap-1 text-[#e85d4c] font-medium hover:underline"
      >
        View all stores in {cityName}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
