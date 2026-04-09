# 🌟 AstralChart — Carta Astrale Familiare Interattiva

> **Status:** 🏗️ Skeleton / Scaffolding phase
> **Last updated:** 2026-04-08

---

## 📌 Elevator Pitch

A web application (in Italian) where users can input the **exact date, time, and location of birth** for each family member. The app computes a **full natal chart** (not just the sun sign — ascendant, moon, planets, houses, aspects, the works) and then uses **AI to generate deeply personalized commentary** on how each family member's chart interplays with every other member's.

It's going to be **huge, highly detailed**, and designed to be sold as a premium product.

---

## ❓ Open Questions — ANSWERED ✅

> Resolved on 2026-04-08. Includes Dario's answers + critical review notes from Copilot.

### Product & Business

1. **Target audience**: ✅ **Both, segmented.** Accessible enough for curious newcomers, rich enough for enthusiasts. We don't dumb it down, but we don't throw "trines" at first-time users either. Start with zodiac sign + ascendant; Moon, Mars, etc. come in later iterations. Progressive disclosure.

2. **Tone of voice**: ✅ **Authoritative but friendly.** A blend of conversational and scientific. Not boringly academic, not mystical fluff. Think: "a knowledgeable friend who happens to be an astrologer." Confident, warm, credible.

3. **Monetization model**: ✅ **Freemium with content gating.**
   - **Free tier**: Individual natal charts for each member + **1 synastry pair** (a taste of the relationship analysis). Short/truncated AI commentary.
   - **Paid tier**: Full synastry between ALL family members (every pair), deep/extended AI commentary, "life advice" section (personalized AI-generated guidance).
   - The free version hooks you by showing the _quality_ of one pair, then gates the rest.
   - Future upsells: premium PDF export, physical gadgets (long-term, separate business line).
     > 📝 _Copilot note: This is a solid freemium structure. The synastry is the unique value — gating it behind payment is the right call. One free pair lets users verify quality before paying._

4. **Family size limits**: ✅ **Free = up to 4 members. Paid = up to 6 members.**
   - Free users get individual charts for up to 4 people + 1 synastry pair preview.
   - Paid users unlock all pairwise synastry + up to 6 members (15 unique pairs at max).
     > 📝 _Copilot note: Good compromise. 4 free members is generous enough to hook families, but the synastry paywall is the real lever. AI compute costs scale with pairs (n×(n-1)/2), so the cap at 6 is also operationally smart._

5. **PDF export**: ✅ **Nice-to-have for later. Not the free/paid differentiator.**
   - Will be a premium feature when built, but not the primary monetization lever.
   - The paywall is the synastry depth + AI commentary, not the format.
     > 📝 _Copilot note: Agreed — now that #3 and #4 have a clear paywall, PDF can safely be a bonus perk rather than the gate._

6. **Name/brand**: ⏳ **"AstralChart" is the working name. THIS IS NOT A FINAL ANSWER YET.**
   - Must be resolved before any marketing spend or public launch.
   - "AstralChart" is generic and English — not ideal for an Italian-market product.
   - Dario will decide the final brand name soon.
     > 📝 _Copilot note: Clock is ticking on this. Domain availability, social handles, and brand recognition all depend on nailing the name. Do it before launch, not after._

7. **Domain**: ✅ **No custom domain yet.** Using free Vercel domain (`.vercel.app`) for now. Will buy a custom domain before public launch.

### Astrology Specifics

8. **Birth time unknown — graceful degradation**: ✅ **Mid tier (date + time) is the standard experience.** We design for users who know their birth time.
   - Users without birth time are not our primary audience, but we **don't design them out**.
   - A degraded date-only experience (sun sign + basic traits) should exist as a fallback — build it later, not first.
   - MVP focuses on: date + time → Sun + Moon + Ascendant + houses.
     > 📝 _Copilot note: Good call. "Not mainly for them" ≠ "exclude them." Keep the door open architecturally (optional time field), build the degraded path in a later sprint._

