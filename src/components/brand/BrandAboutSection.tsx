import { Globe, ExternalLink, CheckCircle } from 'lucide-react'
import type { Brand } from '@/lib/data/getBrandPageData'

interface BrandAboutSectionProps {
  brand: Brand
}

/**
 * About Section for Individual Brand Page
 * Displays brand description, country of origin, website, and authorized network badge
 */
export function BrandAboutSection({ brand }: BrandAboutSectionProps) {
  // Default description if none provided
  const description =
    brand.description ||
    `${brand.name} is a ${brand.tier === 'premium' ? 'premium' : brand.tier === 'mid_range' ? 'mid-range' : 'value'} appliance brand. Find graded ${brand.name} appliances at discounted prices from trusted retailers across the UK.`

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-[#0f0d0d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-6 flex items-center gap-2">
          <span>ℹ️</span> About {brand.name}
        </h2>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Info cards */}
        <div className="bg-gray-50 dark:bg-[#1a1616] rounded-xl p-6 space-y-4">
          {brand.country_of_origin && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#e85d4c]" />
              <span className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-[#181111] dark:text-[#f5f0f0]">
                  Country of Origin:
                </span>{' '}
                {brand.country_of_origin}
              </span>
            </div>
          )}

          {brand.website && (
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#e85d4c]" />
              <span className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-[#181111] dark:text-[#f5f0f0]">
                  Official Website:
                </span>{' '}
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e85d4c] hover:underline"
                >
                  {brand.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </span>
            </div>
          )}

          {brand.has_authorised_network && (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 dark:text-green-400 font-medium">
                Has Authorized Repair Network
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
