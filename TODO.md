# 📋 AstralChart — Master TODO List

> **Last updated:** 2026-04-08
> **Rule:** Items are ordered by priority. Items with 🔒 depend on something external (account setup, API key, etc.). Items without 🔒 can be built RIGHT NOW.

---

## ✅ DONE

- [x] Project scaffolding (Next.js 16 + TypeScript + Tailwind CSS 4)
- [x] ESLint + Prettier configuration
- [x] Git + GitHub setup (SSH, remote, pushed)
- [x] Prisma 7 + Neon PostgreSQL (schema pushed, client generated)
- [x] Docker (Dockerfile + docker-compose.yml)
- [x] Makefile with all shortcuts
- [x] Animation boilerplate (Framer Motion + GSAP + Lenis)
- [x] Smooth scroll infrastructure (Lenis provider)
- [x] Landing page (Hero, HowItWorks, Features, Pricing, FAQ, Contact, Footer)
- [x] Open questions answered + business model defined
- [x] Stripe → Lemon Squeezy migration (schema, env, docs)

---

## 🔥 PHASE 1 — Core Product (BUILD NOW)

> Goal: A working app where someone can input family members and get astrology results. No auth, no payments — just the core tool working.

### 1.1 — Main App Page (`/calcola`)

- [ ] Create `/src/app/calcola/page.tsx` — the main app route
- [ ] Family member input form:
  - [ ] Name field (text input)
  - [ ] Relationship dropdown (Madre, Padre, Fratello, Sorella, Figlio/a, Partner, Nonno/a, Zio/a, Cugino/a, Altro)
  - [ ] Date of birth picker (modern calendar-style datepicker)
  - [ ] Time of birth picker (clock-style, hours + minutes)
  - [ ] "Aggiungi" button to add member to the list
- [ ] Family members list (cards showing added members, with edit/delete)
- [ ] "Calcola" button — triggers computation
- [ ] Results area (placeholder for now — will show chart + AI commentary)
- [ ] State management: decide local state vs. context vs. URL params
- [ ] Mobile-responsive layout (50/50 as decided)

### 1.2 — Astrology Engine

- [ ] Research: choose a library/approach for natal chart calculation
  - Option A: Swiss Ephemeris via WASM or Node bindings
  - Option B: `astronomia` npm package
  - Option C: External API (e.g., astro.com API, if available)
  - Option D: Pre-computed tables + interpolation
- [ ] Implement: given (date, time, location?) → compute:
  - [ ] Sun sign (zodiac sign from date)
  - [ ] Moon sign (requires time + ephemeris data)
  - [ ] Ascendant / Rising sign (requires time + location)
  - [ ] House placements (Placidus system)
- [ ] Implement basic synastry: given two charts → identify key aspects between them
- [ ] Create TypeScript types for all astrology data (`NatalChart`, `PlanetPosition`, `Aspect`, `SynastryResult`, etc.)
- [ ] Unit tests for core calculations (sun sign from date, etc.)

### 1.3 — AI Commentary Engine

- [ ] Design the prompt template:
  - Input: structured natal chart data (JSON)
  - Output: Italian-language commentary, authoritative but friendly tone
  - Levels: short (free preview) vs. full (premium)
- [ ] Create `/src/lib/ai/generate-commentary.ts`
- [ ] Create API route: `POST /api/generate` — accepts chart data, returns AI commentary
- [ ] Rate limiting (prevent abuse — even without auth)
- [ ] Streaming response (show text appearing in real-time for better UX)
- [ ] Error handling (API down, rate limit, etc.)
- [ ] 🔒 **Requires**: OpenAI API key (or alternative LLM) in `.env.local`

### 1.4 — Results Display

- [ ] Individual chart card: show Sun, Moon, Ascendant, house placements for each person
- [ ] Synastry results: text-based comparison between pairs
- [ ] Free vs. Premium split:
  - Free: individual charts + 1 synastry pair (user picks)
  - Premium: blurred/locked remaining pairs with "Sblocca tutto" CTA
- [ ] Printable layout (clean CSS for `@media print`)
- [ ] Loading states / skeleton UI during AI generation

---

## 🔨 PHASE 2 — User Accounts & Data Persistence

> Goal: Users can create accounts, save their family data, and come back later.

