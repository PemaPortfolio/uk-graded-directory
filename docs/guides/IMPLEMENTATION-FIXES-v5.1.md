# UK Graded Appliances — Implementation Fixes v5.1

**Purpose:** This document provides Claude Code with exact instructions to fix critical issues identified in the architectural audit.

**How to Use:** 
1. Upload this document FIRST to Claude Code
2. Work through each phase sequentially
3. Test after each phase before moving to the next
4. Do NOT attempt all phases in a single session

---

## Phase 1: Database Migration Safety (Do First)

### 1.1 Make Migration Idempotent

**File to modify:** `supabase-migration-v5-complete.sql`

**Problem:** Running the migration twice will fail.

**Instructions for Claude Code:**

```
TASK: Wrap all CREATE TYPE statements with existence checks.

FIND all lines like:
  CREATE TYPE xxx_enum AS ENUM (...);

REPLACE with:
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'xxx_enum') THEN
      CREATE TYPE xxx_enum AS ENUM (...);
    END IF;
  END $$;

ALSO: Change all CREATE TABLE to CREATE TABLE IF NOT EXISTS

ALSO: Change all INSERT INTO to INSERT INTO ... ON CONFLICT DO NOTHING
(for seed data like countries, grade_levels)
```

**Verification:** The migration should run successfully twice in a row without errors.

---

### 1.2 Add Missing Foreign Key Validation for Polymorphic Tables

**File to modify:** `supabase-migration-v5-complete.sql`

**Problem:** `click_events.subject_id` has no referential integrity.

**Add after the click_events table definition:**

```sql
-- Add check constraint for polymorphic reference validation
-- (Postgres doesn't support conditional FKs, so we use a trigger)

CREATE OR REPLACE FUNCTION validate_click_event_subject()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subject_type = 'store' AND NEW.subject_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM stores WHERE id = NEW.subject_id) THEN
      RAISE EXCEPTION 'Invalid store reference: %', NEW.subject_id;
    END IF;
  ELSIF NEW.subject_type = 'provider' AND NEW.subject_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM service_providers WHERE id = NEW.subject_id) THEN
      RAISE EXCEPTION 'Invalid provider reference: %', NEW.subject_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_click_event_subject_trigger
  BEFORE INSERT ON click_events
  FOR EACH ROW EXECUTE FUNCTION validate_click_event_subject();
```

---

### 1.3 Extend Slug Registry to Include Stores and Providers

**File to modify:** `supabase-migration-v5-complete.sql`

**Problem:** Store/provider slugs can collide with category/brand slugs.

**Find the slug_registry table and modify:**

```sql
-- Update entity_type to allow more types
-- In the slug_registry table definition, change:

CREATE TABLE public.slug_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('category', 'brand', 'store', 'provider')),
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add triggers for stores and providers (after their table definitions):

CREATE OR REPLACE FUNCTION register_store_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'store', NEW.id)
    ON CONFLICT (slug) DO NOTHING;
    
    IF NOT FOUND THEN
      -- Check if conflict exists
      IF EXISTS (SELECT 1 FROM slug_registry WHERE slug = NEW.slug AND entity_id != NEW.id) THEN
        RAISE EXCEPTION 'Slug "%" is already in use by another entity', NEW.slug;
      END IF;
    END IF;
  ELSIF TG_OP = 'UPDATE' AND NEW.slug != OLD.slug THEN
    UPDATE slug_registry SET slug = NEW.slug WHERE entity_id = OLD.id AND entity_type = 'store';
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'store';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER store_slug_registry_trigger
  AFTER INSERT OR UPDATE OR DELETE ON stores
  FOR EACH ROW EXECUTE FUNCTION register_store_slug();

-- Same pattern for service_providers
CREATE OR REPLACE FUNCTION register_provider_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'provider', NEW.id)
    ON CONFLICT (slug) DO NOTHING;
    
    IF NOT FOUND THEN
      IF EXISTS (SELECT 1 FROM slug_registry WHERE slug = NEW.slug AND entity_id != NEW.id) THEN
        RAISE EXCEPTION 'Slug "%" is already in use by another entity', NEW.slug;
      END IF;
    END IF;
  ELSIF TG_OP = 'UPDATE' AND NEW.slug != OLD.slug THEN
    UPDATE slug_registry SET slug = NEW.slug WHERE entity_id = OLD.id AND entity_type = 'provider';
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'provider';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER provider_slug_registry_trigger
  AFTER INSERT OR UPDATE OR DELETE ON service_providers
  FOR EACH ROW EXECUTE FUNCTION register_provider_slug();
```

