# 🌟 AstralChart — Carta Astrale Familiare Interattiva

> **Status:** 🏗️ Skeleton / Scaffolding phase
> **Last updated:** 2026-04-08

---

## 📌 Elevator Pitch

A web application (in Italian) where users can input the **exact date, time, and location of birth** for each family member. The app computes a **full natal chart** (not just the sun sign — ascendant, moon, planets, houses, aspects, the works) and then uses **AI to generate deeply personalized commentary** on how each family member's chart interplays with every other member's.

It's going to be **huge, highly detailed**, and designed to be sold as a premium product.

---

## 🎯 Core Features (High Level — not implemented yet)

1. **Family Tree Management**
   - Add/edit/remove family members
   - Store name, date of birth, exact time of birth, location of birth

2. **Full Natal Chart Calculation**
   - Sun sign, Moon sign, Ascendant (Rising)
   - Planetary positions (Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
   - House placements
   - Aspects (conjunctions, oppositions, trines, squares, sextiles, etc.)

3. **Synastry (Inter-chart Analysis)**
   - Pairwise comparison between any two family members
   - Composite charts
   - AI-generated commentary (in Italian) on relationship dynamics

4. **AI Commentary Engine**
   - LLM-powered interpretations
   - Italian language output
   - Personalized, not generic horoscope fluff

5. **E-Commerce / Monetization**
   - Free tier (limited family members, basic chart)
   - Premium tier (full synastry, AI commentary, PDF export)
   - Payment integration (Stripe or similar)
   - Subscription or one-time purchase models

6. **User Accounts & Auth**
   - Registration / Login
   - Save family data securely
   - GDPR compliance (Italian/EU users)

---

## 🏗️ Tech Stack (Planned)

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Language         | TypeScript (strict mode)             |
| Framework        | Next.js (App Router)                 |
| Styling          | Tailwind CSS                         |
| Database         | PostgreSQL (via Prisma ORM)          |
| Auth             | NextAuth.js (or similar)             |
| Payments         | Stripe                               |
| AI               | OpenAI API (or similar LLM)          |
| Astrology Engine | TBD (Swiss Ephemeris bindings?)      |
| Deployment       | Vercel (or similar)                  |
| Package Manager  | pnpm                                 |
| VCS              | Git → GitHub (espositodarioperprova) |

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
- [ ] Set up database (Prisma + PostgreSQL)
- [ ] Set up authentication
- [ ] Set up payment integration
- [ ] Implement astrology engine
- [ ] Implement AI commentary
- [ ] Build UI components
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
