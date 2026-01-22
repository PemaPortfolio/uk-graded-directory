---
name: nextjs-code-review
description: Multi-perspective code review for Next.js 16.1, React 19.2, TypeScript 5, Tailwind CSS 4, Supabase, and Vercel applications. Use when reviewing code, PRs, pull requests, architecture decisions, security audits, accessibility checks, or evaluating code quality and performance. Covers six expert perspectives: Senior Developer, System Architect, Product Manager, UX Designer, QA Engineer, and Business Analyst.
---

# Multi-Perspective Next.js Code Review Skill

**Version:** 2.0 (January 2026)  
**Target Stack:** Next.js 16.1 · React 19.2 · TypeScript 5 · Tailwind CSS 4 · Supabase · Vercel  
**Purpose:** Production-grade code review framework for enterprise Next.js applications

---

## Overview

This skill enables systematic, world-class code review for Next.js applications through six expert perspectives. It examines projects top-down, allocating appropriate time at each abstraction level while incorporating insights from: **Senior Developer**, **System Architect**, **Product Manager**, **UX Designer**, **QA Engineer**, and **Business Analyst**.

The 2026 development landscape represents a fundamental shift: we have moved beyond manual optimization into an era of **compiler-driven performance** and **explicit architectural caching**. The React Compiler handles memoization automatically, Turbopack delivers sub-second builds, and Next.js 16.1's "Default Dynamic" paradigm inverts previous caching mental models entirely.

---

## Part 1: Tech Stack Standards and Architecture Patterns

### 1.1 Next.js 16.1 App Router Architecture

#### The Default Dynamic Paradigm (CRITICAL MENTAL MODEL SHIFT)

**This is the most significant architectural change in Next.js 16.1.** Previous versions cached `fetch` requests by default, causing stale data bugs that forced developers to add `export const dynamic = 'force-dynamic'` everywhere. Next.js 16.1 **inverts this completely**:

| Aspect | Next.js 14 (Legacy) | Next.js 16.1 (Current) |
|--------|---------------------|------------------------|
| **Default behavior** | Caches fetch by default | **Dynamic by default** |
| **Review question** | "Did we disable caching for authenticated users?" | **"Did we ENABLE caching with `use cache`?"** |
| **Granularity** | Route segment (`revalidate`) | Component/function level (`use cache`) |
| **Configuration** | `export const revalidate = 60` | `cacheLife('profile')` semantic profiles |
| **Invalidation** | `revalidatePath` | `expireTag`, `revalidateTag` (prefer tag-based) |

**Reviewer must ask:** "Has `use cache` been applied to expensive data visualizations and read-heavy components?"

#### Turbopack: Production-Ready Implications

Turbopack (Rust-based) is now the default bundler, delivering 5-10x faster refresh and 2-5x faster builds through persistent caching and incremental architecture.

**Critical review patterns for Turbopack:**

- **Barrel files defeat caching:** `index.ts` files that re-export entire subtrees force Turbopack to invalidate large cache swaths. Flag these for refactoring.
- **Circular dependencies:** While handled faster than Webpack, they still defeat granular caching. Use the Next.js Bundle Analyzer to trace.
- **Direct imports:** Verify imports are direct (`import { Button } from '@/components/ui/Button'`) not via barrel (`import { Button } from '@/components'`).
- **Module graph focus:** The review focus shifts from "bundle size optimization" to "module graph relationships."

#### Server Components vs Client Components Decision Framework

| Use Server Components When | Use Client Components When |
|---------------------------|----------------------------|
| Fetching data close to database | Using state (`useState`, `useReducer`) |
| Accessing secrets/API keys | Attaching event handlers (`onClick`, `onChange`) |
| Keeping large dependencies server-side | Using browser APIs (`localStorage`, `window`) |
| Reducing client JavaScript bundle | Implementing lifecycle effects (`useEffect`) |

**Critical architectural constraint:** Push Client Components to the "leaves" of your component tree. Only add `'use client'` at boundaries where server-to-client transition must occur. Server Components can import and render Client Components, but **not vice versa**.

**Bundle leak detection:** A Client Component importing a Server Component library forces that library into the client bundle, negating RSC benefits. Use Next.js Bundle Analyzer to spot these leaks.

#### Partial Pre-Rendering (PPR)

PPR combines static and dynamic content, sending the static shell immediately while streaming dynamic holes (wrapped in `<Suspense>`) later.

**PPR Review Requirements:**

| Check | Requirement | Severity |
|-------|-------------|----------|
| Suspense boundaries | Every async Server Component fetching data must be wrapped in `<Suspense>` | BLOCKER |
| Root layout purity | `layout.tsx` must remain static—no `cookies()` or dynamic headers without Suspense wrapping | BLOCKER |
| Static shell verification | Developers should provide screenshots of the dev static/dynamic indicator | Major |

**Root Layout Purity Rule:** If a developer introduces a dynamic header read (e.g., `cookies()`) in the root layout without wrapping dependent UI in Suspense, the **entire route falls back to dynamic rendering**. This is a critical performance regression.

#### Canonical Project Structure

```
app/
├── (marketing)/              # Route group (no URL impact)
│   ├── about/page.tsx
│   └── blog/page.tsx
├── dashboard/
│   ├── layout.tsx            # Nested layout
│   ├── loading.tsx           # Suspense boundary (skeleton)
│   ├── error.tsx             # Error boundary
│   └── settings/page.tsx
├── api/                      # Route handlers
├── actions/                  # Server Actions (centralized)
│   └── payment.ts
components/
├── ui/                       # Reusable primitives (design system)
└── features/                 # Feature-specific components
lib/
├── dal/                      # Data Access Layer (REQUIRED)
│   ├── users.ts
│   └── products.ts
├── supabase/
│   ├── client.ts             # Browser client
│   └── server.ts             # Server client (per-request)
├── validators/               # Zod schemas
│   └── payment.ts
hooks/                        # Custom React hooks
types/                        # TypeScript type definitions
```

#### Special Files Hierarchy

| File | Purpose | Review Focus |
|------|---------|--------------|
| `layout.tsx` | Shared UI, nested layouts | Must remain static for PPR |
| `page.tsx` | Route content | Server Component by default |
| `loading.tsx` | Suspense fallback | Must match final content layout (CLS) |
| `error.tsx` | Error boundary | Must have recovery path |
| `not-found.tsx` | 404 handling | SEO-appropriate messaging |
| `route.ts` | API endpoints | Auth checks, input validation |

#### Caching Strategy with `use cache` and `cacheLife`

```typescript
// next.config.ts - Define semantic cache profiles
export default {
  experimental: {
    cacheLife: {
      'product-catalog': { stale: 300, revalidate: 600, expire: 3600 },
      'user-settings': { stale: 60, revalidate: 120, expire: 300 },
      'static-content': { stale: 86400, revalidate: 86400, expire: 604800 },
    }
  }
}
```

