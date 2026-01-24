import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getLocationsPageDataSafe } from '@/lib/data/getLocationsPageData'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import { Footer } from '@/components/footer'
import { LocationsHero, LocationsCountrySection } from '@/components/locations'

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'All UK Locations | Graded Appliances & Repair Services',
  description:
    'Browse 563 UK cities across England, Scotland, Wales and Northern Ireland for graded appliance stores and repair services near you.',
  keywords:
    'graded appliances UK, appliance stores near me, repair services UK, ex-display appliances, factory seconds',
  openGraph: {
    title: 'All UK Locations | Graded Appliances & Repair Services',
    description:
      'Browse 563 UK cities across England, Scotland, Wales and Northern Ireland for graded appliance stores and repair services near you.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'UK Graded Appliances',
    url: 'https://ukgradedappliances.co.uk/locations/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All UK Locations | Graded Appliances & Repair Services',
    description:
      'Browse 563 UK cities across England, Scotland, Wales and Northern Ireland for graded appliance stores and repair services near you.',
  },
  alternates: {
    canonical: 'https://ukgradedappliances.co.uk/locations/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Locations Index Page
 *
 * Displays all UK cities grouped by country with stats
 */
export default async function LocationsPage() {
  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getLocationsPageDataSafe(),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const { countries, stats } = data
  const pageUrl = 'https://ukgradedappliances.co.uk/locations/'

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // CollectionPage
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'All UK Locations',
        description: `Browse ${stats.totalCities} cities across England, Scotland, Wales and Northern Ireland for graded appliance stores and repair services.`,
        isPartOf: {
          '@id': 'https://ukgradedappliances.co.uk/#website',
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
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
            name: 'All Locations',
            item: pageUrl,
          },
        ],
      },
      // ItemList of countries
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'UK Countries',
        itemListElement: countries.map((country, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: country.name,
          url: `https://ukgradedappliances.co.uk/${country.slug}/`,
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

            {/* Current Page */}
            <li>
              <span className="text-gray-900 dark:text-[#f5f0f0] font-medium">
                All Locations
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <LocationsHero stats={stats} />

      {/* Country Sections */}
      {countries.map((country, index) => (
        <div
          key={country.id}
          className={index % 2 === 1 ? 'bg-[#f8f6f6] dark:bg-[#0f0d0d]' : 'bg-white dark:bg-[#1a1616]'}
        >
          <LocationsCountrySection
            country={country}
            defaultExpanded={country.cityCount <= 20}
          />
        </div>
      ))}

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
