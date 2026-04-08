# 🌟 AstralChart — Carta Astrale Familiare Interattiva

> **Status:** 🏗️ Skeleton / Scaffolding phase
> **Last updated:** 2026-04-08

---

## 📌 Elevator Pitch

A web application (in Italian) where users can input the **exact date, time, and location of birth** for each family member. The app computes a **full natal chart** (not just the sun sign — ascendant, moon, planets, houses, aspects, the works) and then uses **AI to generate deeply personalized commentary** on how each family member's chart interplays with every other member's.

It's going to be **huge, highly detailed**, and designed to be sold as a premium product.

---

## ❓ Open Questions (TO BE ANSWERED)

> These questions need to be resolved to shape the product. Answer them as we go.

### Product & Business

1. **Target audience**: Is this for everyday families (mass market, simple UX) or for astrology enthusiasts who already know what a "trine" is? Both? Do we segment?
2. **Tone of voice**: Should the AI commentary be mystical/poetic, or conversational/friendly, or scientific/analytical? Mix depending on user preference?
3. **Monetization model**: One-time purchase per report? Monthly subscription? Freemium with upsell? What's the "trigger" that makes someone pay?
4. **Family size limits**: Free tier = how many family members? 2? 3? Premium = unlimited?
5. **PDF export**: Should the premium report be a beautiful PDF (branded, printable, gift-worthy)? This could be a strong upsell.
6. **Name/brand**: "AstralChart" is the working name. Final brand name for Italian market? "AstroFamiglia"? "Carta Astrale"? Something else?
7. **Domain**: Have we picked/bought a domain?

### Astrology Specifics

8. **What if someone doesn't know their exact birth time?** We need graceful degradation:
   - **Base tier (no time)**: Sun sign only (just date of birth) → basic zodiac
   - **Mid tier (date + time)**: Sun + Moon + Ascendant + houses
   - **Full tier (date + time + location)**: Complete natal chart with all planetary positions
9. **Tropical vs Sidereal zodiac?** Tropical is standard in Western astrology. Do we offer both?
10. **Which house system?** Placidus is most common. Offer alternatives?
11. **Asteroids / Chiron / Lilith?** Include or keep it simple?

### UX & Design

12. **Visual style**: Mystical/dark (stars, cosmos, deep blues/purples)? Or clean/modern/light? Or a toggle?
13. **Chart visualization**: Do we render actual circular natal charts (SVG/Canvas)? Or just tables/text?
14. **Interactive chart?** Can users click on a planet to get more info?
15. **Comparison view**: Side-by-side charts? Overlay? Or purely text-based?
16. **Mobile priority**: Is this primarily mobile (phone) or desktop? 50/50?

### Legal & Privacy

17. **GDPR**: Birth data is personal data. Privacy policy, data deletion, consent flows needed.
18. **Cookie consent**: Required for EU. Which solution?
19. **Terms of service**: Especially for paid features.

---

## 🎯 Core Features (High Level — not implemented yet)

### Feature Layers (Progressive Complexity)

#### 🟢 Layer 1 — "Curiosi" (Free / No Account Required)

> For people who just want a quick zodiac check.

- Input: **date of birth only**
- Output: Sun sign, basic personality traits (AI-generated, in Italian)
- No registration required
- Limit: 1-2 family members, no synastry
- Goal: **hook them**, show the quality, upsell to Layer 2

#### 🟡 Layer 2 — "Appassionati" (Free Account Required)

> For people who want to go deeper.

- Input: **date + time of birth**
- Output: Sun sign + Moon sign + Ascendant, basic house placements
- Requires account (save data)
- Limit: up to 3-4 family members
- Basic pairwise synastry (text only, limited AI commentary)
- Goal: **engage them**, upsell to Layer 3

#### 🔴 Layer 3 — "Premium" (Paid)

> The full experience.

- Input: **date + time + location of birth**
- Output: Complete natal chart (all planets, houses, aspects)
- Full synastry between ALL family members (every pair)
- Deep AI commentary (detailed, personalized, Italian)
- Interactive chart visualization
- PDF export (beautiful, printable, gift-worthy)
- Unlimited family members
- Priority AI generation

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
   - Free tier (Layer 1 + limited Layer 2)
   - Premium tier (full Layer 3)
   - Payment integration (Stripe)
   - Subscription or one-time purchase models

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
| Payments         | Stripe                               |
| AI               | OpenAI API (or similar LLM)          |
| Astrology Engine | TBD (Swiss Ephemeris bindings?)      |
| Deployment       | Vercel (free tier)                   |
| Package Manager  | pnpm                                 |
| VCS              | Git → GitHub (espositodarioperprova) |

---

## � Deployment Strategy

### Phase 1 — MVP / Pre-launch (FREE or near-free)

| Component   | Service     | Cost        | Notes                                      |
| ----------- | ----------- | ----------- | ------------------------------------------ |
| Next.js App | **Vercel**  | $0/mo       | Push to GitHub → auto-deploy. Zero config. |
| PostgreSQL  | **Neon**    | $0/mo       | Free tier: 0.5 GB storage, autoscaling.    |
| Auth        | NextAuth.js | $0          | Self-hosted, no external service needed.   |
| AI (OpenAI) | OpenAI API  | Pay-per-use | ~$0.01-0.03 per commentary generation.     |
| Payments    | Stripe      | 1.4%+€0.25  | Only pay when you earn.                    |
| **Total**   |             | **~$0/mo**  | Until you have real traffic.               |

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
- [ ] Answer open questions (see above)
- [ ] Set up authentication (NextAuth.js)
- [ ] Build family member input form (datepicker, clock, map)
- [ ] Set up payment integration (Stripe)
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
│   │   └── payments/     # Stripe integration
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
