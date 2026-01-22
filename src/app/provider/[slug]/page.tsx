import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProviderProfileDataSafe } from '@/lib/data/getProviderProfileData'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  ProviderBreadcrumbs,
  ProviderHero,
  ProviderContactSidebar,
  ProviderMobileCTA,
  ProviderAboutSection,
  ProviderServicesSection,
  ProviderAvailabilitySection,
  ProviderPricingSection,
  ProviderCertificationsSection,
  ProviderBrandsSection,
  OtherProvidersSection,
} from '@/components/provider'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getProviderProfileDataSafe(slug)

  if (!data) {
    return {
      title: 'Engineer Not Found | UK Graded Appliances',
    }
  }

  const { provider, place, country } = data

  const title =
    provider.seo_title ||
    `${provider.business_name} | Appliance Repair in ${place.name}`

  const description =
    provider.seo_meta_description ||
    `${provider.business_name} provides appliance repair services in ${place.name}, ${country.name}. ${provider.gas_safe_registered ? 'Gas Safe registered.' : ''} ${provider.offers_same_day ? 'Same-day callouts available.' : ''} ${provider.callout_fee_from ? `From £${provider.callout_fee_from} callout.` : ''}`

  return {
    title,
    description,
    keywords: `${provider.business_name}, appliance repair ${place.name}, washing machine repair ${place.name}, fridge repair ${place.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/provider/${provider.slug}/`,
      images: provider.cover_image_url
        ? [{ url: provider.cover_image_url, alt: provider.business_name }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/provider/${provider.slug}/`,
    },
    robots: {
      index: provider.is_indexable,
      follow: true,
    },
  }
}

/**
 * Provider Profile Page (Spec 11)
 *
 * Conversion destination for repair engineers.
 * URL: /provider/{slug}/
 */
export default async function ProviderProfilePage({ params }: Props) {
  const { slug } = await params

  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getProviderProfileDataSafe(slug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const {
    provider,
    place,
    country,
    categories,
    authorizedBrands,
    // reviews - TODO: Implement reviews display
    otherProviders,
  } = data

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ProviderBreadcrumbs
          country={country}
          city={place}
          providerName={provider.business_name}
        />
      </div>

      {/* Hero */}
      <ProviderHero provider={provider} cityName={place.name} />

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* About */}
            <ProviderAboutSection provider={provider} />

            {/* Services / Categories */}
            <ProviderServicesSection
              categories={categories}
              countrySlug={country.slug}
              citySlug={place.slug}
            />

            {/* Availability */}
            <ProviderAvailabilitySection provider={provider} />

            {/* Certifications */}
            <ProviderCertificationsSection provider={provider} />

            {/* Pricing */}
            <ProviderPricingSection provider={provider} />

            {/* Authorized Brands */}
            <ProviderBrandsSection brands={authorizedBrands} />

            {/* Other Providers */}
            <OtherProvidersSection
              providers={otherProviders}
              cityName={place.name}
              countrySlug={country.slug}
              citySlug={place.slug}
            />
          </main>

          {/* Contact Sidebar (Desktop) */}
          <ProviderContactSidebar provider={provider} />
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <ProviderMobileCTA
        phone={provider.phone}
        averageRating={provider.average_rating}
      />

      {/* Footer */}
      <Footer data={footerData} />

      {/* Add padding for mobile CTA */}
      <div className="lg:hidden h-20" />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
