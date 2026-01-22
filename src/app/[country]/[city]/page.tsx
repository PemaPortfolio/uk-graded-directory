import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCityPageDataSafe } from '@/lib/data/getCityPageData'
import { getAdminAreaPageDataSafe } from '@/lib/data/getAdminAreaPageData'
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
import {
  AdminAreaBreadcrumbs,
  AdminAreaHero,
  PlacesInAreaSection,
  NearbyAdminAreasSection,
  AdminAreaCategoriesSection,
  AdminAreaFAQSection,
} from '@/components/admin-area'

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

  // Try city/place first
  const cityData = await getCityPageDataSafe(countrySlug, citySlug)

  if (cityData) {
    const { city, country } = cityData

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

  // Try admin area
  const adminAreaData = await getAdminAreaPageDataSafe(countrySlug, citySlug)

  if (adminAreaData) {
    const { adminArea, country } = adminAreaData

    const title =
      adminArea.seo_title ||
      `Graded Appliances in ${adminArea.name} | Stores & Repair Services`

    const description =
      adminArea.seo_meta_description ||
      `Browse ${adminArea.place_count} locations in ${adminArea.name}, ${country.name}. Find graded appliance stores and repair engineers across the region.`

    return {
      title,
      description,
      keywords: `graded appliances ${adminArea.name}, ex-display appliances ${adminArea.name}, appliance repair ${adminArea.name}, ${country.name}`,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'en_GB',
        siteName: 'UK Graded Appliances',
        url: `https://ukgradedappliances.co.uk/${country.slug}/${adminArea.slug}/`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `https://ukgradedappliances.co.uk/${country.slug}/${adminArea.slug}/`,
      },
      robots: {
        index: adminArea.is_indexable,
        follow: true,
      },
    }
  }

  return {
    title: 'Location Not Found | UK Graded Appliances',
  }
}

/**
 * City/Admin Area Page
 *
 * Handles both:
 * 1. City Hub (Spec 07) - For places (cities/towns)
 * 2. Admin Area Page - For regions/counties (e.g., Greater Manchester, Trafford)
 *
 * URL: /{country}/{slug}/
 * Examples:
 *   /england/manchester/ - City page (Manchester is a place)
 *   /england/trafford/ - Admin area page (Trafford is a region)
 */
export default async function CityOrAdminAreaPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params

  // Immediately reject reserved paths - these have their own static routes
  if (RESERVED_PATHS.includes(countrySlug.toLowerCase())) {
    notFound()
  }

  // Validate country slug
  if (!VALID_COUNTRIES.includes(countrySlug)) {
    notFound()
  }

  // Fetch footer data (needed for both page types)
  const footerData = await getFooterDataSafe()

  // Try city/place first (takes priority when slug exists in both tables)
  const cityData = await getCityPageDataSafe(countrySlug, citySlug)

  if (cityData) {
    const {
      city,
      country,
      adminArea,
      stores,
      providers,
      nearbyCities,
      categories,
      faqs,
    } = cityData

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

  // Try admin area (for regional pages like /england/trafford/)
  const adminAreaData = await getAdminAreaPageDataSafe(countrySlug, citySlug)

  if (adminAreaData) {
    const {
      adminArea,
      country,
      places,
      categories,
      nearbyAdminAreas,
      faqs,
    } = adminAreaData

    return (
      <>
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <AdminAreaBreadcrumbs
            countryName={country.name}
            countrySlug={country.slug}
            adminAreaName={adminArea.name}
          />
        </div>

        {/* Hero */}
        <AdminAreaHero
          adminAreaName={adminArea.name}
          countryName={country.name}
          h1Heading={adminArea.h1_heading}
          introParagraph={adminArea.intro_paragraph}
          placeCount={adminArea.place_count}
          storeCount={adminArea.store_count}
          providerCount={adminArea.provider_count}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
        />

        {/* Places in this Area */}
        <PlacesInAreaSection
          places={places}
          adminAreaName={adminArea.name}
          countrySlug={country.slug}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        />

        {/* Browse by Appliance Category */}
        <AdminAreaCategoriesSection
          categories={categories}
          adminAreaName={adminArea.name}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900"
        />

        {/* FAQ */}
        <AdminAreaFAQSection
          faqs={faqs}
          adminAreaName={adminArea.name}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        />

        {/* More Regions */}
        <NearbyAdminAreasSection
          nearbyAreas={nearbyAdminAreas}
          countrySlug={country.slug}
          countryName={country.name}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900"
        />

        {/* Footer */}
        <Footer data={footerData} />
      </>
    )
  }

  // Neither city nor admin area found
  notFound()
}

// ISR: Revalidate every hour
export const revalidate = 3600
