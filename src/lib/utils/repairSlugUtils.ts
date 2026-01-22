/**
 * Utility functions for repair slug handling
 * These are pure functions that can be used in both client and server components
 */

// Mapping from repair slug to category slug
export const REPAIR_SLUG_MAPPINGS: Record<string, string> = {
  'washing-machine': 'washing-machines',
  'fridge-freezer': 'fridge-freezers',
  'american-fridge-freezer': 'american-fridge-freezers',
  'dishwasher': 'dishwashers',
  'tumble-dryer': 'tumble-dryers',
  'tv': 'televisions',
  'television': 'televisions',
  'oven': 'built-in-ovens',
  'range-cooker': 'range-cookers',
  'hob': 'hobs',
  'freezer': 'freezers',
  'washer-dryer': 'washer-dryers',
  'microwave': 'microwaves',
  'cooker-hood': 'cooker-hoods',
  'cooker': 'cookers',
}

/**
 * Check if a slug is a repair slug (ends with -repair)
 */
export function isRepairSlug(slug: string): boolean {
  return slug.endsWith('-repair')
}

/**
 * Get the repair slug from a category name
 * e.g., "Washing Machine" -> "washing-machine-repair"
 */
export function getRepairSlug(nameSingular: string): string {
  return nameSingular.toLowerCase().replace(/\s+/g, '-') + '-repair'
}

/**
 * Parse category slug from repair URL
 * e.g., "washing-machine-repair" -> "washing-machines"
 */
export function parseCategoryFromRepairSlug(repairSlug: string): string {
  const slug = repairSlug.replace(/-repair$/, '')
  return REPAIR_SLUG_MAPPINGS[slug] || slug + 's'
}
