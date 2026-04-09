// ============================================
// AstralChart — Rate Limiter
// ============================================
// In-memory rate limiter using sliding window.
// No Redis dependency — good enough for single-instance MVP.
// For production with multiple instances, migrate to Redis or Upstash.

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}

/**
 * Check if a request from the given identifier is allowed.
 *
 * @param identifier - Unique key (IP address, session ID, etc.)
 * @param config - Rate limit configuration
 * @returns Whether the request is allowed + metadata
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  cleanup(config.windowMs);

  let entry = store.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

  if (entry.timestamps.length >= config.maxRequests) {
    // Rate limited
    const oldestInWindow = entry.timestamps[0];
    const resetInMs = config.windowMs - (now - oldestInWindow);
    return {
      allowed: false,
      remaining: 0,
      resetInMs,
    };
  }

  // Allowed — record this request
  entry.timestamps.push(now);
  return {
    allowed: true,
    remaining: config.maxRequests - entry.timestamps.length,
    resetInMs: config.windowMs,
  };
}

// ---- Pre-configured limiters for our use cases ----

/** Free tier: 5 AI generations per hour per IP */
export const FREE_TIER_LIMIT: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

/** Overall API protection: 30 requests per minute per IP */
export const API_LIMIT: RateLimitConfig = {
  maxRequests: 30,
  windowMs: 60 * 1000, // 1 minute
};