---

## Phase 2: Security Fixes (Critical)

### 2.1 Fix Race Condition in Claim Approval

**File to modify:** `supabase-migration-v5-complete.sql`

**Find and REPLACE the entire `process_claim_approval()` function with:**

```sql
CREATE OR REPLACE FUNCTION process_claim_approval()
RETURNS TRIGGER AS $$
DECLARE
  v_current_owner_id UUID;
  v_lock_acquired BOOLEAN;
BEGIN
  -- Only process status changes to 'approved'
  IF NEW.status != 'approved' OR OLD.status != 'pending' THEN
    RETURN NEW;
  END IF;

  -- Step 1: Acquire advisory lock to prevent concurrent approvals
  IF NEW.subject_type = 'store' THEN
    v_lock_acquired := pg_try_advisory_xact_lock(
      hashtext('claim_store_' || NEW.store_id::text)
    );
  ELSE
    v_lock_acquired := pg_try_advisory_xact_lock(
      hashtext('claim_provider_' || NEW.provider_id::text)
    );
  END IF;

  IF NOT v_lock_acquired THEN
    RAISE EXCEPTION 'Another claim approval is in progress. Please try again.';
  END IF;

  -- Step 2: Double-check ownership with row-level lock
  IF NEW.subject_type = 'store' THEN
    SELECT owner_id INTO v_current_owner_id 
    FROM stores 
    WHERE id = NEW.store_id 
    FOR UPDATE;
    
    IF v_current_owner_id IS NOT NULL THEN
      NEW.status := 'rejected';
      NEW.rejection_reason := 'Store was claimed by another user during review';
      NEW.reviewed_at := NOW();
      RETURN NEW;
    END IF;
    
    UPDATE stores SET 
      owner_id = NEW.user_id,
      status = 'claimed',
      updated_at = NOW()
    WHERE id = NEW.store_id;
    
    UPDATE claims SET 
      status = 'rejected',
      rejection_reason = 'Another claim was approved first',
      reviewed_at = NOW()
    WHERE store_id = NEW.store_id 
      AND id != NEW.id 
      AND status = 'pending';
      
  ELSIF NEW.subject_type = 'provider' THEN
    SELECT owner_id INTO v_current_owner_id 
    FROM service_providers 
    WHERE id = NEW.provider_id 
    FOR UPDATE;
    
    IF v_current_owner_id IS NOT NULL THEN
      NEW.status := 'rejected';
      NEW.rejection_reason := 'Provider was claimed by another user during review';
      NEW.reviewed_at := NOW();
      RETURN NEW;
    END IF;
    
    UPDATE service_providers SET 
      owner_id = NEW.user_id,
      status = 'claimed',
      claimed_by_owner = true,
      updated_at = NOW()
    WHERE id = NEW.provider_id;
    
    UPDATE claims SET 
      status = 'rejected',
      rejection_reason = 'Another claim was approved first',
      reviewed_at = NOW()
    WHERE provider_id = NEW.provider_id 
      AND id != NEW.id 
      AND status = 'pending';
  END IF;

  NEW.reviewed_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 2.2 Add Rate Limiting to Click Events

**File to modify:** `supabase-migration-v5-complete.sql`

**Find the RLS policy for click_events and REPLACE:**

```sql
-- Remove the old permissive policy
DROP POLICY IF EXISTS "Anyone can log clicks" ON click_events;

-- Add rate-limited policy
CREATE POLICY "Rate limited click logging" ON click_events 
FOR INSERT WITH CHECK (
  -- Allow if fewer than 60 events per minute from this session
  (
    SELECT COUNT(*) FROM click_events 
    WHERE session_id = NEW.session_id 
    AND clicked_at > NOW() - INTERVAL '1 minute'
  ) < 60
  -- OR if no session_id (anonymous tracking)
  OR NEW.session_id IS NULL
);
```

---

### 2.3 Add Email Verification Fields to Claims

**File to modify:** `supabase-migration-v5-complete.sql`

**Find the claims table and ADD these columns:**

```sql
-- Add to claims table definition (before the CHECK constraint):
  verification_token UUID DEFAULT gen_random_uuid(),
  email_verified_at TIMESTAMPTZ,
  verification_sent_at TIMESTAMPTZ,
  verification_attempts INTEGER DEFAULT 0,
