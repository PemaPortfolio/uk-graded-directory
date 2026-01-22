import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getRetailCategoryDataSafe } from '@/lib/data/getRetailCategoryData'
import { getRepairCategoryDataSafe } from '@/lib/data/getRepairCategoryData'
import {
  getBrandRepairPageDataSafe,
  isBrandRepairSlug,
  parseBrandFromRepairSlug,
} from '@/lib/data/getBrandRepairData'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  RetailCategoryBreadcrumbs,
  RetailCategoryHeader,
  StoreGrid,
  BuyingGuideSection,
  GradeExplanationSection,
  RepairCTASection,
  RetailFAQSection,
  NearbyLocationsSection,
  RelatedCategoriesSection,
  EmptyStateSection,
} from '@/components/retail-category'
import {
  RepairCategoryBreadcrumbs,
  RepairCategoryHeader,
  ProviderGrid,
  CommonIssuesSection,
  RepairCostsSection,
  RetailCTASection as RepairRetailCTA,
  OtherRepairCategoriesSection,
  RepairNearbyCitiesSection,
  RepairFAQSection,
  EmptyRepairStateSection,
} from '@/components/repair-category'
import {
  BrandRepairBreadcrumbs,
  BrandRepairHero,
  BrandQuickStats,
  BrandProviderListings,
  BrandApplianceCategoriesSection,
  WhyAuthorizedSection,
  BrandRepairCostsSection,
  BrandPartsSection,
  BrandCrossSellRetailSection,
  OtherBrandsSection,
  BrandNearbyCitiesSection,
  BrandRepairFAQ,
  LowProviderMessage,
} from '@/components/brand-repair'

interface Props {
  params: Promise<{ country: string; city: string; category: string }>
}

/**
 * Check if slug is for a repair page
 */
function isRepairSlug(slug: string): boolean {
  return slug.endsWith('-repair')
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, city, category: categorySlug } = await params

  // Check if this is a repair page
  if (isRepairSlug(categorySlug)) {
    // First try brand repair, then fall back to category repair
    const brandRepairData = await getBrandRepairPageDataSafe(country, city, categorySlug)
    if (brandRepairData) {
      return generateBrandRepairMetadata(brandRepairData)
    }
    return generateRepairMetadata(country, city, categorySlug)
  }

  return generateRetailMetadata(country, city, categorySlug)
}

