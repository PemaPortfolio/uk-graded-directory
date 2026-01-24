import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getCategoriesIndexDataSafe } from '@/lib/data/getCategoriesIndexData'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import { Footer } from '@/components/footer'
import { CategoriesHero, CategoryGrid } from '@/components/categories'

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'All Graded Appliance Categories | UK Graded Appliances',
  description:
    'Browse 16 categories of graded appliances from stores across the UK. Find ex-display, B-grade, and factory second washing machines, fridge freezers, dishwashers and more at 30-70% off.',
  keywords:
    'graded appliances, ex-display appliances, factory seconds, B-grade appliances, appliance categories UK',
  openGraph: {
    title: 'All Graded Appliance Categories | UK Graded Appliances',
    description:
      'Browse 16 categories of graded appliances from stores across the UK. Save 30-70% on ex-display and B-grade appliances.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'UK Graded Appliances',
    url: 'https://ukgradedappliances.co.uk/categories/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Graded Appliance Categories | UK Graded Appliances',
    description:
      'Browse 16 categories of graded appliances from stores across the UK.',
  },
  alternates: {
    canonical: 'https://ukgradedappliances.co.uk/categories/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Categories Index Page
 *
 * Displays all appliance categories grouped by tier with stats
 */
export default async function CategoriesPage() {
  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getCategoriesIndexDataSafe(),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    tier1Categories,
    tier2Categories,
    tier3Categories,
    supplementaryCategories,
    stats,
  } = data

  const pageUrl = 'https://ukgradedappliances.co.uk/categories/'

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'All Graded Appliance Categories',
        description: `Browse ${stats.totalCategories} categories of graded appliances from ${stats.totalStores}+ stores across ${stats.totalCities}+ UK cities.`,
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
            name: 'All Categories',
            item: pageUrl,
          },
        ],
      },
      // ItemList of categories
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'Graded Appliance Categories',
        itemListElement: [
          ...tier1Categories,
          ...tier2Categories,
          ...tier3Categories,
          ...supplementaryCategories,
        ].map((cat, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: cat.name_plural || cat.name,
          url: `https://ukgradedappliances.co.uk/${cat.slug}/`,
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
                All Categories
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <CategoriesHero stats={stats} />

      {/* Tier 1: Most Popular */}
      <CategoryGrid
        title="Most Popular Categories"
        subtitle="Our highest-demand graded appliance categories with the most stores nationwide"
        categories={tier1Categories}
      />

      {/* Tier 2: More Categories */}
      <div className="bg-[#f8f6f6] dark:bg-[#0f0d0d]">
        <CategoryGrid
          title="More Categories"
          subtitle="Additional popular appliance types with great availability"
          categories={tier2Categories}
        />
      </div>

      {/* Tier 3: Specialist Categories */}
      <CategoryGrid
        title="Specialist Categories"
        subtitle="Niche appliance types for specific needs"
        categories={tier3Categories}
      />

      {/* Supplementary: Compact list */}
      {supplementaryCategories.length > 0 && (
        <div className="bg-[#f8f6f6] dark:bg-[#0f0d0d]">
          <CategoryGrid
            title="Other Categories"
            categories={supplementaryCategories}
            compact
          />
        </div>
      )}

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
