# 🌟 AstralChart

**Carta Astrale Familiare Interattiva** — A web application (in Italian) for computing detailed natal charts and AI-powered synastry analysis between family members.

## Tech Stack

- **Next.js 16** (App Router) with **TypeScript** (strict)
- **Tailwind CSS 4** for styling
- **Prisma** + PostgreSQL for data persistence
- **NextAuth.js** for authentication
- **Stripe** for payments
- **OpenAI API** for AI-generated commentary
- **pnpm** as package manager

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 10
- PostgreSQL (for later — not needed yet)

### Installation

```bash
# Clone the repo
git clone https://github.com/espositodarioperprova/ProgettoAstralChart.git
cd ProgettoAstralChart

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command       | Description                       |
| ------------- | --------------------------------- |
| `pnpm dev`    | Start dev server (with Turbopack) |
| `pnpm build`  | Production build                  |
| `pnpm start`  | Start production server           |
| `pnpm lint`   | Run ESLint                        |
| `pnpm format` | Format code with Prettier         |

## Project Structure

```
src/
├── app/              # Next.js App Router (pages & layouts)
├── components/       # Reusable React components
│   ├── ui/           # Base UI components
│   ├── charts/       # Astral chart visualizations
│   └── layout/       # Layout components
├── lib/              # Utility functions & shared logic
│   ├── astrology/    # Chart calculation engine
│   ├── ai/           # AI commentary integration
│   └── payments/     # Stripe integration
├── services/         # API service layer
├── types/            # TypeScript type definitions
├── hooks/            # Custom React hooks
└── styles/           # Global styles
```

## Contributing

This is a private commercial project. See IDEA.md for the product vision.

## Deployment

### Vercel (Recommended — Free Tier)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repo
3. Add environment variables (`DATABASE_URL`, etc.) in Vercel's dashboard
4. Done — auto-deploys on every push to `main`

### Docker (Self-hosted)

```bash
# Local dev (app + PostgreSQL)
docker compose up

# Production build
docker build -t astralchart .
docker run -p 3000:3000 --env-file .env.local astralchart
```

### Database (Neon — Free Tier)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a project, copy the connection string
3. Set `DATABASE_URL` in your `.env.local` or Vercel dashboard
4. Run `pnpm db:push` to sync the schema

## License

All rights reserved. This is proprietary software.