```typescript
// Usage in components
'use cache'
import { cacheLife, cacheTag } from 'next/cache'

async function ProductList() {
  cacheLife('product-catalog')
  cacheTag('products')
  const products = await db.products.findMany()
  return <ProductGrid products={products} />
}
```

**Caching Decision Matrix:**

| Use Case | Solution | Pattern |
|----------|----------|---------|
| Global static content (footer, nav) | Cache Component | `use cache` at component level |
| Public database query (blog list) | Memoized function | `use cache` at function level |
| User-specific data (profile) | Private cache | `use cache` + `cacheTag('user-${id}')` |
| High-frequency realtime (stock price) | No cache | Default dynamic or `no-store` |
| Expensive computation (report) | Long-lived cache | `use cache` + `cacheLife('long-lived')` |

---

### 1.2 React 19.2 Features and Patterns

#### The React Compiler: Automatic Memoization

The React Compiler is now stable and **automatically handles memoization**. This fundamentally changes code review focus.

**Critical shift:** The presence of `useMemo` or `useCallback` in a codebase using the React Compiler is now considered **"Legacy Optimization Debt"**—a code smell that clutters code and may conflict with compiler optimization.

| Old Review Question | New Review Question |
|---------------------|---------------------|
| "Did you memoize this prop?" | "Is this component pure?" |
| "Are dependency arrays correct?" | "Are there side effects disguised as render logic?" |

**Valid exception:** Interfacing with legacy third-party libraries requiring strict referential equality that aren't compiled.

**Verify compiler configuration:**
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
}
```

#### The `<Activity>` Component: Managing Offscreen State

The `<Activity>` component (formerly "Offscreen") enables "instant" tab switching by preserving state while visually hiding content.

```tsx
import { Activity } from 'react'

function TabbedInterface({ activeTab }) {
  return (
    <>
      <Activity mode={activeTab === 'dashboard' ? 'visible' : 'hidden'}>
        <Dashboard />
      </Activity>
      <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
        <Settings />
      </Activity>
    </>
  )
}
```

**Review checklist for `<Activity>`:**

| Check | Concern | Severity |
|-------|---------|----------|
| Mode handling | Correctly toggled between `visible` and `hidden` | Major |
| Memory impact | Heavy DOM trees (10,000+ rows) keep Fiber tree in memory | Major |
| Effect cleanup | Subscriptions/timers must stop when hidden (`<Activity>` unmounts effects) | BLOCKER |
| Background assumptions | Code relying on "always mounted" hidden divs (CSS) will break | Major |

#### `useEffectEvent`: Solving Stale Closures

`useEffectEvent` creates stable functions with access to latest props/state without re-running effects.

```typescript
// ✅ Correct pattern
const onMessage = useEffectEvent((msg: Message) => {
  // Reads fresh 'theme' without triggering effect re-run
  logMessage(msg, theme)
  showToast(msg.content)
})

useEffect(() => {
  socket.on('message', onMessage)
  return () => socket.off('message', onMessage)
}, [socket]) // 'onMessage' is stable and correctly omitted
```

**Critical rules:**
1. Use for "event-like" logic inside effects (logging, analytics, toasts)
2. **NEVER pass `useEffectEvent` functions as props to children**—they are NOT stable across renders like `useCallback`; they're tied to the specific effect cycle

#### The `use` Hook and Async Data

The `use` hook simplifies promise handling by unwrapping promises directly in render phase.

```typescript
function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise) // Suspends until resolved
  return comments.map(c => <Comment key={c.id} {...c} />)
}
```

**Review requirements:**

| Check | Issue | Severity |
|-------|-------|----------|
| Suspense boundary exists | `use(promise)` without parent `<Suspense>` causes unhandled suspension | BLOCKER |
| Promise creation location | Promises must be created outside render cycle (Server Component or memoized) | BLOCKER |
| Infinite loop prevention | New promise in render → re-render → new promise is fatal | BLOCKER |

#### Form Handling with Server Actions

```typescript
// Using useActionState for form submission
'use client'
import { useActionState } from 'react'
import { submitForm } from '@/app/actions/form'

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null)
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  )
}
```

```typescript
// Using useOptimistic for instant feedback
const [optimisticItems, addOptimisticItem] = useOptimistic(
  items,
  (state, newItem) => [...state, { ...newItem, pending: true }]
)
```

---

### 1.3 TypeScript 5 Strict Mode Configuration

**Required `tsconfig.json` for enterprise applications:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true
  }
}
```

#### Discriminated Unions Over Boolean Flags (CRITICAL)

```typescript
// ✅ EXCELLENT: Impossible states are impossible
type ApiResponse<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// Usage with exhaustive checking
function renderState<T>(state: ApiResponse<T>) {
  switch (state.status) {
    case 'idle': return <IdleView />
    case 'loading': return <Skeleton />
    case 'success': return <DataView data={state.data} />
    case 'error': return <ErrorView error={state.error} />
    // TypeScript ensures all cases handled
  }
}

// ❌ BAD: Can represent impossible states (loading AND error simultaneously)
interface BadState<T> {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data?: T
  error?: Error
}
```

**Review rule:** Reject `isLoading`, `isSuccess`, `isError` boolean flags in favor of `status: 'loading' | 'success' | 'error'` unions.

#### Component Props Typing

```typescript
// ✅ Correct: Extend HTML attributes, explicit children
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

// ✅ Correct: Polymorphic component typing
type PolymorphicProps<E extends React.ElementType> = {
  as?: E
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children'>
```

#### Type Guards with Zod

```typescript
import { z } from 'zod'

// Define schema once, derive type
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.coerce.date(),
})

type User = z.infer<typeof UserSchema>

// Use in Server Actions
export async function updateUser(formData: FormData) {
  'use server'
  const result = UserSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { error: result.error.flatten() }
  }
  // result.data is fully typed User
}
```

---

### 1.4 Tailwind CSS 4 Patterns

Tailwind CSS 4 (January 2025) delivers **3.5-5x faster builds** through the Rust-powered Oxide engine and introduces **CSS-first configuration**.

#### CSS-First Configuration (2026 Standard)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary-50: oklch(0.97 0.02 250);
  --color-primary-500: oklch(0.55 0.2 250);
  --color-primary-900: oklch(0.25 0.15 250);
  
  /* Typography */
  --font-display: "Cal Sans", "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
  
  /* Spacing */
  --spacing-page: 1.5rem;
  --spacing-section: 4rem;
  
  /* Breakpoints */
  --breakpoint-xs: 475px;
}

