# ============================================
# AstralChart — Makefile
# ============================================
# Simple shortcuts so you never need to remember commands.
# Usage: just type `make` to see all options.
# ============================================

.PHONY: help dev build start lint format typecheck check db-push db-migrate db-studio db-generate docker-up docker-down docker-build clean install fresh

# Default: show help
help: ## Show this help message
	@echo ""
	@echo "🌟 AstralChart — Available Commands"
	@echo "===================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ─── Development ─────────────────────────────────────────────

dev: ## Start dev server (Turbopack)
	pnpm dev

build: ## Production build
	pnpm build

start: ## Start production server
	pnpm start

# ─── Code Quality ────────────────────────────────────────────

lint: ## Run ESLint
	pnpm lint

format: ## Format all files with Prettier
	pnpm format

typecheck: ## TypeScript type check (no emit)
	pnpm typecheck

check: ## Run ALL checks (typecheck + lint + format check)
	pnpm typecheck && pnpm lint && pnpm format:check

# ─── Database ────────────────────────────────────────────────

db-generate: ## Generate Prisma client
	pnpm db:generate

db-push: ## Push schema to database (no migration)
	pnpm db:push

db-migrate: ## Create and apply a migration
	pnpm db:migrate

db-studio: ## Open Prisma Studio (database GUI)
	pnpm db:studio

# ─── Docker ──────────────────────────────────────────────────

docker-up: ## Start app + database with Docker Compose
	docker compose up

docker-down: ## Stop Docker Compose
	docker compose down

docker-build: ## Build production Docker image
	docker build -t astralchart .

# ─── Setup & Maintenance ────────────────────────────────────

install: ## Install all dependencies
	pnpm install

fresh: ## Clean install (nuke node_modules + reinstall)
	rm -rf node_modules .next
	pnpm install

clean: ## Remove build artifacts
	rm -rf .next out coverage

# ─── Git shortcuts ───────────────────────────────────────────

push: ## Format, check, commit (interactive), and push
	pnpm format
	pnpm typecheck
	pnpm lint
	git add -A
	@echo "Enter commit message:" && read msg && git commit -m "$$msg"
	git push
