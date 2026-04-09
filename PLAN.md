# 🗺️ AstralChart — Development Plan

> **Created:** 2026-04-09
> **Last updated:** 2026-04-09
> **Status:** Active — working through Phase 1

---

## 🎯 Current Sprint: Engine + AI Foundation

### Doing NOW (this session)

1. ✅ **Birthplace field** — Add city input to AddMemberForm (free-text for now, geocoding later)
2. ✅ **`astronomia` integration** — Moon sign calculation via ephemeris
3. ✅ **Ascendant calculation** — Using sidereal time + nutation from `astronomia`
4. ✅ **Full natal chart engine** — Sun + Moon + Ascendant in a single `computeNatalChart()` function
5. ✅ **OpenAI connection** — Server action with Vercel AI SDK, streaming responses
6. ✅ **Prompt engineering** — Italian astrologer system prompt, structured chart data input
7. ✅ **Caching** — Hash chart inputs → store AI outputs in Prisma to avoid re-calling OpenAI
8. ✅ **Rate limiting** — Session-based, max N free calculations per day

### Deferred (next sprint)

- [ ] Full planetary positions (Mercury through Pluto) — `astronomia` has `planetposition` module
- [ ] House cusps (Placidus) — complex math, needs careful implementation
- [ ] Aspects between planets — conjunction, trine, square, opposition, sextile detection
- [ ] Synastry engine — cross-chart aspect analysis between two natal charts
- [ ] Birthplace autocomplete — Google Places API or Nominatim (needs API key)
- [ ] PDF export — `@react-pdf/renderer` or server-side generation

---

## 📐 Architecture Decisions

### Astrology Engine

| Decision            | Choice                                                | Rationale                                                |
| ------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| Ephemeris library   | `astronomia` (JS, no native deps)                     | Works in Vercel serverless, no WASM/C compilation needed |
| Sun sign            | Date only, boundary table                             | Simple, already built                                    |
| Moon sign           | `astronomia` moonposition                             | Requires date + time, accuracy to ~0.5°                  |
| Ascendant           | Custom formula using astronomia's nutation + sidereal | Requires date + time + location (lat/lng)                |
| House system        | Placidus (deferred)                                   | Standard Western, but math is complex — do later         |
| Planetary positions | `astronomia` planetposition (deferred)                | Mercury–Pluto, deferred to next sprint                   |

### AI Engine

| Decision          | Choice                                   | Rationale                                        |
| ----------------- | ---------------------------------------- | ------------------------------------------------ |
| LLM provider      | OpenAI via `@ai-sdk/openai`              | Best Italian language quality, structured output |
| Model (free tier) | `gpt-4o-mini`                            | Cheap (~$0.15/1M input), decent Italian          |
| Model (premium)   | `gpt-4o` (future)                        | Better quality for paid users                    |
| Streaming         | Vercel AI SDK `streamText()`             | Real-time text appearance, great UX              |
| Caching           | Prisma — hash inputs, store outputs      | Avoid re-calling OpenAI for identical charts     |
| Rate limiting     | IP + fingerprint, stored in-memory (Map) | No Redis dependency for MVP                      |

### Geocoding (Birthplace → Lat/Lng)

| Decision     | Choice                                            | Rationale                                      |
| ------------ | ------------------------------------------------- | ---------------------------------------------- |
| MVP approach | Pre-built list of Italian cities + manual lat/lng | No API key needed, covers 90% of Italian users |
| Future       | Nominatim (OpenStreetMap) or Google Places        | Full international coverage, autocomplete UX   |

---

## 🔮 Future Sprints (Rough Order)

### Sprint 2: Full Planetary Chart

- All 10 planets (Mercury through Pluto) with sign + degree
- House cusps (Placidus system)
- Aspect detection engine (conjunction, trine, square, etc.)
- Synastry engine (cross-chart aspects for pairs)
- Richer AI prompts using full chart data

### Sprint 3: Authentication + Persistence

- NextAuth.js v5 (email + Google OAuth)
- Save family members to DB (linked to user)
- Save generated reports to DB
- User dashboard (/dashboard)

### Sprint 4: Payments

- Lemon Squeezy account setup (Dario manual)
- Checkout flow + webhook handler
- Premium tier unlocking in UI
- Customer portal link

### Sprint 5: Polish + Legal

- Privacy policy, TOS, cookie consent
- SEO (meta, sitemap, structured data)
- Favicon + OG images
- Lighthouse audit
- Brand name finalization + domain

### Sprint 6: Advanced Features

- Circular natal chart SVG visualization
- PDF export (branded, printable)
- Birthplace autocomplete (Google Places / Nominatim)
- Extended astrology (Chiron, Lilith, asteroids)
- Social sharing

---

## 💰 Cost Projections (Per User)

### Free Tier User

- 1 calculation = Sun + Moon + Ascendant for up to 4 members = ~4 AI calls
- `gpt-4o-mini` at ~$0.15/1M input + $0.60/1M output
- ~500 tokens input + ~300 tokens output per call = $0.0003/call
- **Total per free user: ~$0.001** (with caching, subsequent views = $0)
- Rate limit: 3 calculations/day → max $0.003/day per abusive user

### Premium User (€4.99 one-time)

- Revenue after Lemon Squeezy: ~€4.24
- Up to 6 members + all synastry pairs = ~21 AI calls (6 individual + 15 pairs)
- ~$0.006 per premium calculation
- Even with 10 recalculations: ~$0.06 total AI cost
- **Margin: €4.24 - €0.06 = €4.18 profit per premium user (~99% margin)**

### Break-even

- Vercel free tier: $0/mo (up to ~100K requests)
- Neon free tier: $0/mo (0.5 GB)
- Domain: ~€10/year
- **Need ~3 premium sales/year to cover domain cost. Everything else is profit.**

---

## ⚠️ Known Risks & Mitigations

| Risk                               | Impact                                              | Mitigation                                                       |
| ---------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `astronomia` accuracy for Moon     | Moon sign could be off by 1 sign near boundaries    | Add a "cusp" indicator when Moon is within 2° of a sign boundary |
| Ascendant without exact birth time | Users guess "around 3pm" → ascendant could be wrong | Show disclaimer: "L'ascendante richiede l'ora esatta"            |
| OpenAI API downtime                | No AI commentary = degraded experience              | Graceful fallback: show chart data without AI text, retry button |
| Free tier abuse                    | Bots hammering /api/generate                        | Rate limit by IP + session, CAPTCHA if needed                    |
| Lemon Squeezy account rejection    | Can't process payments                              | Low risk — LS is lenient. Have Stripe as backup plan             |
| GDPR complaint                     | Legal exposure                                      | Build delete-my-data endpoint before launch                      |
