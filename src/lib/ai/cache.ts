// ============================================
// AstralChart — AI Response Cache
// ============================================
// Hashes chart inputs and stores AI-generated commentary
// to avoid re-calling OpenAI for identical data.
//
// For MVP: uses an in-memory Map (lost on server restart).
// For production: migrate to Prisma (see TODO).

import { createHash } from "crypto";

interface CacheEntry {
  text: string;
  createdAt: number;
}

// In-memory cache — simple, no external deps, good enough for MVP.
// A Prisma-backed cache can replace this later.
const cache = new Map<string, CacheEntry>();

// Cache TTL: 7 days (commentary doesn't change for the same inputs)
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Generate a deterministic hash key from the input data.
 * Same chart data + same length → same key.
 */
export function generateCacheKey(
  type: "individual" | "synastry",
  data: Record<string, unknown>,
  length: "short" | "full",
): string {
  const payload = JSON.stringify({ type, data, length });
  return createHash("sha256").update(payload).digest("hex").slice(0, 32);
}

/**
 * Get cached commentary if available and not expired.
 */
export function getCachedCommentary(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check TTL
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }

  return entry.text;
}

/**
 * Store commentary in cache.
 */
export function setCachedCommentary(key: string, text: string): void {
  // Prevent unbounded cache growth (MVP safety valve)
  if (cache.size > 10_000) {
    // Evict oldest 20%
    const entries = Array.from(cache.entries()).sort(
      (a, b) => a[1].createdAt - b[1].createdAt,
    );
    const toEvict = Math.floor(entries.length * 0.2);
    for (let i = 0; i < toEvict; i++) {
      cache.delete(entries[i][0]);
    }
  }

  cache.set(key, { text, createdAt: Date.now() });
}

/**
 * Cache stats (for debugging / monitoring).
 */
export function getCacheStats(): { size: number; oldestAge: number | null } {
  if (cache.size === 0) return { size: 0, oldestAge: null };
  const oldest = Math.min(
    ...Array.from(cache.values()).map((e) => e.createdAt),
  );
  return {
    size: cache.size,
    oldestAge: Date.now() - oldest,
  };
}
