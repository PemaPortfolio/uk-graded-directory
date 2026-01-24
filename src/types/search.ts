/**
 * Search Types (Phase 2)
 * Types for location input, autocomplete, and search suggestions
 */

export interface SelectedPlace {
  id: string
  name: string
  slug: string
  countrySlug: string
  adminArea: string | null
}

export interface CategorySuggestion {
  name: string
  slug: string
  icon: string | null
}

export interface PlaceSuggestion {
  name: string
  slug: string
  countrySlug: string
  adminArea?: string | null
}

export interface BrandSuggestion {
  name: string
  slug: string
}

export interface KeywordSuggestions {
  categories: CategorySuggestion[]
  brands: BrandSuggestion[]
  places: PlaceSuggestion[]
}

export interface SearchSuggestionsResponse {
  places: PlaceSuggestion[]
  categories: CategorySuggestion[]
  brands: BrandSuggestion[]
}
