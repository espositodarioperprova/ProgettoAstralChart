// ============================================
// AstralChart — AI Commentary API Route
// ============================================
// POST /api/generate
//
// Accepts chart data, computes natal charts, generates AI commentary.
// Supports both streaming (for real-time display) and cached responses.

import { type NextRequest, NextResponse } from "next/server";
import { computeNatalChart, type ChartInput } from "@/lib/astrology";
import {
  generateIndividualCommentary,
  generateSynastryCommentary,
  type IndividualChartPromptData,
  type SynastryPromptData,
  type CommentaryLength,
} from "@/lib/ai/generate-commentary";
import {
  generateCacheKey,
  getCachedCommentary,
  setCachedCommentary,
} from "@/lib/ai/cache";
import { checkRateLimit, FREE_TIER_LIMIT } from "@/lib/ai/rate-limit";
import type { FamilyMemberInput } from "@/types/astrology";

// ---- Request Body Types ----

interface GenerateRequestBody {
  type: "individual" | "synastry";
  /** For individual: a single member. For synastry: two members. */
  members: FamilyMemberInput[];
  /** Premium users get full commentary */
  tier: "free" | "premium";
}

// ---- Helpers ----

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function memberToChartInput(member: FamilyMemberInput): ChartInput {
  return {
    birthDate: member.birthDate,
    birthTime: member.birthTime,
    birthLat: member.birthLat,
    birthLng: member.birthLng,
  };
}

// ---- Route Handler ----

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = getClientIP(request);
    const rateCheck = checkRateLimit(ip, FREE_TIER_LIMIT);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Troppi calcoli! Riprova tra poco.",
          resetInMs: rateCheck.resetInMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateCheck.resetInMs / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // 2. Parse and validate request
    const body = (await request.json()) as GenerateRequestBody;

    if (!body.type || !body.members || body.members.length === 0) {
      return NextResponse.json(
        { error: "Dati mancanti nella richiesta." },
        { status: 400 },
      );
    }

    if (body.type === "individual" && body.members.length !== 1) {
      return NextResponse.json(
        { error: "Per una carta individuale serve esattamente 1 membro." },
        { status: 400 },
      );
    }

    if (body.type === "synastry" && body.members.length !== 2) {
      return NextResponse.json(
        { error: "Per una sinastria servono esattamente 2 membri." },
        { status: 400 },
      );
    }

    const length: CommentaryLength = body.tier === "premium" ? "full" : "short";

    // 3. Compute natal chart(s)
    if (body.type === "individual") {
      const member = body.members[0];
      const chart = await computeNatalChart(memberToChartInput(member));
      const promptData: IndividualChartPromptData = {
        name: member.name,
        relationship: member.relationship,
        chart,
      };

      // 4. Check cache
      const cacheKey = generateCacheKey(
        "individual",
        {
          name: member.name,
          relationship: member.relationship,
          chart,
        },
        length,
      );

      const cached = getCachedCommentary(cacheKey);
      if (cached) {
        return NextResponse.json(
          {
            chart,
            commentary: cached,
            cached: true,
          },
          {
            headers: {
              "X-RateLimit-Remaining": String(rateCheck.remaining),
            },
          },
        );
      }

      // 5. Generate AI commentary
      const commentary = await generateIndividualCommentary(promptData, length);

      // 6. Cache the result
      setCachedCommentary(cacheKey, commentary);

      return NextResponse.json(
        {
          chart,
          commentary,
          cached: false,
        },
        {
          headers: {
            "X-RateLimit-Remaining": String(rateCheck.remaining),
          },
        },
      );
    }

    // Synastry
    const [memberA, memberB] = body.members;
    const [chartA, chartB] = await Promise.all([
      computeNatalChart(memberToChartInput(memberA)),
      computeNatalChart(memberToChartInput(memberB)),
    ]);

    const promptData: SynastryPromptData = {
      personA: {
        name: memberA.name,
        relationship: memberA.relationship,
        chart: chartA,
      },
      personB: {
        name: memberB.name,
        relationship: memberB.relationship,
        chart: chartB,
      },
    };

    // Check cache
    const cacheKey = generateCacheKey(
      "synastry",
      {
        personA: {
          name: memberA.name,
          relationship: memberA.relationship,
          chart: chartA,
        },
        personB: {
          name: memberB.name,
          relationship: memberB.relationship,
          chart: chartB,
        },
      },
      length,
    );

    const cached = getCachedCommentary(cacheKey);
    if (cached) {
      return NextResponse.json(
        {
          chartA,
          chartB,
          commentary: cached,
          cached: true,
        },
        {
          headers: {
            "X-RateLimit-Remaining": String(rateCheck.remaining),
          },
        },
      );
    }

    const commentary = await generateSynastryCommentary(promptData, length);
    setCachedCommentary(cacheKey, commentary);

    return NextResponse.json(
      {
        chartA,
        chartB,
        commentary,
        cached: false,
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      },
    );
  } catch (error) {
    console.error("[/api/generate] Error:", error);

    // Check if it's an OpenAI API error
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "Servizio AI non configurato. Contatta l'assistenza." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Errore interno del server. Riprova tra poco." },
      { status: 500 },
    );
  }
}