```

**Update the RLS policy for claims:**

```sql
-- Replace the claim creation policies with stricter ones
DROP POLICY IF EXISTS "Users create store claims" ON claims;
DROP POLICY IF EXISTS "Users create provider claims" ON claims;

-- New policy: Users can only create claims (email verification handled in app layer)
CREATE POLICY "Authenticated users can create claims" ON claims 
FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  business_email IS NOT NULL AND
  -- Cannot claim already-owned businesses
  CASE 
    WHEN subject_type = 'store' THEN 
      NOT EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id IS NOT NULL)
    WHEN subject_type = 'provider' THEN 
      NOT EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND owner_id IS NOT NULL)
    ELSE false
  END
);
```

---

## Phase 3: Performance Indexes

### 3.1 Add Composite Indexes for Common Queries

**File to modify:** `supabase-migration-v5-complete.sql`

**Add to Section 23 (Indexes):**

```sql
-- Composite index for city+category page queries (most common pattern)
CREATE INDEX IF NOT EXISTS idx_stores_place_active_featured 
ON stores (place_id, is_active, status, is_featured DESC, overall_score DESC)
WHERE is_active = true AND status IN ('active', 'claimed', 'verified');

-- Composite index for provider queries by coverage area
CREATE INDEX IF NOT EXISTS idx_provider_coverage_place_provider
ON provider_coverage_places (place_id, provider_id);

-- Composite index for category page with filters
CREATE INDEX IF NOT EXISTS idx_store_categories_cat_store
ON store_categories (category_id, store_id);

-- Reviews index for approved reviews by subject
CREATE INDEX IF NOT EXISTS idx_reviews_store_approved
ON reviews (store_id)
WHERE subject_type = 'store' AND status = 'approved';

CREATE INDEX IF NOT EXISTS idx_reviews_provider_approved
ON reviews (provider_id)
WHERE subject_type = 'provider' AND status = 'approved';

-- Click events index for analytics queries
CREATE INDEX IF NOT EXISTS idx_click_events_subject_date
ON click_events (subject_type, subject_id, clicked_at DESC);
```

---

## Phase 4: Spec Document Updates

### 4.1 Update 03-business-listing-claim-flow.md

**Add a new section after "Email Verification":**

```markdown
### Security: Claim Verification Process

#### Race Condition Protection
The claim approval process uses PostgreSQL advisory locks to prevent:
- Two admins approving different claims simultaneously
- Ownership being overwritten during concurrent approvals

#### Email Domain Verification (Phase 2)
Future enhancement: Verify that the claimant's business email domain matches the store/provider's registered email domain.

#### Rate Limiting
Claims are rate-limited to:
- 3 claims per user per day
- 1 claim per business per user
```

---

### 4.2 Update 02-search-bar-architecture.md

**Add to the "Error States" section:**

```markdown
### Error States Specification

| State | Trigger | UI Response |
|-------|---------|-------------|
| Loading | API call in progress | Skeleton loader in dropdown |
| Network Error | Fetch fails | "Unable to search. Check connection." + Retry button |
| Rate Limited | 429 response | "Too many searches. Wait a moment." |
| Empty Results | No matches | "No results for '{query}'" + Suggestions |
| Timeout | >5s response | "Search is taking longer than usual..." + Cancel button |

#### Retry Logic
```typescript
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok && retries > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchWithRetry(url, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}
```
```

---

### 4.3 Update 14-retail-category-page-v1.1.md

**Add to Section 13 (Testing Checklist):**

```markdown
### 13.6 Security Tests
- [ ] Cannot access other users' draft stores via URL manipulation
- [ ] Click events are rate-limited (max 60/minute/session)
- [ ] Store slugs cannot collide with category slugs
- [ ] Claim flow requires authentication
- [ ] Claim approval is atomic (no race conditions)

