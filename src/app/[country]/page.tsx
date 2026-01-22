import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getCountryPageDataSafe } from '@/lib/data/getCountryPageData'
import { getNationalRetailCategoryDataSafe, isValidCategorySlug } from '@/lib/data/getNationalRetailCategoryData'
import { getNationalRepairPageDataSafe, isValidRepairSlug, isRepairSlug } from '@/lib/data/getNationalRepairPageData'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  CountryBreadcrumbs,
  CountryHero,
  BrowseByRegionSection,
  PopularCitiesSection,
  BrowseByApplianceSection,
  CountryFAQSection,
  OtherCountriesSection,
} from '@/components/country'
import {
  NationalRetailBreadcrumbs,
  NationalRetailHero,
  PopularCitiesSection as NationalPopularCitiesSection,
  BrowseByCountrySection,
  UnderstandingGradesSection,
  BuyingGuideSection,
  PopularBrandsSection,
  SubcategoriesSection,
  RelatedCategoriesSection,
  RepairCrossSellSection,
  NationalRetailFAQ,
} from '@/components/national-retail'
import {
  NationalRepairBreadcrumbs,
  NationalRepairHero,
  RepairPopularCitiesSection,
  RepairBrowseByCountrySection,
  RepairCostsSection,
  CommonIssuesSection,
  RepairVsReplaceSection,
  RelatedRepairServicesSection,
  DIYPartsSection,
  NationalRepairFAQ,
  CrossSellRetailSection,
} from '@/components/national-repair'

interface Props {
  params: Promise<{ country: string }>
}

// Valid country slugs
const VALID_COUNTRIES = ['england', 'scotland', 'wales', 'northern-ireland']

// Reserved paths that should NOT be handled by this dynamic route
// These have their own static routes in the app directory
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

// Generate static params for all countries
export async function generateStaticParams() {
  return VALID_COUNTRIES.map((country) => ({ country }))
}

// Generate metadata for SEO - handles country, category, and repair pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params

  // Check if this is a repair slug (ends with -repair)
  if (isRepairSlug(slug)) {
    const isValidRepair = await isValidRepairSlug(slug)
    if (isValidRepair) {
      return generateRepairMetadata(slug)
    }
  }

  // Check if this is a category slug
  const isCategory = await isValidCategorySlug(slug)
  if (isCategory) {
    return generateCategoryMetadata(slug)
  }

  // Otherwise, generate country metadata
  return generateCountryMetadata(slug)
}

async function generateCountryMetadata(countrySlug: string): Promise<Metadata> {
  const data = await getCountryPageDataSafe(countrySlug)

  if (!data) {
    return {
      title: 'Country Not Found | UK Graded Appliances',
    }
  }

  const { country } = data

  const title =
    country.seo_title ||
    `Graded Appliances & Repair in ${country.name} | UK Graded Appliances`

  const description =
    country.seo_meta_description ||
    `Find ${country.store_count}+ graded appliance stores and ${country.provider_count}+ repair engineers across ${country.place_count}+ locations in ${country.name}. Compare prices, warranties, and delivery options.`

  return {
    title,
    description,
    keywords: `graded appliances ${country.name}, ex-display appliances ${country.name}, factory seconds ${country.name}, appliance repair ${country.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/${country.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${country.slug}/`,
    },
    robots: {
      index: country.is_indexable,
      follow: true,
    },
  }
}