9. **Tropical vs Sidereal**: ✅ **Tropical only.** Standard Western astrology. No need to offer Sidereal.

10. **House system**: ✅ **Placidus only.** Most common, no alternatives needed for MVP.

11. **Asteroids / Chiron / Lilith**: ✅ **Keep it simple.** Core planets only (Sun through Pluto). No asteroids, no Chiron, no Lilith for MVP. Can be added later as a "deep analysis" premium feature.

### UX & Design

12. **Visual style**: ✅ **Cozy, friendly, light cosmos theme.** Light blues and purples, cosmic motifs, but NOT deep/dark/mystical. No negative or heavy tones. Think: "a warm night sky, not a black hole."

    > 📝 _Copilot note: This differentiates from 90% of astrology sites that go full dark-mode-mystical. Smart positioning for a mass-market Italian audience._

13. **Chart visualization**: ✅ **No circular chart rendering for MVP.** Text/cards only. Circular natal chart SVG is a v2 priority.

    > 📝 _Copilot note: Accepted for MVP, but flagged — every competitor shows a circular chart. This is table stakes in astrology. Prioritize for v2._

14. **Interactive chart**: ✅ **No.** Not needed for MVP. Revisit when chart visualization is built.

15. **Comparison view**: ✅ **Text-based for MVP, but MUST be printable.** Clean layout that looks good on paper/PDF. This is a hard requirement.

16. **Mobile priority**: ✅ **50/50 mobile and desktop.** Responsive design, no platform priority. Both experiences must be first-class.

### Legal & Privacy

17. **GDPR**: ✅ **Must be addressed before launch.** We DO store personal data (names, birth dates, birth times, birth locations, family relationships — all in the `FamilyMember` table linked to user accounts). This is personal data under GDPR, full stop.

- **Minimum before launch**: Privacy policy page + "delete my data" mechanism + consent at signup.
- **Not needed now**: Full DPO, cookie granularity controls, data portability export.
- Birth data may be considered sensitive (can reveal beliefs). Don't ignore this.
  > 📝 _Copilot note: Dario initially wanted to skip this. Overruled. It's not optional under EU law, and it's not hard to do. A privacy page + delete endpoint is a weekend's work._

18. **Cookie consent**: ✅ **Yes, implement a cookie consent banner.** Required for EU. Use a lightweight solution (e.g., `cookie-consent` library or custom banner). Don't overcomplicate it.

19. **Terms of service**: ✅ **Placeholder for now.** Will write real TOS before paid features go live. A basic placeholder page at `/termini` is fine for MVP.

---

## 🎯 Core Features (High Level — not implemented yet)

### Feature Layers (Progressive Complexity) — REVISED

#### 🟢 Free Tier (No Account Required for quick try, Account Required to save)

> Hook them with quality. Let them taste the synastry, then gate the rest.

- Input: **date + time of birth** (time strongly encouraged, date-only fallback later)
- Output per person: Sun sign, Moon sign, Ascendant, basic personality traits (AI-generated, Italian)
- **Up to 4 family members**
- **1 synastry pair unlocked** (user picks which two members to compare)
- Remaining pairs: teased with a blurred/truncated preview + "Sblocca tutto" CTA
- Short AI commentary (truncated — enough to impress, not enough to satisfy)
- No PDF export
- Goal: **hook them**, show the quality of the synastry, make them want the rest

#### 🔴 Premium Tier (Paid — one-time or subscription TBD)

> The full experience. Every pair, every insight, every detail.

- **Up to 6 family members** (15 unique pairs at max)
- Full synastry between ALL pairs, not just one
- Deep, extended AI commentary (detailed, personalized, Italian)
- "Life advice" section: AI-generated personalized guidance based on chart interplay
- Printable comparison view (clean layout for paper/PDF)
- PDF export (beautiful, branded — when built)
- Priority AI generation
- Goal: **convert and retain**

> 📝 _Note: The old 3-layer model (Curiosi/Appassionati/Premium) has been simplified to 2 tiers. Simpler = less user confusion, clearer paywall, easier to implement. The key gate is: 1 free synastry pair vs. all pairs unlocked._

