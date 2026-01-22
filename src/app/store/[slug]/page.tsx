import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getStoreProfileDataSafe } from '@/lib/data/getStoreProfileData'
import { Footer } from '@/components/footer'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'
import {
  StoreBreadcrumbs,
  StoreHero,
  StoreContactSidebar,
  StoreMobileCTA,
  StoreAboutSection,
  StoreCategoriesSection,
  StoreServicesSection,
  StoreBrandsSection,
  StoreReviewsSection,
  OtherStoresSection,
} from '@/components/store'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getStoreProfileDataSafe(slug)

  if (!data) {
    return {
      title: 'Store Not Found | UK Graded Appliances',
    }
  }

  const { store, place, country } = data

  const title =
    store.seo_title ||
    `${store.business_name} | Graded Appliances in ${place.name}`

  const description =
    store.seo_meta_description ||
    `${store.business_name} sells graded, ex-display and factory second appliances in ${place.name}, ${country.name}. ${store.warranty_months ? `${store.warranty_months}-month warranty.` : ''} ${store.offers_free_delivery ? 'Free delivery available.' : ''}`

  return {
    title,
    description,
    keywords: `${store.business_name}, graded appliances ${place.name}, ex-display appliances ${place.name}, factory seconds ${place.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/store/${store.slug}/`,
      images: store.cover_image_url
        ? [{ url: store.cover_image_url, alt: store.business_name }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/store/${store.slug}/`,
    },
    robots: {
      index: store.is_indexable,
      follow: true,
    },
  }
}

/**
 * Store Profile Page (Spec 06)
 *
 * Definitive landing page for each graded appliance retailer.
 * URL: /store/{slug}/
 */
export default async function StoreProfilePage({ params }: Props) {
  const { slug } = await params

  // Fetch all data in parallel
  const [data, footerData] = await Promise.all([
    getStoreProfileDataSafe(slug),
    getFooterDataSafe(),
  ])

  if (!data) {
    notFound()
  }

  const { store, place, country, categories, brands, reviews, otherStores } = data

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <StoreBreadcrumbs
          country={country}
          city={place}
          storeName={store.business_name}
        />
      </div>

      {/* Hero */}
      <StoreHero store={store} cityName={place.name} />

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* About */}
            <StoreAboutSection store={store} />

            {/* Categories */}
            <StoreCategoriesSection
              categories={categories}
              countrySlug={country.slug}
              citySlug={place.slug}
            />

            {/* Services */}
            <StoreServicesSection store={store} />

            {/* Brands */}
            <StoreBrandsSection brands={brands} />

            {/* Reviews */}
            <StoreReviewsSection
              reviews={reviews}
              averageRating={store.average_rating}
              reviewCount={store.review_count}
              storeName={store.business_name}
            />

            {/* Other Stores */}
            <OtherStoresSection
              stores={otherStores}
              cityName={place.name}
              countrySlug={country.slug}
              citySlug={place.slug}
            />
          </main>

          {/* Contact Sidebar (Desktop) */}
          <StoreContactSidebar store={store} />
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <StoreMobileCTA phone={store.phone} website={store.website} />

      {/* Footer */}
      <Footer data={footerData} />

      {/* Add padding for mobile CTA */}
      <div className="lg:hidden h-20" />
    </>
  )
}

// ISR: Revalidate every hour
export const revalidate = 3600