async function generateCategoryMetadata(categorySlug: string): Promise<Metadata> {
  const data = await getNationalRetailCategoryDataSafe(categorySlug)

  if (!data) {
    return {
      title: 'Category Not Found | UK Graded Appliances',
    }
  }

  const { category, totalStores, totalCities, stats } = data
  const categoryName = category.name_plural || category.name

  const title = `Graded ${category.name} UK | ${totalStores}+ Stores | Save ${stats.avgDiscountMin}-${stats.avgDiscountMax}%`

  const description = `Find graded ${categoryName.toLowerCase()} from ${totalStores}+ stores across ${totalCities}+ UK cities. Ex-display, B-grade & factory seconds. Save ${stats.avgDiscountMin}-${stats.avgDiscountMax}% with full warranties.`

  const pageUrl = `https://ukgradedappliances.co.uk/${categorySlug}/`

  return {
    title,
    description,
    keywords: `graded ${category.name.toLowerCase()}, ex-display ${category.name.toLowerCase()}, factory seconds ${category.name.toLowerCase()}, b-grade ${category.name.toLowerCase()}, cheap ${category.name.toLowerCase()} UK`,
    openGraph: {
      title: `Graded ${category.name} UK | ${totalStores}+ Stores`,
      description: `Find graded ${categoryName.toLowerCase()} from ${totalStores}+ stores across ${totalCities}+ UK cities.`,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: pageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Graded ${category.name} UK | ${totalStores}+ Stores`,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: data.isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

async function generateRepairMetadata(repairSlug: string): Promise<Metadata> {
  const data = await getNationalRepairPageDataSafe(repairSlug)

  if (!data) {
    return {
      title: 'Repair Service Not Found | UK Graded Appliances',
    }
  }

  const { category, totalProviders, totalCities, stats } = data
  const categoryName = category.name_singular || category.name

  const title = `${categoryName} Repair UK | ${totalProviders}+ Engineers | From £${stats.avgCostMin}`

  const description = `Find trusted ${categoryName.toLowerCase()} repair engineers across ${totalCities}+ UK cities. Compare prices, read reviews, book same-day callouts. Average cost £${stats.avgCostMin}-£${stats.avgCostMax}.`

  const pageUrl = `https://ukgradedappliances.co.uk/${repairSlug}/`

  return {
    title,
    description,
    keywords: `${categoryName.toLowerCase()} repair, ${categoryName.toLowerCase()} repair UK, ${categoryName.toLowerCase()} repair cost, ${categoryName.toLowerCase()} engineer, appliance repair UK`,
    openGraph: {
      title: `${categoryName} Repair UK | ${totalProviders}+ Engineers`,
      description: `Find ${categoryName.toLowerCase()} repair engineers across ${totalCities}+ UK cities. From £${stats.avgCostMin}.`,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: pageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Repair UK | ${totalProviders}+ Engineers`,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: data.isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

/**
 * Dynamic Route Handler for /{slug}/
 *
 * This handles:
 * - National Repair Pages (Spec 16): /washing-machine-repair/, /fridge-freezer-repair/, etc.
 * - National Retail Category Pages (Spec 17): /washing-machines/, /fridge-freezers/, etc.
 * - Country Pages (Spec 13): /england/, /scotland/, /wales/, /northern-ireland/
 *
 * Repair slugs are checked first, then category slugs, then country slugs.
 */
export default async function DynamicSlugPage({ params }: Props) {
  const { country: slug } = await params

  // Immediately reject reserved paths - these have their own static routes
  if (RESERVED_PATHS.includes(slug.toLowerCase())) {
    notFound()
  }

  // Check if this is a repair slug first (ends with -repair)
  if (isRepairSlug(slug)) {
    const isValidRepair = await isValidRepairSlug(slug)
    if (isValidRepair) {
      return <NationalRepairPageContent repairSlug={slug} />
    }
  }

  // Check if this is a category slug
  const isCategory = await isValidCategorySlug(slug)
  if (isCategory) {
    return <NationalRetailCategoryPageContent categorySlug={slug} />
  }

  // Otherwise, render the country page
  return <CountryPageContent countrySlug={slug} />
}

/**
 * Country Page Content (Spec 13)
 */
async function CountryPageContent({ countrySlug }: { countrySlug: string }) {
  // Validate country slug
  if (!VALID_COUNTRIES.includes(countrySlug)) {
    notFound()
  }

  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getCountryPageDataSafe(countrySlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    country,
    adminAreas,
    popularCities,
    totalCities,
    categories,
    faqs,
    otherCountries,
  } = data

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <CountryBreadcrumbs country={country} />
      </div>

      {/* Hero */}
      <CountryHero country={country} />

      {/* Browse by Region */}
      <BrowseByRegionSection
        countrySlug={country.slug}
        countryName={country.name}
        adminAreas={adminAreas}
      />

      {/* Popular Cities */}
      <PopularCitiesSection
        countrySlug={country.slug}
        countryName={country.name}
        cities={popularCities}
        totalCities={totalCities}
      />

      {/* Browse by Appliance */}
      <BrowseByApplianceSection
        countryName={country.name}
        categories={categories}
      />

      {/* FAQ */}
      <CountryFAQSection faqs={faqs} />

      {/* Other Countries */}
      <OtherCountriesSection countries={otherCountries} />

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

/**
 * National Retail Category Page Content (Spec 17)
 */
async function NationalRetailCategoryPageContent({ categorySlug }: { categorySlug: string }) {
  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getNationalRetailCategoryDataSafe(categorySlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  // Handle zero stores — redirect to appliances page
  if (data.totalStores === 0) {
    redirect('/appliances/')
  }

  const {
    category,
    citiesByCountry,
    popularCities,
    popularBrands,
    relatedCategories,
    subcategories,
    grades,
    stats,
    faqs,
  } = data

  const pageUrl = `https://ukgradedappliances.co.uk/${categorySlug}/`

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `Graded ${category.name} UK`,
        description: `Find graded ${(category.name_plural || category.name).toLowerCase()} from ${stats.totalStores}+ stores across ${stats.totalCities}+ UK cities.`,
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
            name: category.name,
            item: pageUrl,
          },
        ],
      },
      // FAQPage
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
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
        <NationalRetailBreadcrumbs category={category} />
      </div>

      {/* Hero */}
      <NationalRetailHero category={category} stats={stats} />

      {/* Popular Cities */}
      <NationalPopularCitiesSection cities={popularCities} category={category} />

      {/* Browse by Country */}
      <BrowseByCountrySection citiesByCountry={citiesByCountry} category={category} />

      {/* Understanding Grades */}
      <UnderstandingGradesSection category={category} grades={grades} />

      {/* Buying Guide */}
      <BuyingGuideSection category={category} />

      {/* Popular Brands */}
      {popularBrands.length > 0 && (
        <PopularBrandsSection brands={popularBrands} category={category} />
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <SubcategoriesSection subcategories={subcategories} parentCategory={category} />
      )}

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <RelatedCategoriesSection categories={relatedCategories} currentCategory={category} />
      )}

      {/* Repair Cross-Sell */}
      <RepairCrossSellSection category={category} />

      {/* FAQ */}
      {faqs.length > 0 && <NationalRetailFAQ faqs={faqs} />}

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

