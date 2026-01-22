/**
 * Schema.org AggregateRating Builder (Spec 21)
 *
 * Builds structured data for search engine rich snippets.
 * Only include AggregateRating if there's actual rating data.
 */

import type { AggregateRatingSchema } from '@/types/reviews'

/**
 * Build Schema.org AggregateRating object
 *
 * @param averageRating - Average rating (0-5)
 * @param reviewCount - Total number of reviews
 * @returns AggregateRating schema or undefined if no data
 *
 * @example
 * const schema = {
 *   '@context': 'https://schema.org',
 *   '@type': 'LocalBusiness',
 *   name: 'Best Graded Appliances',
 *   aggregateRating: buildAggregateRating(4.8, 127),
 * }
 */
export function buildAggregateRating(
  averageRating: number | null,
  reviewCount: number
): AggregateRatingSchema | undefined {
  // Only include if we have a valid rating
  if (!averageRating || averageRating === 0) {
    return undefined
  }

  return {
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: String(reviewCount || 0),
    bestRating: '5',
    worstRating: '1',
  }
}

/**
 * Build a complete LocalBusiness schema with rating
 *
 * @example
 * const schema = buildLocalBusinessSchema({
 *   name: 'Best Graded Appliances',
 *   url: 'https://ukgradedappliances.co.uk/store/best-graded/',
 *   address: { ... },
 *   averageRating: 4.8,
 *   reviewCount: 127,
 * })
 */
export interface LocalBusinessSchemaParams {
  id?: string
  name: string
  description?: string
  url: string
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality: string
    postalCode?: string
    addressCountry?: string
  }
  averageRating: number | null
  reviewCount: number
  image?: string
}

export function buildLocalBusinessSchema(params: LocalBusinessSchemaParams) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: params.name,
    url: params.url,
  }

  if (params.id) {
    schema['@id'] = params.id
  }

  if (params.description) {
    schema.description = params.description
  }

  if (params.telephone) {
    schema.telephone = params.telephone
  }

  if (params.image) {
    schema.image = params.image
  }

  if (params.address) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: params.address.addressLocality,
      addressCountry: params.address.addressCountry || 'GB',
      ...(params.address.streetAddress && {
        streetAddress: params.address.streetAddress,
      }),
      ...(params.address.postalCode && {
        postalCode: params.address.postalCode,
      }),
    }
  }

  const aggregateRating = buildAggregateRating(
    params.averageRating,
    params.reviewCount
  )
  if (aggregateRating) {
    schema.aggregateRating = aggregateRating
  }

  return schema
}

/**
 * Build a HomeAndConstructionBusiness schema for providers
 */
export interface ProviderSchemaParams extends LocalBusinessSchemaParams {
  areaServed?: string
}

export function buildProviderSchema(params: ProviderSchemaParams) {
  const schema = buildLocalBusinessSchema(params)
  schema['@type'] = 'HomeAndConstructionBusiness'

  if (params.areaServed) {
    schema.areaServed = {
      '@type': 'City',
      name: params.areaServed,
    }
  }

  return schema
}
