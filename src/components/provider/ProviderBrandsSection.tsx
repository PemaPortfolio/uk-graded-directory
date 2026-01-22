import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  authorisation_type: string | null
}

interface Props {
  brands: Brand[]
}

/**
 * Brand Authorizations Section (Spec 11 - Section 8)
 */
export default function ProviderBrandsSection({ brands }: Props) {
  if (brands.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Authorized Brand Repairs
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}/`}
            className="group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-[#e85d4c] transition-colors"
          >
            {brand.logo_url ? (
              <Image
                src={brand.logo_url}
                alt={brand.name}
                width={80}
                height={40}
                className="h-10 w-auto object-contain mb-2"
                unoptimized
              />
            ) : (
              <span className="font-semibold text-gray-700 mb-2">{brand.name}</span>
            )}

            {brand.authorisation_type && (
              <span className="flex items-center gap-1 text-xs text-green-700">
                <CheckCircle className="w-3 h-3" />
                {brand.authorisation_type}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