async function generateRetailMetadata(
  country: string,
  city: string,
  categorySlug: string
): Promise<Metadata> {
  const data = await getRetailCategoryDataSafe(country, city, categorySlug)

  if (!data) {
    return {
      title: 'Category Not Found | UK Graded Appliances',
    }
  }

  const { category, place, stores, isIndexable } = data
  const categoryName = category.name_plural || category.name

  const title =
    category.seo_title_template?.replace('{location}', place.name) ||
    `Graded ${categoryName} in ${place.name} | UK Graded Appliances`

  const description =
    category.seo_meta_template?.replace('{location}', place.name) ||
    `Compare ${stores.length} stores selling graded ${categoryName.toLowerCase()} in ${place.name}. Save 30-70% on ex-display, factory seconds & B-grade. Free delivery options available.`

  const pageUrl = `https://ukgradedappliances.co.uk/${country}/${city}/${categorySlug}/`

  return {
    title,
    description,
    keywords: `graded ${categoryName.toLowerCase()}, ${categoryName.toLowerCase()} ${place.name}, ex-display ${categoryName.toLowerCase()}, b-grade ${categoryName.toLowerCase()}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: pageUrl,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: isIndexable,
      follow: true,
    },
  }
}

async function generateRepairMetadata(
  country: string,
  city: string,
  repairSlug: string
): Promise<Metadata> {
  const data = await getRepairCategoryDataSafe(country, city, repairSlug)

  if (!data) {
    return {
      title: 'Repair Service Not Found | UK Graded Appliances',
    }
  }

  const { category, place, providers, isIndexable } = data
  const categoryName = category.name_singular || category.name

  const title =
    category.repair_seo_title_template?.replace('{location}', place.name) ||
    `${categoryName} Repair in ${place.name} | UK Graded Appliances`

  const description = `Compare ${providers.length} ${categoryName.toLowerCase()} repair engineers in ${place.name}. Same-day callouts, no fix no fee policies, verified reviews. Find local repair specialists.`

  const pageUrl = `https://ukgradedappliances.co.uk/${country}/${city}/${repairSlug}/`

  return {
    title,
    description,
    keywords: `${categoryName.toLowerCase()} repair ${place.name}, ${categoryName.toLowerCase()} engineer ${place.name}, appliance repair ${place.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: pageUrl,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: isIndexable,
      follow: true,
    },
  }
}

function generateBrandRepairMetadata(
  data: NonNullable<Awaited<ReturnType<typeof getBrandRepairPageDataSafe>>>
): Metadata {
  const { brand, place, country, stats, isIndexable } = data

  const title = `${brand.name} Repair in ${place.name} | ${stats.providerCount} Authorized Engineers`

  const description = `Compare ${stats.providerCount} ${brand.name}-authorized repair engineers in ${place.name}. ` +
    `${stats.verifiedCount > 0 ? `${stats.verifiedCount} verified, ` : ''}` +
    `${stats.minCalloutFee ? `from £${stats.minCalloutFee}. ` : ''}` +
    `Same-day callouts, genuine parts, warranty-safe repairs.`

  const pageUrl = `https://ukgradedappliances.co.uk/${country.slug}/${place.slug}/${brand.slug}-repair/`

  return {
    title,
    description,
    keywords: `${brand.name} repair ${place.name}, ${brand.name} engineer ${place.name}, ${brand.name} authorized repair, ${brand.name} service ${place.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: pageUrl,
      images: brand.logo_url ? [{ url: brand.logo_url }] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: isIndexable,
      follow: true,
    },
  }
}

/**
 * Category Page (Spec 14 for Retail, Spec 10 for Repair, Spec 15 for Brand Repair)
 *
 * Handles retail, repair category, and brand repair pages based on URL pattern.
 * Retail: /{country}/{city}/{category}/ (e.g., /england/manchester/washing-machines/)
 * Repair: /{country}/{city}/{category}-repair/ (e.g., /england/manchester/washing-machine-repair/)
 * Brand Repair: /{country}/{city}/{brand}-repair/ (e.g., /england/manchester/bosch-repair/)
 */
export default async function CategoryPage({ params }: Props) {
  const { country, city, category: categorySlug } = await params

  // Check if this is a repair page
  if (isRepairSlug(categorySlug)) {
    // First try brand repair, then fall back to category repair
    const brandRepairData = await getBrandRepairPageDataSafe(country, city, categorySlug)
    if (brandRepairData) {
      return <BrandRepairPage data={brandRepairData} />
    }
    return <RepairCategoryPage country={country} city={city} repairSlug={categorySlug} />
  }

  return <RetailCategoryPage country={country} city={city} categorySlug={categorySlug} />
}

/**
 * Retail Category Page Component
 */
async function RetailCategoryPage({
  country,
  city,
  categorySlug,
}: {
  country: string
  city: string
  categorySlug: string
}) {
  const [data, footerData] = await Promise.all([
    getRetailCategoryDataSafe(country, city, categorySlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    category,
    place,
    country: countryData,
    stores,
    grades,
    faqs,
    nearbyCities,
    relatedCategories,
    stats,
    isIndexable,
  } = data

  const categoryName = category.name_plural || category.name

  return (
    <>
      {!isIndexable && (
        <head>
          <meta name="robots" content="noindex, follow" />
        </head>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RetailCategoryBreadcrumbs
          country={countryData}
          city={place}
          categoryName={categoryName}
        />

        <RetailCategoryHeader category={category} place={place} stats={stats} />

        {stores.length > 0 ? (
          <StoreGrid stores={stores} category={category} />
        ) : (
          <EmptyStateSection
            category={category}
            place={place}
            countrySlug={country}
            nearbyCities={nearbyCities}
          />
        )}

        {stores.length > 0 && (
          <div className="space-y-2">
            {category.buying_guide && (
              <BuyingGuideSection categoryName={categoryName} content={category.buying_guide} />
            )}

            <GradeExplanationSection grades={grades} />

            {category.supports_repair && (
              <RepairCTASection category={category} place={place} countrySlug={country} />
            )}

            <RetailFAQSection faqs={faqs} categoryName={categoryName} placeName={place.name} />

            <NearbyLocationsSection
              currentPlace={place}
              category={category}
              countrySlug={country}
              nearbyCities={nearbyCities}
            />

            <RelatedCategoriesSection
              place={place}
              countrySlug={country}
              relatedCategories={relatedCategories}
            />
          </div>
        )}
      </div>

      <Footer data={footerData} />
    </>
  )
}

/**
 * Repair Category Page Component
 */
async function RepairCategoryPage({
  country,
  city,
  repairSlug,
}: {
  country: string
  city: string
  repairSlug: string
}) {
  const [data, footerData] = await Promise.all([
    getRepairCategoryDataSafe(country, city, repairSlug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    category,
    place,
    country: countryData,
    providers,
    faqs,
    nearbyCities,
    relatedCategories,
    stats,
    isIndexable,
  } = data

  const categoryName = category.name_singular || category.name

  return (
    <>
      {!isIndexable && (
        <head>
          <meta name="robots" content="noindex, follow" />
        </head>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RepairCategoryBreadcrumbs
          country={countryData}
          city={place}
          categoryName={categoryName}
        />

        <RepairCategoryHeader category={category} place={place} stats={stats} />

        {providers.length > 0 ? (
          <ProviderGrid providers={providers} category={category} />
        ) : (
          <EmptyRepairStateSection
            category={category}
            place={place}
            countrySlug={country}
            nearbyCities={nearbyCities}
          />
        )}

        {providers.length > 0 && (
          <div className="space-y-2">
            <CommonIssuesSection category={category} placeName={place.name} />

            <RepairCostsSection category={category} placeName={place.name} stats={stats} />

            <RepairRetailCTA category={category} place={place} countrySlug={country} />

            <RepairFAQSection faqs={faqs} categoryName={categoryName} placeName={place.name} />

            <OtherRepairCategoriesSection
              place={place}
              countrySlug={country}
              relatedCategories={relatedCategories}
            />

            <RepairNearbyCitiesSection
              currentPlace={place}
              category={category}
              countrySlug={country}
              nearbyCities={nearbyCities}
            />
          </div>
        )}
      </div>

      <Footer data={footerData} />
    </>
  )
}

/**
 * Brand Repair Page Component (Spec 15)
 */
async function BrandRepairPage({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getBrandRepairPageDataSafe>>>
}) {
  const footerData = await getFooterDataSafe()

  const {
    brand,
    place,
    country,
    providers,
    applianceCategories,
    otherBrands,
    nearbyCities,
    stats,
    faqs,
    isIndexable,
  } = data

  // Handle redirect for 0 providers
  if (providers.length === 0) {
    redirect(`/${country.slug}/${place.slug}/`)
  }

  return (
    <>
      {!isIndexable && (
        <head>
          <meta name="robots" content="noindex, follow" />
        </head>
      )}

      <BrandRepairBreadcrumbs brand={brand} place={place} country={country} />

      <BrandRepairHero brand={brand} place={place} stats={stats} />

      <BrandQuickStats stats={stats} />

      <BrandProviderListings
        providers={providers}
        brand={brand}
        place={place}
        country={country}
      />

      {/* Low provider count message */}
      {!isIndexable && providers.length > 0 && (
        <LowProviderMessage
          count={providers.length}
          brand={brand}
          place={place}
          country={country}
        />
      )}

      {applianceCategories.length > 0 && (
        <BrandApplianceCategoriesSection
          brand={brand}
          place={place}
          country={country}
          categories={applianceCategories}
        />
      )}

      {brand.has_authorised_network && <WhyAuthorizedSection brand={brand} />}

      <BrandRepairCostsSection brand={brand} place={place} stats={stats} />

      <BrandPartsSection brand={brand} />

      <BrandCrossSellRetailSection brand={brand} place={place} country={country} />

      {otherBrands.length > 0 && (
        <OtherBrandsSection brands={otherBrands} place={place} country={country} />
      )}

      {nearbyCities.length > 0 && (
        <BrandNearbyCitiesSection brand={brand} nearbyCities={nearbyCities} />
      )}

      <BrandRepairFAQ faqs={faqs} />

      <Footer data={footerData} />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