### 13.7 Error Handling Tests
- [ ] Network timeout shows retry UI
- [ ] Supabase 429 rate limit shows friendly message
- [ ] Empty results show alternative suggestions
- [ ] Partial data load shows available data + error for failed sections
```

---

## Phase 5: Count Reconciliation Job

### 5.1 Add Reconciliation Function

**File to modify:** `supabase-migration-v5-complete.sql`

**Add to Section 19 (Core Functions):**

```sql
-- Reconciliation function to fix any count drift
CREATE OR REPLACE FUNCTION reconcile_entity_counts()
RETURNS TABLE (
  entity_type TEXT,
  entity_id UUID,
  old_count INTEGER,
  new_count INTEGER
) AS $$
BEGIN
  -- Reconcile place store counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT 
      p.id,
      COUNT(s.id) FILTER (WHERE s.is_active = true AND s.status IN ('active', 'claimed', 'verified')) as actual_store_count
    FROM places p
    LEFT JOIN stores s ON s.place_id = p.id
    GROUP BY p.id
  )
  UPDATE places p
  SET store_count = ac.actual_store_count
  FROM actual_counts ac
  WHERE p.id = ac.id AND p.store_count != ac.actual_store_count
  RETURNING 'place_store'::TEXT, p.id, p.store_count, ac.actual_store_count;

  -- Reconcile place provider counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT 
      p.id,
      COUNT(DISTINCT pcp.provider_id) as actual_provider_count
    FROM places p
    LEFT JOIN provider_coverage_places pcp ON pcp.place_id = p.id
    LEFT JOIN service_providers sp ON sp.id = pcp.provider_id 
      AND sp.is_active = true 
      AND sp.status IN ('active', 'claimed', 'verified')
    GROUP BY p.id
  )
  UPDATE places p
  SET provider_count = ac.actual_provider_count
  FROM actual_counts ac
  WHERE p.id = ac.id AND p.provider_count != ac.actual_provider_count
  RETURNING 'place_provider'::TEXT, p.id, p.provider_count, ac.actual_provider_count;

  -- Reconcile country counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT 
      c.id,
      COALESCE(SUM(p.store_count), 0)::INTEGER as actual_store_count,
      COALESCE(SUM(p.provider_count), 0)::INTEGER as actual_provider_count
    FROM countries c
    LEFT JOIN places p ON p.country_id = c.id
    GROUP BY c.id
  )
  UPDATE countries c
  SET 
    store_count = ac.actual_store_count,
    provider_count = ac.actual_provider_count
  FROM actual_counts ac
  WHERE c.id = ac.id 
    AND (c.store_count != ac.actual_store_count OR c.provider_count != ac.actual_provider_count)
  RETURNING 'country'::TEXT, c.id, c.store_count, ac.actual_store_count;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION reconcile_entity_counts TO authenticated;

COMMENT ON FUNCTION reconcile_entity_counts IS 
'Run weekly via cron or manually after bulk imports. Returns rows that were corrected.';
```

---

## Verification Checklist

After each phase, verify:

### Phase 1 Verification
```sql
-- Test idempotency: Run migration twice
-- Should complete without errors

-- Test slug collision prevention
INSERT INTO stores (name, slug, ...) VALUES ('Test', 'washing-machines', ...);
-- Should fail: "Slug is already in use"
```

### Phase 2 Verification
```sql
-- Test rate limiting
-- Insert 61 click events with same session_id in < 1 minute
-- 61st should fail

-- Test claim locking
-- Simulate concurrent approvals (requires two connections)
```

### Phase 3 Verification
```sql
-- Check indexes exist
SELECT indexname FROM pg_indexes WHERE tablename = 'stores';
-- Should include: idx_stores_place_active_featured

-- Check query plan uses index
EXPLAIN ANALYZE SELECT * FROM stores 
WHERE place_id = '...' AND is_active = true 
ORDER BY is_featured DESC, overall_score DESC;
-- Should show "Index Scan"
```

---

## Files Modified Summary

| File | Phases |
|------|--------|
| `supabase-migration-v5-complete.sql` | 1, 2, 3, 5 |
| `03-business-listing-claim-flow.md` | 4 |
| `02-search-bar-architecture.md` | 4 |
| `14-retail-category-page-v1.1.md` | 4 |

---

## Claude Code Session Plan

**Session 1:** Phase 1 (Migration Safety) — ~30 minutes
**Session 2:** Phase 2 (Security Fixes) — ~45 minutes  
**Session 3:** Phase 3 + 5 (Performance) — ~20 minutes
**Session 4:** Phase 4 (Spec Updates) — ~30 minutes

Do NOT attempt all phases in one session.
