import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGuideDataSafe } from '@/lib/data/getGuideData'
import GuidesBreadcrumbs from '@/components/guides/GuidesBreadcrumbs'
import GuideContent from '@/components/guides/GuideContent'
import RelatedGuides from '@/components/guides/RelatedGuides'

interface PageProps {
  params: Promise<{ slug: string }>
}

// We use dynamic rendering for guides since generateStaticParams
// would require calling Supabase outside of request context
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getGuideDataSafe(slug)

  if (!data) {
    return {
      title: 'Guide Not Found | UK Graded Appliances Directory',
    }
  }

  const { guide } = data

  return {
    title: `${guide.title} | UK Graded Appliances Directory`,
    description: guide.excerpt || `Read our guide on ${guide.title.toLowerCase()}`,
    openGraph: {
      title: guide.title,
      description: guide.excerpt || `Read our guide on ${guide.title.toLowerCase()}`,
      type: 'article',
      url: `/guides/${guide.slug}/`,
      images: guide.featured_image_url ? [{ url: guide.featured_image_url }] : undefined,
      publishedTime: guide.published_at || undefined,
      modifiedTime: guide.updated_at,
    },
    alternates: {
      canonical: `/guides/${guide.slug}/`,
    },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const data = await getGuideDataSafe(slug)

  if (!data) {
    notFound()
  }

  const { guide, relatedGuides } = data

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <GuidesBreadcrumbs guide={guide} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <GuideContent guide={guide} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <RelatedGuides guides={relatedGuides} />
            </div>
          </aside>
        </div>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.excerpt,
            image: guide.featured_image_url,
            datePublished: guide.published_at,
            dateModified: guide.updated_at,
            author: {
              '@type': 'Organization',
              name: 'UK Graded Appliances Directory',
              url: 'https://ukgradedappliances.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'UK Graded Appliances Directory',
              url: 'https://ukgradedappliances.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://ukgradedappliances.com/guides/${guide.slug}/`,
            },
            articleSection: guide.category?.name,
          }),
        }}
      />
    </>
  )
}
