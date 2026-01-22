import { Metadata } from 'next'
import { Footer } from '@/components/footer'
import {
  HeroSection,
  MarketPulse,
  GradeExplainer,
  DealAlertCTA,
  CategoriesSection,
  LocationNavigator,
  BenefitsSection,
  PopularBrands,
  RepairServicesCTA,
  FAQSection,
} from '@/components/homepage'
import { getFooterDataSafe } from '@/lib/footer/getFooterData'

/**
 * Homepage (Spec 12)
 *
 * Primary landing page with 12 sections:
 * 1. Navbar (in layout - no search on homepage)
 * 2. Hero (search + bento stats)
 * 3. Market Pulse (freshness signals)
 * 4. Grade Explainer (AEO-critical)
 * 5. Deal Alert CTA
 * 6. Categories
 * 7. Location Navigator
 * 8. Benefits
 * 9. Popular Brands
 * 10. Repair CTA
 * 11. FAQ
 * 12. Footer
 */

export const metadata: Metadata = {
  title: 'Graded Appliances UK | Find Discounted Washing Machines, Fridges & More Near You',
  description:
    'Compare 500+ verified stores selling graded, ex-display and factory seconds appliances across the UK. Save 30-70% on washing machines, fridge freezers, dishwashers and more. Full warranties included.',
}

// Revalidate homepage every hour
export const revalidate = 3600

export default async function HomePage() {
  // Fetch footer data
  const footerData = await getFooterDataSafe()

  // Stats for hero section
  const heroStats = {
    stores: footerData.stats.totalStores || 500,
    cities: 156,
    savings: '30-70%',
  }

  // Market pulse data (would come from database in production)
  const marketPulseData = {
    newStoresThisWeek: 89,
    trendingCity: 'Manchester',
    trendingGrowth: 15,
  }

  return (
    <>
      {/* Section 2: Hero */}
      <HeroSection stats={heroStats} />

      {/* Section 3: Market Pulse */}
      <MarketPulse
        newStoresThisWeek={marketPulseData.newStoresThisWeek}
        trendingCity={marketPulseData.trendingCity}
        trendingGrowth={marketPulseData.trendingGrowth}
      />

      {/* Section 4: Grade Explainer */}
      <GradeExplainer />

      {/* Section 5: Deal Alert CTA */}
      <DealAlertCTA />

      {/* Section 6: Categories */}
      <CategoriesSection categories={[]} />

      {/* Section 7: Location Navigator */}
      <LocationNavigator
        countries={footerData.countries.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          flagEmoji: c.flagEmoji,
        }))}
        cities={footerData.popularCities.map((city) => ({
          id: city.id,
          name: city.name,
          slug: city.slug,
          storeCount: 0, // Would come from database
          countrySlug: city.countrySlug,
        }))}
      />

      {/* Section 8: Benefits */}
      <BenefitsSection />

      {/* Section 9: Popular Brands */}
      <PopularBrands />

      {/* Section 10: Repair CTA */}
      <RepairServicesCTA />

      {/* Section 11: FAQ */}
      <FAQSection />

      {/* Section 12: Footer */}
      <Footer data={footerData} />
    </>
  )
}