/* Dark mode with class strategy */
@custom-variant dark (&:is(.dark *));
```

**Review implications:** Flag presence of `tailwind.config.js` in new projects as legacy. CSS variables enable runtime theming without build-step overhead.

#### Container Queries for Modular Components

```tsx
// Components style based on container, not viewport
function ProductCard() {
  return (
    <div className="@container">
      <div className="@sm:flex @sm:gap-4">
        <img className="@sm:w-1/3" src={image} alt={name} />
        <div className="@sm:w-2/3">
          <h3 className="@lg:text-xl">{name}</h3>
          <p className="@md:line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  )
}
```

**Review rule:** In `components/features/`, prefer `@container` over `@media` for truly modular, reusable components.

---

### 1.5 Supabase Integration Architecture

#### Mandatory Client Segregation (CRITICAL SECURITY)

**NEVER share clients between server and browser contexts.** Using a singleton Supabase client in Node.js leads to **"Session Leaking"**—where User A's request receives User B's data because the auth token was overwritten.

```typescript
// lib/supabase/server.ts - Per-request server client
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

```typescript
// lib/supabase/client.ts - Browser client (singleton OK here)
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Review requirement:** Verify server client is instantiated per-request using `cookies()` API—no singletons. Severity: **BLOCKER**.

#### Auth Verification Pattern

**Critical:** Always use `supabase.auth.getUser()` for server-side auth checks—**never trust `getSession()`** which isn't guaranteed to revalidate the token.

```typescript
// ✅ Correct: getUser() validates with Supabase Auth server
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }
  
  return user
}

// ❌ Incorrect: getSession() can return stale/invalid session
const { data: { session } } = await supabase.auth.getSession() // DON'T USE FOR AUTH
```

#### Row Level Security (RLS) Best Practices

##### The "FOR ALL" Vulnerability (CRITICAL)

**A common but dangerous pattern:**

```sql
-- ❌ DANGEROUS: FOR ALL includes DELETE
CREATE POLICY "User Access" ON profiles
FOR ALL USING (auth.uid() = user_id);
```

**Why this is dangerous:** `FOR ALL` grants SELECT, INSERT, UPDATE, **and DELETE**. In most SaaS applications, users should read/update their profile, but deletion often requires a specific workflow (password confirmation, data archival). This policy exposes records to accidental or malicious deletion.

**Review Standard:** REJECT any migration PR containing `FOR ALL` policies unless accompanied by documented justification.

```sql
-- ✅ CORRECT: Explicit granular policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- DELETE requires separate, controlled workflow
CREATE POLICY "Only admins can delete profiles"
ON profiles FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = (SELECT auth.uid())
  )
);
```

##### RLS Performance Pattern

**Wrap auth functions in SELECT for caching:**

```sql
-- ✅ GOOD: Caches auth.uid() per statement
CREATE POLICY "Users can view own data"
ON todos FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- ❌ BAD: Calls auth.uid() for every row
CREATE POLICY "Users can view own data"
ON todos FOR SELECT TO authenticated
USING (auth.uid() = user_id);
```

##### Permissive vs Restrictive Policies

| Policy Type | Behavior | Use Case |
|-------------|----------|----------|
| PERMISSIVE (default) | Combines with OR logic | Additive access grants |
| RESTRICTIVE | Combines with AND logic | Mandatory security constraints |

```sql
-- Restrictive policy: ALWAYS enforced regardless of permissive policies
CREATE POLICY "Enforce tenant isolation"
ON orders AS RESTRICTIVE FOR ALL TO authenticated
USING (tenant_id = (SELECT current_tenant_id()));
```

---

### 1.6 Vercel Deployment Optimization

#### Edge vs Serverless Functions Decision Matrix

| Criteria | Edge Functions (V8) | Serverless (Node.js) |
|----------|---------------------|----------------------|
| Cold start | ~10-50ms | ~100-500ms |
| Best for | Auth, redirects, geolocation, middleware | Database ops, heavy business logic |
| Node.js APIs | Limited subset | Full support |
| Distribution | Globally distributed | Regional |
| Database drivers | Limited (no Prisma, limited pg) | Full support |

**2026 Nuance:** While Edge is faster for cold starts, Node.js Serverless has achieved massive warm-start improvements. For complex business logic with heavy database drivers (Postgres.js, Prisma), **prefer Node.js Serverless** to avoid environment compatibility issues. Reserve Edge for middleware, routing, and lightweight API aggregations.

#### Caching Strategy Hierarchy

1. **Time-based ISR:** `revalidate = 3600` for predictable refresh
2. **On-demand revalidation:** `revalidateTag()` or `revalidatePath()` triggered by webhooks
3. **Tag-based data fetching:** Granular invalidation with `cacheTag()`

**Best practice:** Combine on-demand revalidation (webhook-triggered) with time-based revalidation as safety net.

#### Data Residency Compliance

**GDPR requirement:** Verify Vercel region (e.g., `fra1`) and Supabase region match for data transfer compliance. Mismatch creates both compliance risk and latency issues.

```typescript
// vercel.json
{
  "regions": ["fra1"], // Frankfurt for EU data residency
  "functions": {
    "app/api/**/*": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```


---

## Part 2: Six-Perspective Review Framework

### 2.1 Senior Developer Lens (Code Quality & Maintainability)

**Focus:** Maintainability, complexity metrics, modern syntax, and trust in compiler optimization.

#### Complexity Metrics

**Cognitive Complexity > Cyclomatic Complexity for React**

In 2026, with prevalence of declarative functional components, **Cognitive Complexity is the superior metric**. Deeply nested ternary operators in JSX are harder to read than a switch statement with high cyclomatic complexity.

| Metric | Maximum | Reasoning |
|--------|---------|-----------|
| Cyclomatic complexity | 15 per function | Traditional path count |
| Cognitive complexity | 15 per function | Better defect predictor |
| JSX nesting depth | 3 levels | Flag deeper nesting |

**"Bumpy Road" code smell:** Multiple nested conditional blocks strongly correlate with bugs. Flatten with early returns and guard clauses.

```typescript
// ❌ BAD: Bumpy road with deep nesting
function processOrder(order: Order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.payment) {
        if (order.payment.verified) {
          // Finally do something
        }
      }
    }
  }
}

