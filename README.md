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

## License

All rights reserved. This is proprietary software.
