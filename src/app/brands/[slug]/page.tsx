import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getBrandPageDataSafe } from '@/lib/data/getBrandPageData'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import { Footer } from '@/components/footer'
import {
  BrandPageHero,
  BrandAboutSection,
  BrandCategoriesSection,
  BrandStoresSection,
  BrandRepairSection,
  BrandCitiesByCountry,
  OtherBrandsSection,
} from '@/components/brand'

interface Props {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate metadata for individual brand page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getBrandPageDataSafe(slug)

  if (!data) {
    return {
      title: 'Brand Not Found | UK Graded Appliances',
    }
  }

  const { brand, stats } = data

  const title = `Graded ${brand.name} Appliances UK | ${stats.totalStores} Stores | Save 30-70%`
  const description = `Find graded ${brand.name} appliances from ${stats.totalStores} stores across ${stats.totalCities} UK cities. Ex-display, B-grade & factory seconds with full warranties.${brand.has_authorised_network ? ' Plus authorized repair services.' : ''}`

  return {
    title,
    description,
    keywords: `graded ${brand.name.toLowerCase()} appliances, ex-display ${brand.name.toLowerCase()}, ${brand.name.toLowerCase()} graded appliances UK, discount ${brand.name.toLowerCase()}, ${brand.name.toLowerCase()} factory seconds`,
    openGraph: {
      title: `Graded ${brand.name} Appliances UK`,
      description: `Find graded ${brand.name} appliances from ${stats.totalStores}+ stores across ${stats.totalCities}+ UK cities.`,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/brands/${slug}/`,
      images: brand.logo_url ? [{ url: brand.logo_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Graded ${brand.name} Appliances UK`,
      description: `Find graded ${brand.name} appliances from ${stats.totalStores}+ stores.`,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/brands/${slug}/`,
    },
    robots: {
      index: data.isIndexable,
      follow: true,
    },
  }
}

/**
 * Individual Brand Page
 *
 * Displays brand details, categories, stores, repair providers, and related brands
 */
export default async function BrandPage({ params }: Props) {
  const { slug } = await params

  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getBrandPageDataSafe(slug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  // Redirect if no stores
  if (data.stats.totalStores === 0) {
    redirect('/brands/')
  }

  const { brand, stats, categories, popularCities, citiesByCountry, otherBrands } = data

  const pageUrl = `https://ukgradedappliances.co.uk/brands/${slug}/`

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Graded ${brand.name} Appliances UK`,
        description: `Find graded ${brand.name} appliances from ${stats.totalStores} stores across ${stats.totalCities} UK cities.`,
        isPartOf: {
          '@id': 'https://ukgradedappliances.co.uk/#website',
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
      },
      // Brand entity
      {
        '@type': 'Brand',
        '@id': `${pageUrl}#brand`,
        name: brand.name,
        logo: brand.logo_url,
        url: brand.website,
        description: brand.description,
        ...(brand.country_of_origin && {
          foundingLocation: {
            '@type': 'Country',
            name: brand.country_of_origin,
          },
        }),
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ukgradedappliances.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Brands',
            item: 'https://ukgradedappliances.co.uk/brands/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: brand.name,
          },
        ],
      },
      // ItemList - Cities with stores
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#citylist`,
        name: `${brand.name} Stores by City`,
        numberOfItems: stats.totalCities,
        itemListElement: citiesByCountry
          .flatMap(({ country, cities }) =>
            cities.slice(0, 10).map((city) => ({
              countrySlug: country.slug,
              ...city,
            }))
          )
          .slice(0, 20)
          .map((city, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `Graded ${brand.name} in ${city.name}`,
            url: `https://ukgradedappliances.co.uk/${city.country_slug}/${city.slug}/`,
          })),
      },
    ],
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex items-center gap-1 flex-wrap">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-500 hover:text-[#e85d4c] transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>

            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>

            {/* Brands */}
            <li>
              <Link
                href="/brands/"
                className="text-gray-500 hover:text-[#e85d4c] transition-colors"
              >
                Brands
              </Link>
            </li>

            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>

            {/* Current Page */}
            <li>
              <span className="text-gray-900 dark:text-[#f5f0f0] font-medium">
                {brand.name}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <BrandPageHero brand={brand} stats={stats} />

      {/* About Section */}
      <BrandAboutSection brand={brand} />

      {/* Categories Section */}
      {categories.length > 0 && (
        <BrandCategoriesSection brand={brand} categories={categories} />
      )}

      {/* Find Stores Section */}
      <BrandStoresSection
        brand={brand}
        cities={popularCities}
        totalCities={stats.totalCities}
      />

      {/* Repair Section (if applicable) */}
      {brand.has_authorised_network && stats.totalProviders > 0 && (
        <BrandRepairSection brand={brand} cities={popularCities} />
      )}

      {/* Cities by Country Section */}
      <BrandCitiesByCountry brand={brand} citiesByCountry={citiesByCountry} />

      {/* Other Brands Section */}
      {otherBrands.length > 0 && (
        <OtherBrandsSection currentBrand={brand} otherBrands={otherBrands} />
      )}

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