// ✅ GOOD: Flat with guard clauses
function processOrder(order: Order) {
  if (!order) return { error: 'No order provided' }
  if (order.items.length === 0) return { error: 'Empty order' }
  if (!order.payment?.verified) return { error: 'Payment not verified' }
  
  // Clear path to success
  return processVerifiedOrder(order)
}
```

#### SOLID Principles in React

| Principle | React Application | Review Check |
|-----------|-------------------|--------------|
| **Single Responsibility** | Each component solves ONE problem | Separate data fetching from rendering |
| **Open/Closed** | Use composition (`children`, render props) | No modification of existing components |
| **Liskov Substitution** | Components with same interface are swappable | TypeScript interface compliance |
| **Interface Segregation** | Components don't depend on unused props | No prop bloat |
| **Dependency Inversion** | High-level components depend on abstractions | Use Context/hooks, not concrete implementations |

#### Code Quality Checklist

| Check | Severity | Notes |
|-------|----------|-------|
| No `any` type usage | BLOCKER | With TypeScript 5.9 inference, no excuse |
| No manual `useMemo`/`useCallback` | Minor (Tech Debt) | React Compiler handles this |
| Discriminated unions for state | BLOCKER | No boolean flag combinations |
| No non-null assertions (`!.`) | Major | Bypasses null checks, risks runtime errors |
| Functions < 15 cognitive complexity | Major | Refactor if exceeded |
| No `useEffectEvent` passed as props | Major | Not stable across renders |
| Direct imports (no barrel files) | Minor | Turbopack caching optimization |

#### Highest-Priority Code Smells

1. **`any` type usage**—completely disables TypeScript benefits
2. **Multiple booleans for state**—use discriminated unions
3. **Non-null assertions (`!.`)**—bypasses null checks
4. **God Components**—components doing too much (>200 lines)
5. **Prop drilling >3 levels**—use Context, Zustand, or composition

---

### 2.2 System Architect Lens (Scalability, Security & Infrastructure)

**Focus:** System boundaries, data flow, security architecture, and infrastructure decisions.

#### The Data Access Layer (DAL) Pattern (REQUIRED)

**Server Actions should NEVER call the database directly.** They must call a DAL function. This centralizes security checks, taint analysis, and audit logging.

```
┌─────────────────────────────────────────┐
│           CONTROLLER LAYER              │
│  Page Routes │ API Routes │ Server Actions│
│         (Handle HTTP, call services)    │
├─────────────────────────────────────────┤
│            SERVICE LAYER                │
│    Business logic coordination          │
│    (Orchestration, no direct DB)        │
├─────────────────────────────────────────┤
│         DATA ACCESS LAYER (DAL)         │
│    Database operations, auth checks     │
│    Taint analysis, audit logging        │
├─────────────────────────────────────────┤
│             DATA LAYER                  │
│    Supabase, Prisma, external APIs      │
└─────────────────────────────────────────┘
```

```typescript
// lib/dal/users.ts - Centralized data access
import { createClient } from '@/lib/supabase/server'
import { experimental_taint } from 'react'

export async function getUserById(id: string) {
  const supabase = await createClient()
  
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, name, role, created_at')
    .eq('id', id)
    .single()
  
  if (error) throw new Error('User not found')
  
  // Taint sensitive fields to prevent client leakage
  experimental_taint('Do not pass hashed_password to client', user.hashed_password)
  
  return user
}

// app/actions/user.ts - Server Action calls DAL
export async function updateUserProfile(formData: FormData) {
  'use server'
  const user = await getAuthenticatedUser() // Auth check FIRST
  const validated = ProfileSchema.safeParse(Object.fromEntries(formData))
  
  if (!validated.success) return { error: validated.error.flatten() }
  
  return await updateUser(user.id, validated.data) // DAL handles DB
}
```

#### Server Actions Are PUBLIC HTTP Endpoints (CRITICAL SECURITY)

**Server Actions are NOT internal functions.** They can be invoked via `curl`—they are public HTTP endpoints.

**Vulnerability:** Relying on UI state (disabled buttons) to prevent an action. An attacker can replay the request directly.

**Requirement:** Every Server Action MUST perform authorization check immediately upon entry.

```typescript
// ❌ DANGEROUS: No auth check
export async function deletePost(id: string) {
  'use server'
  await db.posts.delete({ where: { id } }) // Anyone can delete ANY post!
}