/**
 * National Repair Page Content (Spec 16)
 */
async function NationalRepairPageContent({ repairSlug }: { repairSlug: string }) {
  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getNationalRepairPageDataSafe(repairSlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  // Handle zero providers — redirect to repair services page
  if (data.totalProviders === 0) {
    redirect('/repair-services/')
  }

  const {
    category,
    citiesByCountry,
    popularCities,
    relatedCategories,
    stats,
    faqs,
  } = data

  const categoryName = category.name_singular || category.name
  const pageUrl = `https://ukgradedappliances.co.uk/${repairSlug}/`

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${categoryName} Repair UK`,
        description: `Find ${categoryName.toLowerCase()} repair engineers across ${stats.totalCities}+ UK cities.`,
        isPartOf: {
          '@id': 'https://ukgradedappliances.co.uk/#website',
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
      },
      // Service
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${categoryName} Repair`,
        description: `Professional ${categoryName.toLowerCase()} repair services across the United Kingdom.`,
        provider: {
          '@type': 'Organization',
          name: 'UK Graded Appliances Directory',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        serviceType: 'Appliance Repair',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: stats.avgCostMin,
          highPrice: stats.avgCostMax,
          priceCurrency: 'GBP',
          offerCount: stats.totalProviders,
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
            name: `${categoryName} Repair`,
            item: pageUrl,
          },
        ],
      },
      // FAQPage
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
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
        <NationalRepairBreadcrumbs category={category} />
      </div>

      {/* Hero */}
      <NationalRepairHero category={category} stats={stats} />

      {/* Popular Cities */}
      <RepairPopularCitiesSection cities={popularCities} category={category} />

      {/* Browse by Country */}
      <RepairBrowseByCountrySection citiesByCountry={citiesByCountry} category={category} />

      {/* Repair Costs */}
      <RepairCostsSection category={category} stats={stats} />

      {/* Common Issues */}
      {stats.commonIssues.length > 0 && (
        <CommonIssuesSection category={category} issues={stats.commonIssues} />
      )}

      {/* Repair vs Replace */}
      <RepairVsReplaceSection category={category} stats={stats} />

      {/* Related Repair Services */}
      {relatedCategories.length > 0 && (
        <RelatedRepairServicesSection categories={relatedCategories} currentCategory={category} />
      )}

      {/* DIY Parts (Affiliate) */}
      <DIYPartsSection category={category} />

      {/* FAQ */}
      {faqs.length > 0 && <NationalRepairFAQ faqs={faqs} />}

      {/* Cross-Sell Retail */}
      <CrossSellRetailSection category={category} />

      {/* Footer */}
      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
