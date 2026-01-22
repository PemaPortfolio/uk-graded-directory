/**
 * Business Types (Spec 03)
 *
 * TypeScript types for business add/claim flow.
 */

// Business type enum
export type BusinessType = 'store' | 'provider'

// Claim subject type
export type ClaimSubjectType = 'store' | 'provider'

// Verification method
export type VerificationMethod = 'email' | 'phone' | 'manual'

// Claim status
export type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'expired'

// Business status
export type BusinessStatus = 'pending' | 'active' | 'claimed' | 'verified' | 'suspended'

// Warranty type enum
export type WarrantyType = 'retailer' | 'manufacturer' | 'both'

// Response time enum
export type ResponseTime = 'same_day' | 'next_day' | '2_3_days' | 'within_week'

// Grade level enum
export type GradeLevel = 'tatty-packaging' | 'A-grade' | 'B-grade' | 'C-grade' | 'mixed'

// Operating hours for a single day
export interface DayHours {
  open: string | null
  close: string | null
  breakStart?: string | null
  breakEnd?: string | null
}

// Operating hours for all days
export interface OperatingHours {
  monday: DayHours | null
  tuesday: DayHours | null
  wednesday: DayHours | null
  thursday: DayHours | null
  friday: DayHours | null
  saturday: DayHours | null
  sunday: DayHours | null
}

// Store form data - Step 1
export interface StoreStep1Data {
  business_name: string
  trading_name?: string
  address_line1: string
  address_line2?: string
  city_name: string
  postcode: string
  county?: string
  place_id?: string
}

// Store form data - Step 2
export interface StoreStep2Data {
  phone: string
  email: string
  website?: string
  google_maps_url?: string
  facebook_url?: string
}

// Store form data - Step 3
export interface StoreStep3Data {
  operating_hours: OperatingHours
}

// Store form data - Step 4
export interface StoreStep4Data {
  category_ids: string[]
  grades_stocked: GradeLevel[]
  brand_ids?: string[]
}

// Store form data - Step 5
export interface StoreStep5Data {
  warranty_months?: number
  warranty_type?: WarrantyType
  offers_installation: boolean
  offers_free_installation?: boolean
  installation_cost?: number
  offers_same_day_delivery: boolean
  offers_repair_service: boolean
  description: string
}

// Complete store form data
export interface StoreFormData extends StoreStep1Data, StoreStep2Data, StoreStep3Data, StoreStep4Data, StoreStep5Data {}

// Provider form data - Step 1 (same as store)
export interface ProviderStep1Data {
  name: string
  trading_name?: string
  address_line1: string
  address_line2?: string
  city_name: string
  postcode: string
  county?: string
  place_id?: string
}

// Provider form data - Step 2 (same as store)
export interface ProviderStep2Data {
  phone: string
  email: string
  website?: string
  google_maps_url?: string
  facebook_url?: string
}

// Provider form data - Step 3 (same as store)
export interface ProviderStep3Data {
  operating_hours: OperatingHours
}

// Provider form data - Step 4
export interface ProviderStep4Data {
  category_ids: string[]
  coverage_radius?: number
  coverage_place_ids?: string[]
  services_all_brands: boolean
  brand_ids?: string[]
}

// Provider form data - Step 5
export interface ProviderStep5Data {
  callout_fee_from?: number
  callout_fee_to?: number
  no_fix_no_fee: boolean
  free_quotes: boolean
  offers_same_day: boolean
  offers_next_day: boolean
  offers_emergency: boolean
  offers_weekend: boolean
  offers_evening: boolean
  typical_response_time?: ResponseTime
  gas_safe_registered: boolean
  gas_safe_number?: string
  fgas_certified: boolean
  which_trusted_trader: boolean
  checkatrade_member: boolean
  checkatrade_id?: string
  trustatrader_member: boolean
  public_liability_insurance: boolean
  insurance_amount?: number
  warranty_on_repairs_months?: number
  warranty_on_parts_months?: number
  uses_genuine_parts: boolean
  description: string
}

// Complete provider form data
export interface ProviderFormData extends ProviderStep1Data, ProviderStep2Data, ProviderStep3Data, ProviderStep4Data, ProviderStep5Data {}

// Business search result
export interface BusinessSearchResult {
  id: string
  type: BusinessType
  name: string
  address: string
  postcode: string
  rating?: number
  reviewCount?: number
  status: BusinessStatus
  isClaimed: boolean
}

// Lookup form data
export interface LookupFormData {
  postcode: string
  businessName: string
}

// Claim data
export interface ClaimData {
  id: string
  businessId: string
  businessType: BusinessType
  businessName: string
  verificationMethod?: VerificationMethod
  maskedEmail?: string
  maskedPhone?: string
  codeExpiresAt?: string
  attempts: number
}

// Category (from database)
export interface ApplianceCategory {
  id: string
  name: string
  slug: string
  tier: 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary'
  parentId?: string
}

// Grouped categories for display
export interface CategoryGroup {
  name: string
  categories: ApplianceCategory[]
}

// Brand (from database)
export interface Brand {
  id: string
  name: string
  slug: string
  tier: 'premium' | 'mid_range' | 'value'
}

// Place (from database)
export interface Place {
  id: string
  name: string
  slug: string
  postcode?: string
  adminAreaId: string
  adminAreaName: string
}

// Form step info
export interface FormStep {
  number: number
  title: string
  description?: string
}

// Form validation error
export interface ValidationError {
  field: string
  message: string
}

// API response types
export interface LookupResponse {
  matches: BusinessSearchResult[]
  total: number
}

export interface ClaimInitResponse {
  claimId: string
  methods: {
    type: VerificationMethod
    masked?: string
    available: boolean
  }[]
}

export interface SendCodeResponse {
  success: boolean
  expiresAt?: string
  error?: string
}

export interface VerifyCodeResponse {
  success: boolean
  token?: string
  error?: string
}

export interface SubmissionResponse {
  success: boolean
  submissionId?: string
  errors?: ValidationError[]
}

// Session storage key
export const BUSINESS_FORM_STORAGE_KEY = 'uk-graded-business-form'