// ✅ CORRECT: Auth check at entry
export async function deletePost(id: string) {
  'use server'
  
  // 1. Authenticate
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  // 2. Authorize (verify ownership or role)
  const post = await getPostById(id)
  if (post.authorId !== session.user.id && session.user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  
  // 3. Validate input
  const validated = z.string().uuid().safeParse(id)
  if (!validated.success) {
    throw new Error('Invalid post ID')
  }
  
  // 4. Execute
  await db.posts.delete({ where: { id: validated.data } })
  
  revalidatePath('/posts')
}
```

#### Taint Analysis with `experimental_taint`

Prevents accidental leakage of sensitive data (API keys, PII, password hashes) to Client Components.

```typescript
import { experimental_taint } from 'react'

// In DAL or data fetching layer
function getUserForClient(userId: string) {
  const user = await db.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      hashed_password: true, // Needed for internal logic
      api_key: true, // Needed for server operations
    }
  })
  
  // Taint sensitive fields - throws if passed to Client Component
  experimental_taint(
    'Do not pass hashed_password to client components',
    user.hashed_password
  )
  experimental_taint(
    'Do not pass api_key to client components', 
    user.api_key
  )
  
  return user
}
```

#### OWASP Top 10 2025 Review Priorities

| Rank | Category | Key Prevention | Severity |
|------|----------|----------------|----------|
| A01 | Broken Access Control | Auth checks on ALL endpoints, Server Actions, RLS | BLOCKER |
| A02 | Security Misconfiguration | Audit configs, disable unused features, env vars | BLOCKER |
| A03 | Software Supply Chain | Verify packages, SBOM, secure CI/CD, lockfiles | Major |
| A05 | Injection | Parameterized queries (Supabase handles), Zod validation | BLOCKER |
| A10 | Mishandling Exceptional Conditions (NEW) | Proper error handling, fail securely, no stack traces | Major |

#### Security Architecture Checklist

| Check | Severity | Pattern |
|-------|----------|---------|
| Server Action auth at entry | BLOCKER | `await auth()` as first line |
| RLS enabled on all public tables | BLOCKER | No `FOR ALL` without justification |
| No hardcoded credentials | BLOCKER | All secrets in env vars |
| Input validation with Zod | BLOCKER | Validate before any operation |
| Supabase client per-request | BLOCKER | No singletons on server |
| `getUser()` not `getSession()` | BLOCKER | For auth verification |
| Taint analysis on sensitive DTOs | Major | `experimental_taint` for PII |
| CSP headers configured | Major | In middleware or `next.config.ts` |
| Rate limiting on Server Actions | Major | Upstash or similar |

---

### 2.3 Product Manager Lens (Value, Analytics & Feature Delivery)

**Focus:** Requirements alignment, analytics implementation, feature flags, and ROI decisions.

#### Feature Completeness Validation

| Check | Question | Severity |
|-------|----------|----------|
| Requirements match | Does code implement requirements exactly? No scope creep, no missing features? | BLOCKER |
| Ticket linkage | Does every code change map to a documented user story/ticket? | Major |
| Acceptance criteria | Are all AC testable and met? | BLOCKER |
| Edge cases in spec | Are edge cases from requirements handled? | Major |

#### Analytics Implementation Review

| Check | Requirement |
|-------|-------------|
| Event coverage | All user interactions have corresponding analytics events |
| Naming convention | Event naming follows platform standards (GA4, Mixpanel) |
| Conversion tagging | Conversion events at correct funnel stages |
| Event parameters | Include necessary context (page, user segment, variant) |
| Journey tracking | Entry → Engagement → Action → Conversion complete |

**Server-Side Analytics (Critical for Server Actions):**

With Server Actions, traditional `onClick` analytics don't capture the full story. Business-critical events must be logged **server-side within the Action** for 100% data fidelity even if user closes browser immediately.

```typescript
export async function completeSignup(formData: FormData) {
  'use server'
  
  // ... validation and user creation ...
  
  // Log server-side for guaranteed capture
  await analytics.track({
    event: 'user_signed_up',
    userId: newUser.id,
    properties: {
      signup_source: formData.get('source'),
      plan: formData.get('plan'),
      timestamp: new Date().toISOString(),
    }
  })
  
  return { success: true }
}
```

#### A/B Testing Capability Assessment

| Check | Requirement |
|-------|-------------|
| Feature flags | Enable/disable features without deployment |
| Variant support | Code structure supports multiple variants without duplication |
| Metrics capture | Appropriate points for statistical analysis |
| Percentage rollouts | Gradual rollout functionality works correctly |
| Edge Config latency | Flag evaluation is non-blocking (won't delay FCP) |

#### Technical Decision ROI Questions

Every significant technical decision should answer:

1. What is the business impact if this feature fails?
2. Is the complexity justified by business value delivered?
3. Will this code support future feature iterations?
4. What is maintenance cost vs. user value ratio?
5. Does this create technical debt that will slow future development?

---

### 2.4 UX Designer Lens (Accessibility, Performance & User Experience)

**Focus:** WCAG compliance, Core Web Vitals, perceived performance, and design consistency.

#### WCAG 2.2 Level AA Compliance Checklist

| Criterion | Code Review Check | Severity |
|-----------|-------------------|----------|
| **1.1.1 Non-text Content** | All `<img>` have meaningful `alt`; decorative images have `alt=""` | BLOCKER |
| **1.4.3 Contrast Minimum** | 4.5:1 for normal text, 3:1 for large text (≥18px or 14px bold) | BLOCKER |
| **2.1.1 Keyboard** | All functionality accessible via keyboard alone | BLOCKER |
| **2.4.7 Focus Visible** | Clear focus indicators on all interactive elements | BLOCKER |
| **2.5.5 Target Size (NEW)** | Clickable targets minimum **44×44px** (24×24 absolute minimum) | BLOCKER |
| **3.3.1 Error Identification** | Errors clearly described, associated with input via `aria-describedby` | Major |
| **3.3.7 Redundant Entry (NEW)** | Don't ask for same information twice in a flow | Major |
| **4.1.3 Status Messages** | Use `aria-live` for dynamic content updates | Major |

#### European Accessibility Act (EAA) Compliance

**Enforcement deadline passed June 2025.** Accessibility is now a **legal requirement** for EU trade.

**Review standard:** BA lens must treat accessibility violations as **BLOCKING compliance issues**, not optional UX improvements.

#### Core Web Vitals (2026 Targets)

| Metric | Target | What It Measures |
|--------|--------|------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Loading performance |
| **INP** (Interaction to Next Paint) | < 200ms | Responsiveness (replaced FID) |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |

**INP Review Focus:**

INP has **fully replaced FID**. Heavy event handlers on the main thread directly impact this metric.

```typescript
// ❌ BAD: Heavy computation blocks main thread
function handleClick() {
  const result = expensiveCalculation(data) // Blocks UI
  setResult(result)
}

// ✅ GOOD: Use useTransition for non-urgent updates
function handleClick() {
  startTransition(() => {
    const result = expensiveCalculation(data)
    setResult(result) // Deferred, keeps UI responsive
  })
}
```

#### Nielsen's 10 Usability Heuristics Applied to Code

| Heuristic | Code Review Check |
|-----------|-------------------|
| 1. Visibility of system status | Loading states for ALL async operations |
| 2. Match real world | User-familiar terminology, locale-appropriate formats |
| 3. User control | Undo/redo, cancel buttons, easy "back" navigation |
| 4. Consistency | Follow design system components rigorously |
| 5. Error prevention | Form validation before submission, confirmation for destructive actions |
| 6. Recognition over recall | Autocomplete, recent items, clear labels |
| 7. Flexibility | Keyboard shortcuts, multiple paths to goals |
| 8. Aesthetic & minimal | No unnecessary information, clean layouts |
| 9. Help users recover | Plain language errors with actionable solutions |
| 10. Help & documentation | Contextual help, tooltips, onboarding |

#### Loading States and Error Handling (REQUIRED)

```tsx
// Every async operation needs these states
function DataComponent() {
  const { data, error, isLoading } = useQuery(...)
  
  if (isLoading) {
    return <Skeleton aria-label="Loading content" className="h-48" />
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error.message}
        onRetry={refetch}
        aria-live="polite"
      />
    )
  }
  
  return <Content data={data} />
}
```

**CLS Prevention:** Suspense skeletons MUST match the layout dimensions of final content.

```tsx
// ✅ GOOD: Skeleton matches content dimensions
<Suspense fallback={<ProductCardSkeleton className="h-64 w-full" />}>
  <ProductCard className="h-64 w-full" />
</Suspense>

// ❌ BAD: Size mismatch causes layout shift
<Suspense fallback={<Spinner />}>
  <ProductCard className="h-64" />
</Suspense>
```

#### View Transitions for Native-App Feel

```tsx
import { ViewTransition } from 'react'