### 2.1 — Authentication (NextAuth.js)

- [ ] Install & configure NextAuth.js v5
- [ ] Email + password registration/login
- [ ] Google OAuth provider
- [ ] Session management (JWT or database sessions)
- [ ] Protected routes middleware (`/calcola` requires auth? or optional?)
- [ ] Italian-language auth UI (login, register, forgot password pages)
- [ ] "Accedi" / "Registrati" buttons in Navbar

### 2.2 — Data Persistence

- [ ] Save family members to database (linked to user account)
- [ ] Save generated reports to database (so users can revisit)
- [ ] API routes: CRUD for family members (`/api/family-members`)
- [ ] API routes: save/load reports (`/api/reports`)
- [ ] Optimistic UI updates
- [ ] Loading / error states

### 2.3 — User Dashboard

- [ ] `/dashboard` page — show saved family groups and past reports
- [ ] "New analysis" button → goes to `/calcola`
- [ ] "View past report" → shows saved results
- [ ] Account settings (change password, delete account)

---

## 💰 PHASE 3 — Monetization (Lemon Squeezy)

> Goal: Premium features behind a paywall. Can wait until the product works well.

### 3.1 — 🔒 Lemon Squeezy Account Setup (MANUAL — Dario must do this)

- [ ] Go to https://app.lemonsqueezy.com/register — create account
- [ ] Create a store (name: "AstralChart" or final brand name)
- [ ] Create product: "AstralChart Premium"
  - Type: Subscription OR one-time (decide pricing model)
  - Price: €4.99/mo or similar (test price for now)
  - Get the **Variant ID**
- [ ] Go to Settings → API → create API key (name: `astralchart-dev`)
  - Copy the key — you'll only see it once!
- [ ] Go to Settings → Webhooks → create a webhook:
  - URL: `https://your-domain.vercel.app/api/webhooks/lemonsqueezy`
  - Events: `order_created`, `subscription_created`, `subscription_updated`, `subscription_cancelled`
  - Copy the **signing secret**
- [ ] Fill in `.env.local`:
  ```
  LEMONSQUEEZY_API_KEY="eyJ..."
  LEMONSQUEEZY_STORE_ID="your-store-id"
  LEMONSQUEEZY_WEBHOOK_SECRET="your-signing-secret"
  LEMONSQUEEZY_PREMIUM_VARIANT_ID="your-variant-id"
  ```
- [ ] Test in Lemon Squeezy test mode (make a test purchase)
- [ ] When ready: activate store (1-2 business days review)

### 3.2 — Payment Integration (Code)

- [ ] Install `@lemonsqueezy/lemonsqueezy.js` SDK
- [ ] Create `/src/lib/payments/lemonsqueezy.ts` — SDK setup + helpers
- [ ] Create `POST /api/checkout` — generates a checkout URL via API, passes `custom_data.user_id`
- [ ] Create `POST /api/webhooks/lemonsqueezy` — webhook handler:
  - Verify signature
  - On `order_created` / `subscription_created`: set user tier to PREMIUM
  - On `subscription_cancelled`: set user tier back to FREE
- [ ] Add Lemon.js script to layout (for checkout overlay)
- [ ] "Sblocca tutto" / "Passa a Premium" button → triggers checkout overlay
- [ ] Show premium status in UI (badge, unlocked features)
- [ ] Customer portal link (Lemon Squeezy provides this — for managing subscription)

---

## 🎨 PHASE 4 — Polish & Launch Readiness

> Goal: Everything looks professional and is legally compliant.

### 4.1 — Visual Style Update

- [ ] Implement the cozy/friendly color palette (light blues, purples, warm cosmos)
- [ ] Update landing page colors to match (currently placeholder dark theme)
- [ ] Design consistent component library (buttons, cards, inputs, badges)
- [ ] Dark/light mode? (or just one cohesive light-cosmos theme)
- [ ] Favicon + Open Graph images + social sharing meta

### 4.2 — Legal Pages

- [ ] `/privacy` — Privacy policy (GDPR-compliant, Italian language)
  - What data we collect (name, birth data, email)
  - How we use it (chart calculation, AI commentary)
  - Data retention and deletion policy
  - Contact information for data requests
