import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getBrandsIndexDataSafe } from '@/lib/data/getBrandsIndexData'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import { Footer } from '@/components/footer'
import {
  BrandsIndexHero,
  BrandTierSection,
} from '@/components/brand'

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'Graded Appliance Brands UK | 27 Leading Brands | Save 30-70%',
  description:
    'Browse graded appliances from 27 leading brands at stores across the UK. Premium, mid-range & value brands with full warranties. Save 30-70% on Bosch, Samsung, Hotpoint & more.',
  keywords:
    'graded appliance brands UK, ex-display appliance brands, graded bosch appliances, graded samsung appliances, discount appliance brands',
  openGraph: {
    title: 'Graded Appliance Brands UK | 27 Leading Brands',
    description:
      'Browse graded appliances from 27 leading brands at stores across the UK. Save 30-70% on premium, mid-range & value brands.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'UK Graded Appliances',
    url: 'https://ukgradedappliances.co.uk/brands/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graded Appliance Brands UK | 27 Leading Brands',
    description:
      'Browse graded appliances from 27 leading brands at stores across the UK.',
  },
  alternates: {
    canonical: 'https://ukgradedappliances.co.uk/brands/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * Brands Index Page
 *
 * Displays all brands grouped by tier with stats
 */
export default async function BrandsIndexPage() {
  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getBrandsIndexDataSafe(),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const { premiumBrands, midRangeBrands, valueBrands, stats } = data

  const pageUrl = 'https://ukgradedappliances.co.uk/brands/'

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // CollectionPage
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'Graded Appliance Brands UK',
        description: `Browse graded appliances from ${stats.totalBrands} leading brands at ${stats.totalStores}+ stores across the UK.`,
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
            name: 'Brands',
            item: pageUrl,
          },
        ],
      },
      // ItemList of brands
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'Graded Appliance Brands',
        itemListElement: [...premiumBrands, ...midRangeBrands, ...valueBrands].map(
          (brand, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: brand.name,
            url: `https://ukgradedappliances.co.uk/brands/${brand.slug}/`,
          })
        ),
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
                Brands
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <BrandsIndexHero stats={stats} />

      {/* Premium Brands */}
      <BrandTierSection
        title="Premium Brands"
        subtitle="High-end brands known for quality, innovation and longevity."
        brands={premiumBrands}
        tierIcon="⭐"
      />

      {/* Mid-Range Brands */}
      <div className="bg-[#f8f6f6] dark:bg-[#0f0d0d]">
        <BrandTierSection
          title="Mid-Range Brands"
          subtitle="Trusted brands offering excellent value for money."
          brands={midRangeBrands}
          tierIcon="✓"
        />
      </div>

      {/* Value Brands */}
      <BrandTierSection
        title="Value Brands"
        subtitle="Budget-friendly brands for great savings."
        brands={valueBrands}
        tierIcon="💰"
      />

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
