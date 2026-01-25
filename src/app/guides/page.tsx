import { Suspense } from 'react'
import { Metadata } from 'next'
import { getGuidesIndexDataSafe } from '@/lib/data/getGuidesIndexData'
import GuidesHero from '@/components/guides/GuidesHero'
import GuidesBreadcrumbs from '@/components/guides/GuidesBreadcrumbs'
import GuideCategories from '@/components/guides/GuideCategories'
import GuideCard from '@/components/guides/GuideCard'

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const categorySlug = params.category
  const data = await getGuidesIndexDataSafe(categorySlug)

  const categoryName = categorySlug
    ? data?.categories.find(c => c.slug === categorySlug)?.name
    : null

  const title = categoryName
    ? `${categoryName} | Guides | UK Graded Appliances Directory`
    : 'Guides & Resources | UK Graded Appliances Directory'

  const description = categoryName
    ? `Browse our ${categoryName.toLowerCase()} for graded appliances - expert advice on buying, grades, repairs, and finding the best deals.`
    : 'Expert guides on buying graded appliances, understanding grade levels, repair vs replace decisions, and finding the best deals in the UK.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: categorySlug ? `/guides/?category=${categorySlug}` : '/guides/',
    },
    alternates: {
      canonical: categorySlug ? `/guides/?category=${categorySlug}` : '/guides/',
    },
  }
}

async function GuidesContent({ categorySlug }: { categorySlug?: string }) {
  const data = await getGuidesIndexDataSafe(categorySlug)

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Unable to load guides. Please try again later.
        </p>
      </div>
    )
  }

  const { guides, categories, featuredGuides } = data
  const activeCategoryName = categorySlug
    ? categories.find(c => c.slug === categorySlug)?.name
    : null

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <GuidesBreadcrumbs categoryName={activeCategoryName ?? undefined} />
      </div>

      {/* Hero */}
      <GuidesHero />

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-10" />}>
            <GuideCategories categories={categories} />
          </Suspense>
        </div>

        {/* Featured Guides (only show on "All" view) */}
        {!categorySlug && featuredGuides.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Featured Guides
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {categorySlug ? activeCategoryName : 'All Guides'}
          </h2>

          {guides.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No guides found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: categorySlug ? `${activeCategoryName} Guides` : 'Guides & Resources',
            description: 'Expert guides on buying graded appliances and finding repair services.',
            url: categorySlug
              ? `https://ukgradedappliances.com/guides/?category=${categorySlug}`
              : 'https://ukgradedappliances.com/guides/',
            isPartOf: {
              '@type': 'WebSite',
              name: 'UK Graded Appliances Directory',
              url: 'https://ukgradedappliances.com',
            },
          }),
        }}
      />
    </>
  )
}

export default async function GuidesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categorySlug = params.category

  return <GuidesContent categorySlug={categorySlug} />
}