- [ ] `/termini` — Terms of service (Italian language)
  - Disclaimer: astrology is for entertainment, not medical/legal advice
  - Payment terms (via Lemon Squeezy)
  - Limitation of liability
- [ ] `/cookie` — Cookie policy
- [ ] Cookie consent banner (lightweight, EU-compliant)
- [ ] "Delete my data" mechanism (GDPR requirement)
- [ ] Footer links to all legal pages

### 4.3 — SEO & Performance

- [ ] Metadata for all pages (title, description, Open Graph)
- [ ] Structured data (JSON-LD) for the product
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Image optimization (next/image)
- [ ] Core Web Vitals audit
- [ ] Lighthouse score > 90

### 4.4 — Contact & Support

- [ ] Floating "Hai bisogno di aiuto?" button
- [ ] Slide-in drawer or modal with contact form
- [ ] Email notification when someone submits (or WhatsApp link)

### 4.5 — Brand & Domain

- [ ] 🔒 Decide final brand name (Dario — before any marketing)
- [ ] 🔒 Buy domain
- [ ] Connect custom domain to Vercel
- [ ] Update all references (meta tags, emails, legal pages)

---

## 🚀 PHASE 5 — Post-Launch Improvements

> These are NOT needed for launch but are on the radar.

### 5.1 — Chart Visualization

- [ ] Circular natal chart rendering (SVG or Canvas)
- [ ] Interactive: click on a planet for more info
- [ ] Side-by-side chart comparison view
- [ ] Chart export as image (for sharing)

### 5.2 — Location Input

- [ ] Birth location autocomplete (Google Places API or OpenStreetMap/Nominatim)
- [ ] Map picker for selecting birth location
- [ ] Geocoding: city name → latitude/longitude
- [ ] 🔒 **Requires**: Google Maps API key OR free alternative setup

### 5.3 — PDF Export

- [ ] Beautiful branded PDF report
- [ ] Include all charts, synastry, AI commentary
- [ ] Gift-worthy design (printable, shareable)
- [ ] Premium-only feature

### 5.4 — Extended Astrology

- [ ] Full planetary positions (Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
- [ ] Aspects (conjunctions, oppositions, trines, squares, sextiles)
- [ ] Chiron, Lilith, asteroids (optional deep analysis)
- [ ] Sidereal zodiac toggle (for advanced users)
- [ ] Alternative house systems

### 5.5 — Social & Sharing

- [ ] Share your chart on social media
- [ ] Referral program (via Lemon Squeezy affiliates)
- [ ] Testimonials / social proof (real ones)
- [ ] Email marketing (Lemon Squeezy has built-in email — free up to 500 subscribers)

### 5.6 — Physical Products (Long-term)

- [ ] Printed chart posters
- [ ] Family chart booklet
- [ ] Fulfillment/shipping partner
- [ ] This is a separate business line — evaluate after digital product is profitable

---

## 📌 External Account Setup Checklist (Dario — manual)

> These are things only YOU can do. I can't create accounts for you.

| #   | Task                                                  | Status  | Priority               | Blocking?                   |
| --- | ----------------------------------------------------- | ------- | ---------------------- | --------------------------- |
| 1   | **Lemon Squeezy** account + store + product + API key | ⬜ TODO | Low (Phase 3)          | Blocks payments only        |
| 2   | **OpenAI** API key (or alternative LLM)               | ⬜ TODO | Medium (Phase 1.3)     | Blocks AI commentary        |
| 3   | **Vercel** account + connect GitHub repo              | ⬜ TODO | Medium (before launch) | Blocks deployment           |
| 4   | **Google OAuth** credentials (for login with Google)  | ⬜ TODO | Low (Phase 2)          | Blocks Google login only    |
| 5   | **Custom domain** purchase                            | ⬜ TODO | Low (Phase 4)          | Blocks nothing              |
| 6   | **Google Maps API** key (or Nominatim) for location   | ⬜ TODO | Low (Phase 5)          | Blocks location picker only |

---

## 🧭 Current Priority: PHASE 1

**Right now we're building:**

1. The `/calcola` page with the family member input form
2. The astrology engine (sun sign, moon sign, ascendant calculation)
3. The AI commentary integration
4. The results display

**Everything else waits.**
