import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCityPageDataSafe } from '@/lib/data/getCityPageData'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  CityBreadcrumbs,
  CityHero,
  StoreListSection,
  RepairServicesSection,
  CityCategoriesSection,
  NearbyCitiesSection,
  CityFAQSection,
} from '@/components/city'

interface Props {
  params: Promise<{ country: string; city: string }>
}

// Valid country slugs
const VALID_COUNTRIES = ['england', 'scotland', 'wales', 'northern-ireland']

// Reserved paths that should NOT be handled by this dynamic route
const RESERVED_PATHS = [
  'business',
  'login',
  'auth',
  'store',
  'provider',
  'search',
  'api',
  'dashboard',
  'account',
  '_next',
]

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params
  const data = await getCityPageDataSafe(countrySlug, citySlug)

  if (!data) {
    return {
      title: 'City Not Found | UK Graded Appliances',
    }
  }

  const { city, country } = data

  const title =
    city.seo_title ||
    `Graded Appliances in ${city.name} | Find Ex-Display & Factory Seconds`

  const description =
    city.seo_meta_description ||
    `Find ${city.store_count} graded appliance stores and ${city.provider_count} repair engineers in ${city.name}, ${country.name}. Save 30-70% on washing machines, fridge freezers, dishwashers and more.`

  return {
    title,
    description,
    keywords: `graded appliances ${city.name}, ex-display appliances ${city.name}, factory seconds ${city.name}, appliance repair ${city.name}, ${country.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/${country.slug}/${city.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${country.slug}/${city.slug}/`,
    },
    robots: {
      index: city.is_indexable,
      follow: true,
    },
  }
}

/**
 * City Hub Page (Spec 07)
 *
 * Unified hub for a city combining graded appliance retailers
 * and repair services on a single canonical URL.
 *
 * URL: /{country}/{city}/
 * Example: /england/manchester/
 */
export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params

  // Immediately reject reserved paths - these have their own static routes
  if (RESERVED_PATHS.includes(countrySlug.toLowerCase())) {
    notFound()
  }

  // Validate country slug
  if (!VALID_COUNTRIES.includes(countrySlug)) {
    notFound()
  }

  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getCityPageDataSafe(countrySlug, citySlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    city,
    country,
    adminArea,
    stores,
    providers,
    nearbyCities,
    categories,
    faqs,
  } = data

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <CityBreadcrumbs country={country} city={city} />
      </div>

      {/* Hero */}
      <CityHero city={city} adminArea={adminArea} />

      {/* Store Listings */}
      <StoreListSection cityName={city.name} stores={stores} />

      {/* Repair Services */}
      <RepairServicesSection
        cityName={city.name}
        providers={providers}
        countrySlug={country.slug}
        citySlug={city.slug}
      />

      {/* Categories */}
      <CityCategoriesSection
        cityName={city.name}
        countrySlug={country.slug}
        citySlug={city.slug}
        categories={categories}
      />

      {/* FAQ */}
      <CityFAQSection faqs={faqs} cityName={city.name} />

      {/* Nearby Cities */}
      <NearbyCitiesSection cities={nearbyCities} />

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