function MasterDetail() {
  return (
    <ViewTransition>
      {showDetail ? (
        <DetailView item={selected} onBack={() => setShowDetail(false)} />
      ) : (
        <ListView items={items} onSelect={handleSelect} />
      )}
    </ViewTransition>
  )
}
```

**Review check:** Look for `<ViewTransition>` usage in master-detail navigation patterns.

#### Animation Accessibility

```css
/* Always respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

| Check | Requirement |
|-------|-------------|
| `prefers-reduced-motion` respected | All animations have reduced-motion alternative |
| Feedback animations | < 300ms duration |
| No seizure-inducing content | No flashing > 3 times per second |

---

### 2.5 QA Engineer Lens (Testability & Quality Assurance)

**Focus:** Test coverage, edge cases, test stability, and automation.

#### Testing Stack (2026 Standard)

| Type | Tool | Purpose |
|------|------|---------|
| Unit/Component | **Vitest** | Faster than Jest, native ESM support |
| Integration | Vitest + React Testing Library | Component behavior testing |
| E2E | **Playwright** | Cross-browser, auto-waiting |
| Visual Regression | Playwright + Percy/Chromatic | UI consistency |
| API | Vitest | Server Action testing |

**Vitest over Jest:** Vitest is the 2026 standard due to speed and native ESM support aligning with Next.js internals.

#### React Testing Library Best Practices

```typescript
// ✅ Test behavior, not implementation
test('shows error when submission fails', async () => {
  server.use(
    http.post('/api/contact', () => HttpResponse.error())
  )
  
  render(<ContactForm />)
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
  
  expect(await screen.findByRole('alert')).toHaveTextContent(/submission failed/i)
})

// Query priority (accessibility-first):
// 1. getByRole - preferred (matches accessibility tree)
// 2. getByLabelText - form fields
// 3. getByText - non-interactive content
// 4. getByTestId - escape hatch ONLY when above fail
```

**Never test implementation details:**

```typescript
// ❌ BAD: Testing implementation
expect(component.state.isLoading).toBe(true)
expect(mockFetch).toHaveBeenCalledTimes(1)

// ✅ GOOD: Testing behavior
expect(screen.getByRole('progressbar')).toBeInTheDocument()
expect(await screen.findByText('Data loaded')).toBeInTheDocument()
```

#### Playwright E2E Best Practices

```typescript
// ✅ Use locators, not CSS selectors
await page.getByRole('button', { name: 'Submit' }).click()
await page.getByLabel('Email').fill('user@example.com')

// ✅ Use auto-waiting assertions
await expect(page.getByText('Success')).toBeVisible()

// ❌ NEVER use hard waits
await page.waitForTimeout(5000) // Anti-pattern - flaky and slow
```

#### Testing Server Actions

Server Actions function as API endpoints. Test them directly for logic verification without browser fragility.

```typescript
// Direct Server Action testing
import { updateProfile } from '@/app/actions/profile'

describe('updateProfile', () => {
  it('validates input and returns error for invalid email', async () => {
    const formData = new FormData()
    formData.set('email', 'invalid-email')
    formData.set('name', 'Test User')
    
    const result = await updateProfile(formData)
    
    expect(result.error).toBeDefined()
    expect(result.error.fieldErrors.email).toBeTruthy()
  })
  
  it('requires authentication', async () => {
    // Mock unauthenticated state
    vi.mocked(auth).mockResolvedValue(null)
    
    const formData = new FormData()
    formData.set('email', 'valid@email.com')
    
    await expect(updateProfile(formData)).rejects.toThrow('Unauthorized')
  })
})
```

#### Test Coverage Thresholds

| Type | Minimum | Target | Notes |
|------|---------|--------|-------|
| Statements | 80% | 90% | Overall code coverage |
| Branches | 75% | 85% | Decision path coverage |
| Functions | 80% | 90% | Function coverage |
| Critical paths | 100% | 100% | Auth, payment, data mutations |

#### Edge Case Categories to Verify

| Category | Examples |
|----------|----------|
| Null/undefined | Missing optional fields, null returns |
| Empty collections | Empty arrays, empty objects, empty strings |
| Boundary values | 0, -1, MAX_INT, empty string, whitespace-only |
| Concurrent operations | Race conditions, double-submit |
| Network failures | Timeouts, 500 errors, offline |
| Invalid formats | Malformed JSON, wrong types, SQL injection attempts |
| Unicode/i18n | Emojis, RTL text, special characters |

---

### 2.6 Business Analyst Lens (Compliance & Requirements Traceability)

**Focus:** GDPR compliance, SOC 2 controls, requirements traceability, and data governance.

#### Requirements Traceability

| Check | Requirement |
|-------|-------------|
| Ticket linkage | Every code change links to ticket/requirement |
| AC documented | Acceptance criteria documented and verifiable |
| Scope control | Out-of-scope items explicitly excluded |
| Change log | Maintained for audit trail |

#### GDPR Compliance in Code

| Requirement | Code Implementation | Review Check |
|-------------|---------------------|--------------|
| Consent Management | Capture/store user consent with timestamps | Consent table exists, timestamps recorded |
| Right to Access | API endpoint for user data export | Export endpoint returns all user data |
| Right to Erasure | User deletion cascades to all related data | ON DELETE CASCADE or explicit cleanup |
| Data Minimization | Only collect necessary fields | No superfluous data collection |
| Purpose Limitation | Data used only for stated purpose | No repurposing without consent |
| Storage Limitation | Retention policies implemented | Automated cleanup jobs |

```typescript
// Example: GDPR-compliant user deletion
export async function deleteUserAccount(userId: string) {
  'use server'
  
  const user = await getAuthenticatedUser()
  if (user.id !== userId) throw new Error('Forbidden')
  
  // Audit log BEFORE deletion
  await auditLog.create({
    action: 'ACCOUNT_DELETION_REQUESTED',
    userId,
    timestamp: new Date(),
    ipAddress: headers().get('x-forwarded-for'),
  })
  
  // Cascade delete all user data
  await db.$transaction([
    db.userSessions.deleteMany({ where: { userId } }),
    db.userPreferences.delete({ where: { userId } }),
    db.userContent.deleteMany({ where: { authorId: userId } }),
    db.user.delete({ where: { id: userId } }),
  ])
  
  // Final audit
  await auditLog.create({
    action: 'ACCOUNT_DELETED',
    userId,
    timestamp: new Date(),
  })
}
```

#### SOC 2 Compliance Controls

| Trust Criterion | Code Review Check |
|-----------------|-------------------|
| **Security** | Encryption at rest/transit, secure auth, input validation |
| **Availability** | Error handling, graceful degradation, health checks |
| **Processing Integrity** | Data validation, audit logging, idempotency |
| **Confidentiality** | Access controls, data classification, taint analysis |
| **Privacy** | GDPR compliance, consent management, data minimization |

#### Audit Logging Requirements

```typescript
// Required audit fields for SOC 2
interface AuditLog {
  id: string
  timestamp: Date
  userId: string | null
  action: string
  resource: string
  resourceId: string
  previousValue?: unknown
  newValue?: unknown
  ipAddress: string | null
  userAgent: string | null
  success: boolean
  errorMessage?: string
}
```

---

## Part 3: Top-Down Review Methodology

### 3.1 Time Allocation by Abstraction Level

| Level | Time | Focus Areas |
|-------|------|-------------|
| **Architecture** | 5-10 min | System fit, module boundaries, coupling, Server/Client boundaries |
| **Module** | 10-15 min | Single responsibility, interfaces, test coverage, DAL usage |
| **Function** | 15-20 min | Complexity, error handling, edge cases, auth checks |
| **Line** | Remaining | Naming, style guide, TypeScript types, comments |

### 3.2 PR Size Guidelines

| Size | Lines of Code | Review Time | Recommendation |
|------|---------------|-------------|----------------|
| Small | < 200 LOC | 15-30 min | Ideal |
| Medium | 200-400 LOC | 30-60 min | Acceptable |
| Large | 400-800 LOC | 60-120 min | Request splitting |
| XL | > 800 LOC | 2+ hours | **Must split** |

**Large PRs correlate with missed defects.** Request splitting into multiple PRs for changes > 400 LOC.

### 3.3 Automated Tooling Configuration

#### ESLint Flat Config for React/TypeScript (ESLint 9)

```javascript
// eslint.config.js
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactCompiler from 'eslint-plugin-react-compiler'

export default tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
      'complexity': ['warn', { max: 15 }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  }
)
```

#### Pre-commit Hooks with Husky

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
npx tsc --noEmit
```

#### CI/CD Quality Gates

| Gate | Tool | Threshold | Blocking |
|------|------|-----------|----------|
| Lint | ESLint | 0 errors | Yes |
| Types | TypeScript | Strict mode passes | Yes |
| Tests | Vitest | 80% coverage | Yes |
| Security | npm audit | 0 critical/high | Yes |
| Bundle | Bundle Analyzer | < 200KB first load JS | Warning |
| Performance | Lighthouse CI | CWV in green | Warning |

---

## Part 4: Integrated Review Checklists

### 4.1 Universal PR Checklist (All Perspectives)

Copy and use for every PR review:

```markdown
## Architecture & Design
- [ ] Fits existing system architecture
- [ ] Server/Client Component boundaries correct (clients at leaves)
- [ ] No unnecessary coupling introduced
- [ ] Separation of concerns maintained
- [ ] PPR: Suspense boundaries around async Server Components
- [ ] PPR: Root layout remains static

## Security (BLOCKER)
- [ ] Server Actions have auth check at entry
- [ ] Input validated with Zod before any operation
- [ ] No hardcoded credentials (all in env vars)
- [ ] RLS policies are granular (no FOR ALL without justification)
- [ ] Supabase server client instantiated per-request
- [ ] Uses getUser() not getSession() for auth
- [ ] Taint analysis on sensitive DTOs (experimental_taint)
- [ ] No SQL injection vectors
- [ ] Rate limiting on sensitive actions

## Code Quality
- [ ] TypeScript strict mode passing
- [ ] No `any` types (use `unknown` with type guards)
- [ ] Discriminated unions for state (no boolean flags)
- [ ] No non-null assertions (`!.`)
- [ ] Functions < 15 cognitive complexity
- [ ] No manual useMemo/useCallback (trust React Compiler)
- [ ] Direct imports (no barrel file re-exports)
- [ ] useEffectEvent not passed as props

## Data Access
- [ ] Server Actions call DAL, not database directly
- [ ] Data fetching uses `use cache` where appropriate
- [ ] Cache invalidation with tags (not paths)
- [ ] Semantic cache profiles used (cacheLife)

## Accessibility (BLOCKER for EU)
- [ ] WCAG 2.2 AA compliant
- [ ] Touch targets ≥ 44×44px
- [ ] All functionality keyboard navigable
- [ ] Focus indicators visible
- [ ] Form errors associated with inputs
- [ ] aria-live for dynamic content
- [ ] prefers-reduced-motion respected

## User Experience
- [ ] Loading states for ALL async operations
- [ ] Error states with clear recovery paths
- [ ] Skeletons match final content dimensions (CLS)
- [ ] Mobile-responsive
- [ ] Follows design system consistently
- [ ] View Transitions for navigation where appropriate

## Testing
- [ ] Unit tests for business logic (Vitest)
- [ ] Integration tests for components (RTL)
- [ ] E2E tests for critical paths (Playwright)
- [ ] Edge cases covered
- [ ] Server Actions tested directly
- [ ] No implementation detail testing

## Product
- [ ] Implements requirements exactly (no scope creep)
- [ ] All acceptance criteria met
- [ ] Analytics tracking in place
- [ ] Feature flags if gradual rollout needed
- [ ] Business logic matches specifications

## Performance
- [ ] Images optimized with next/image
- [ ] Code splitting for heavy components (dynamic imports)
- [ ] No layout shift from loading states
- [ ] INP < 200ms (no heavy onClick handlers)
- [ ] use cache applied to expensive reads
```

### 4.2 Severity Classification Matrix

| Severity | Blocks PR | Examples | Response |
|----------|-----------|----------|----------|
| **BLOCKER** | Yes | Security vulnerabilities, broken auth, missing RLS, accessibility violations (EAA), data loss risk | Must fix before merge |
| **Major** | Usually | Missing error handling, failed tests, performance regressions, missing loading states | Should fix, exception requires tech debt ticket |
| **Minor** | No | Style inconsistencies, missing optimization opportunities, documentation gaps | Fix if time allows |
| **Nitpick** | No | Naming preferences, comment suggestions, minor formatting | Author's discretion |

### 4.3 Security-Specific Checklist (Deep Dive)

```markdown
## Authentication & Authorization
- [ ] Every Server Action checks auth at first line
- [ ] Authorization verifies user can access resource (not just authenticated)
- [ ] Session tokens validated server-side (getUser() not getSession())
- [ ] No sensitive operations in Client Components

## Input Validation
- [ ] All user input validated with Zod schemas
- [ ] Validation happens BEFORE any database operation
- [ ] File uploads validated (type, size, content)
- [ ] URL parameters sanitized

## Data Protection
- [ ] Sensitive fields tainted (experimental_taint)
- [ ] No PII in error messages or logs
- [ ] API keys only in server code
- [ ] Database queries parameterized (Supabase handles)

## RLS Policies
- [ ] Enabled on ALL public schema tables
- [ ] No FOR ALL policies (explicit SELECT, INSERT, UPDATE, DELETE)
- [ ] Auth functions wrapped in SELECT for caching
- [ ] Tenant isolation verified (if multi-tenant)

## Infrastructure
- [ ] CSP headers configured
- [ ] CORS properly restricted
- [ ] Rate limiting on sensitive endpoints
- [ ] Audit logging for sensitive operations
```

---

## Part 5: Skill Usage Instructions

### 5.1 How to Conduct Multi-Perspective Reviews

#### Phase 1: Initial Scan (5 minutes)

1. Read PR description and linked requirements/tickets
2. Identify scope and affected systems
3. Check PR size—request splitting if > 400 LOC
4. Note which perspectives are most relevant

#### Phase 2: Architecture Review (10 minutes)

1. Apply **System Architect** lens
2. Verify Server/Client Component boundaries
3. Check DAL usage (no direct DB calls from Server Actions)
4. Evaluate security architecture (auth checks, RLS)
5. Review caching strategy (`use cache` application)

#### Phase 3: Code Quality Review (20 minutes)

1. Apply **Senior Developer** lens
2. Check TypeScript types and patterns (no `any`, discriminated unions)
3. Evaluate complexity metrics
4. Identify code smells (God Components, prop drilling, manual memoization)
5. Verify React Compiler compatibility (component purity)

#### Phase 4: Perspective Rotation (15 minutes)

1. **PM lens:** Requirements alignment, analytics implementation
2. **UX lens:** Accessibility (WCAG 2.2), loading states, CLS prevention
3. **QA lens:** Testability, edge case coverage, test quality
4. **BA lens:** Compliance (GDPR, SOC 2), audit logging

#### Phase 5: Synthesis (10 minutes)

1. Compile findings by severity (BLOCKER → Major → Minor → Nitpick)
2. Identify blocking issues requiring changes
3. Write constructive feedback with specific suggestions
4. Approve or request changes

### 5.2 Prompt Template for Claude Code Review

```markdown
You are conducting a multi-perspective code review for a production Next.js 16.1 application. This is a multi-million dollar startup requiring enterprise-grade quality.

## Tech Stack
- Next.js 16.1 (App Router, Turbopack, PPR)
- React 19.2 (React Compiler enabled)
- TypeScript 5 (strict mode)
- Tailwind CSS 4 (CSS-first config)
- Supabase (PostgreSQL, Auth, RLS)
- Vercel deployment

## Critical 2026 Context
- Default is DYNAMIC, not cached. Check for missing `use cache`.
- React Compiler handles memoization. Flag manual useMemo/useCallback.
- Server Actions are PUBLIC HTTP endpoints. Auth check required at entry.
- `<Activity>` component for tab state preservation.
- INP replaces FID. Target < 200ms.
- EAA makes accessibility legally required for EU.

## Review Through Six Expert Lenses

### 1. Senior Developer
- Code quality, SOLID/DRY principles
- Cognitive complexity < 15
- No `any`, discriminated unions for state
- No manual memoization (React Compiler)
- useEffectEvent not passed as props

### 2. System Architect
- Server/Client boundaries (clients at leaves)
- DAL pattern (Server Actions → DAL → DB)
- Security: auth checks, RLS (no FOR ALL), taint analysis
- Caching: `use cache` with semantic profiles
- Supabase client per-request (no singletons)

### 3. Product Manager
- Requirements alignment
- Analytics implementation (server-side for Actions)
- Feature flag support
- Business logic correctness

### 4. UX Designer
- WCAG 2.2 AA compliance (BLOCKER for EU)
- Touch targets ≥ 44×44px
- Loading states, error states with recovery
- CLS prevention (skeleton dimensions match content)
- INP < 200ms

### 5. QA Engineer
- Testability with Vitest + RTL + Playwright
- Edge case coverage
- Server Action direct testing
- No implementation detail testing

### 6. Business Analyst
- GDPR compliance (consent, erasure, export)
- SOC 2 controls (audit logging)
- Requirements traceability

## Output Format
For each perspective, identify:
- **BLOCKER** issues (must fix before merge)
- **Major** issues (should fix)
- **Minor** suggestions (nice to have)

## Code to Review
[PASTE CODE HERE]

## Context
[DESCRIBE THE FEATURE/CHANGE]
```

### 5.3 Agentic Review Workflow (MCP-Enabled)

For Claude Code with Model Context Protocol (MCP) enabled:

```markdown
Review the changes in [FILE PATH].

1. Cross-reference with RLS policies in supabase/migrations/
2. Verify Zod schema matches database constraints
3. Check auth is verified at Server Action entry
4. Confirm `use cache` applied to read operations
5. Verify component uses design system from components/ui/
6. Check for corresponding tests in __tests__/

Apply the six-perspective framework from the code review skill.
Flag any BLOCKER issues immediately.
```

### 5.4 Automated Review Integration

Platforms like CodeRabbit perform first-pass review for:
- Linting errors (ESLint 9 flat config)
- Complexity metrics (cognitive load)
- Documentation gaps
- Basic security flaws (hardcoded secrets)
- Dependency vulnerabilities

**Human reviewer focuses on:**
- System Architect perspective (judgment and context)
- Product Manager perspective (business alignment)
- Cross-file implications that AI may miss

---

## Appendix A: Technical Version Matrix (January 2026)

| Technology | Version | Key Feature |
|------------|---------|-------------|
| Next.js | 16.1 (Stable) | Turbopack default, `use cache`, PPR |
| React | 19.2 (Stable) | `<Activity>`, React Compiler stable |
| Tailwind CSS | 4.0 (Stable) | Oxide engine, CSS-first config |
| TypeScript | 5.9 (Stable) | `noUncheckedIndexedAccess` standard |
| Supabase Client | 2.4x | `@supabase/ssr` with PKCE |
| Testing | Vitest 3.0 | Browser mode, native ESM |
| E2E | Playwright 1.50 | Auto-waiting, component testing |

---

## Appendix B: Quick Reference Cards

### Caching Decision Quick Reference

| Scenario | Solution |
|----------|----------|
| Static content (footer, nav) | `use cache` at component level |
| Database list query (public) | `use cache` + `cacheTag('entity')` |
| User-specific data | `use cache` + `cacheTag('user-${id}')` |
| Real-time data | No cache (default dynamic) |
| Expensive computation | `use cache` + `cacheLife('long-lived')` |
| After mutation | `expireTag('affected-tag')` |

### Security Quick Reference

| Action | Required Check |
|--------|----------------|
| Any Server Action | Auth at first line |
| Database operation | Via DAL only |
| User data return | Taint sensitive fields |
| RLS policy | Explicit operations (no FOR ALL) |
| Session check | `getUser()` not `getSession()` |
| Input handling | Zod validation before use |

### Component Boundary Quick Reference

| If component needs... | Then use... |
|-----------------------|-------------|
| Database access | Server Component |
| API keys/secrets | Server Component |
| useState/useReducer | Client Component |
| onClick/onChange | Client Component |
| useEffect | Client Component |
| Browser APIs | Client Component |

---

## Appendix C: Common Anti-Patterns to Flag

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| `FOR ALL` RLS policy | Includes DELETE unintentionally | Explicit separate policies |
| `getSession()` for auth | Not guaranteed to revalidate | Use `getUser()` |
| Singleton Supabase client | Session leaking between users | Per-request client |
| Manual `useMemo`/`useCallback` | Legacy debt, compiler handles | Remove, trust compiler |
| Boolean state flags | Impossible state combinations | Discriminated unions |
| `any` type | Disables TypeScript | `unknown` + type guard |
| Barrel file imports | Defeats Turbopack caching | Direct imports |
| `useEffectEvent` as prop | Not stable across renders | Keep in effect scope |
| Heavy `onClick` handlers | INP regression | `useTransition` |
| UI-only auth protection | Server Actions are public | Auth check in Action |
| Direct DB in Server Action | Bypasses DAL security | Call DAL function |

---

**Document Version:** 2.0  
**Last Updated:** January 2026  
**Maintainer:** Engineering Team  
**Review Cycle:** Quarterly or on major framework releases