### Feature Breakdown

1. **Family Tree Management**
   - Add/edit/remove family members
   - Store name, relationship label, date of birth, exact time, location
   - Drag-and-drop reorder? Visual tree?

2. **Full Natal Chart Calculation**
   - Sun sign, Moon sign, Ascendant (Rising)
   - Planetary positions (Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
   - House placements (Placidus default)
   - Aspects (conjunctions, oppositions, trines, squares, sextiles, etc.)

3. **Synastry (Inter-chart Analysis)**
   - Pairwise comparison between any two family members
   - Composite charts
   - AI-generated commentary (in Italian) on relationship dynamics

4. **AI Commentary Engine**
   - LLM-powered interpretations
   - Italian language output
   - Personalized, not generic horoscope fluff
   - Different depth levels per tier

5. **E-Commerce / Monetization**
   - **Free tier**: Individual charts (up to 4 members) + 1 synastry pair + truncated AI commentary
   - **Premium tier**: All synastry pairs (up to 6 members) + full AI commentary + life advice + PDF
   - Payment integration (Lemon Squeezy — Merchant of Record, handles VAT/IVA)
   - Pricing model TBD (one-time per report? monthly sub? both?)

6. **User Accounts & Auth**
   - Registration / Login (email + Google OAuth?)
   - Save family data securely
   - GDPR compliance (Italian/EU users)

---

## � UX / Pages & Sections

### Landing Page (scroll-driven, animated)

- **Hero**: Big cosmic visual, tagline, CTA ("Scopri la tua carta astrale")
- **How it works**: 3-step visual (inserisci → calcola → scopri)
- **Feature highlights**: Cards with icons, animations on scroll
- **Testimonials / Social proof**: (fake for now, real later)
- **Pricing**: Tier comparison table
- **FAQ**: Accordion
- **Footer**: Links, socials, legal

### Main App Page — "/app" or "/calcola"

- **Family member input form**:
  - Name (text input)
  - Relationship dropdown (Madre, Padre, Fratello, Sorella, Figlio/a, Partner, etc.)
  - Date of birth (modern datepicker — calendar style)
  - Time of birth (clock-style picker, optional for Layer 1)
  - Location of birth (map/autocomplete, optional for Layers 1-2)
- **Family members list**: Cards showing who's been added
- **"Calcola" button**: Big, satisfying, triggers calculation
- **Results area**: Chart + AI commentary

### Contact / Support

- **NOT a separate page** — a slide-in drawer or floating modal
- Email form, or WhatsApp link, or Crisp/Intercom widget
- "Hai bisogno di aiuto?" floating button

### "Cos'è AstralChart?" (What is this?)

- Could be a section in the landing page OR a separate `/info` page
- Explain what natal charts are, what synastry is, why it matters
- Educational, not salesy — builds trust
- Smooth scroll-to from the landing page

### Shop / Pricing

- Part of the landing page (scroll section)
- Also accessible via `/prezzi`
- Tier comparison with toggle (mensile/annuale)

### Legal Pages

- `/privacy` — Privacy policy (GDPR)
- `/termini` — Terms of service
- `/cookie` — Cookie policy

---

## 🏗️ Tech Stack

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Language         | TypeScript (strict mode)             |
| Framework        | Next.js 16 (App Router)              |
| Styling          | Tailwind CSS 4                       |
| Animations       | Framer Motion + GSAP                 |
| Smooth scroll    | Lenis                                |
| Database         | PostgreSQL (Neon) via Prisma 7       |
| Auth             | NextAuth.js (or similar)             |
| Payments         | Lemon Squeezy (MoR — handles VAT)    |
| AI               | OpenAI API (or similar LLM)          |
| Astrology Engine | TBD (Swiss Ephemeris bindings?)      |
| Deployment       | Vercel (free tier)                   |
| Package Manager  | pnpm                                 |
| VCS              | Git → GitHub (espositodarioperprova) |

---

## � Deployment Strategy

### Phase 1 — MVP / Pre-launch (FREE or near-free)

| Component   | Service           | Cost        | Notes                                                      |
| ----------- | ----------------- | ----------- | ---------------------------------------------------------- |
| Next.js App | **Vercel**        | $0/mo       | Push to GitHub → auto-deploy. Zero config.                 |
| PostgreSQL  | **Neon**          | $0/mo       | Free tier: 0.5 GB storage, autoscaling.                    |
| Auth        | NextAuth.js       | $0          | Self-hosted, no external service needed.                   |
| AI (OpenAI) | OpenAI API        | Pay-per-use | ~$0.01-0.03 per commentary generation.                     |
| Payments    | **Lemon Squeezy** | 5%+$0.50    | MoR: handles VAT/IVA collection & filing. No P.IVA needed. |
| **Total**   |                   | **~$0/mo**  | Until you have real traffic.                               |

### Phase 2 — Growth (when free tiers are outgrown)

| Component   | Service              | Cost      |
| ----------- | -------------------- | --------- |
| Next.js App | Vercel Pro           | $20/mo    |
| PostgreSQL  | Neon Pro or Supabase | $10-25/mo |
| Domain      | Custom domain        | ~€10/year |

### Phase 3 — Scale / Cost optimization

Move to a **VPS + Docker** (e.g., Hetzner €4/mo) if Vercel costs become too high.
Docker setup is ready from day one (`Dockerfile` + `docker-compose.yml`).

### Docker (already set up)

```bash
# Local dev with Docker (app + PostgreSQL)
docker compose up

# Build production image
docker build -t astralchart .

# Run production image
docker run -p 3000:3000 --env-file .env.local astralchart
```

---

## 📋 Setup Checklist

- [x] Create IDEA.md
- [x] Initialize Git repository
- [x] Scaffold Next.js + TypeScript project
- [x] Configure ESLint + Prettier
- [x] Set up Tailwind CSS
- [x] Create folder structure
- [x] Add .gitignore, .env.example, README.md
- [x] Prepare for GitHub push
- [x] Dockerize (Dockerfile + docker-compose.yml)
- [x] Plan deployment strategy
- [x] Set up database (Prisma 7 + Neon PostgreSQL) ✅
- [x] Push schema to Neon ✅
- [x] Makefile with easy commands ✅
- [x] Animation boilerplate (Framer Motion + GSAP + Lenis) ✅
- [x] Smooth scroll infrastructure ✅
- [x] Landing page with scroll-driven sections ✅
- [x] Answer open questions ✅ (resolved 2026-04-08)
- [ ] Set up authentication (NextAuth.js)
- [ ] Build family member input form (datepicker, clock, map)
- [ ] Set up payment integration (Lemon Squeezy)
- [ ] Implement astrology engine
- [ ] Implement AI commentary
- [ ] Build chart visualization
- [ ] Contact / support widget
- [ ] Legal pages (privacy, terms, cookies)
- [ ] Launch MVP

---

## 🗂️ Project Structure (Planned)

```
ProgettoAstralChart/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   │   ├── ui/           # Base UI components
│   │   ├── charts/       # Astral chart visualizations
│   │   └── layout/       # Layout components (header, footer, etc.)
│   ├── lib/              # Utility functions & shared logic
│   │   ├── astrology/    # Chart calculation engine
│   │   ├── ai/           # AI commentary integration
│   │   └── payments/     # Lemon Squeezy integration
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   ├── hooks/            # Custom React hooks
│   └── styles/           # Global styles
├── prisma/               # Database schema & migrations
├── public/               # Static assets
├── tests/                # Test files
├── .env.example          # Environment variables template
├── IDEA.md               # This file
└── README.md             # Project documentation
```

---

## 💡 Notes

- The entire UI and all user-facing text will be in **Italian**.
- Developer docs and code comments will be in **English**.
- We prioritize **type safety** (strict TypeScript) from day one.
- Mobile-first responsive design.
- Accessibility (a11y) is important.
