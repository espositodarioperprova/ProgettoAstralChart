// ============================================
// AstralChart — AI Commentary Generation
// ============================================
// Uses Vercel AI SDK with OpenAI to generate personalized
// Italian-language astrology commentary.

import { streamText, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ComputedChart } from "@/lib/astrology/chart-engine";
import { getElement, getZodiacSymbol } from "@/lib/astrology/sun-sign";
import { SYSTEM_PROMPT_INDIVIDUAL, SYSTEM_PROMPT_SYNASTRY } from "./prompts";

// ---- Types ----

export interface IndividualChartPromptData {
  name: string;
  relationship: string;
  chart: ComputedChart;
}

export interface SynastryPromptData {
  personA: IndividualChartPromptData;
  personB: IndividualChartPromptData;
}

export type CommentaryLength = "short" | "full";

// ---- Prompt Builders ----

function formatChartForPrompt(data: IndividualChartPromptData): string {
  const { name, relationship, chart } = data;
  const lines: string[] = [];

  lines.push(`PERSONA: ${name} (${relationship})`);
  lines.push(
    `SEGNO SOLARE: ${chart.sunSign} (${getZodiacSymbol(chart.sunSign)}) — Elemento: ${getElement(chart.sunSign)}${chart.sunDegree > 0 ? `, ${chart.sunDegree.toFixed(1)}° nel segno` : ""}`,
  );

  if (chart.moonSign) {
    lines.push(
      `LUNA: ${chart.moonSign} (${getZodiacSymbol(chart.moonSign)}) — Elemento: ${getElement(chart.moonSign)}${chart.moonDegree != null ? `, ${chart.moonDegree.toFixed(1)}° nel segno` : ""}${chart.moonOnCusp ? " ⚠️ CUSPIDE (posizione incerta, menzionalo)" : ""}`,
    );
  } else {
    lines.push("LUNA: non disponibile (ora di nascita non fornita)");
  }

  if (chart.ascendant) {
    lines.push(
      `ASCENDENTE: ${chart.ascendant} (${getZodiacSymbol(chart.ascendant)}) — Elemento: ${getElement(chart.ascendant)}${chart.ascendantDegree != null ? `, ${chart.ascendantDegree.toFixed(1)}° nel segno` : ""}`,
    );
  } else {
    lines.push("ASCENDENTE: non disponibile (servono ora e luogo di nascita)");
  }

  lines.push(
    `QUALITÀ DATI: ${chart.dataQuality === "full" ? "completi (data, ora, luogo)" : chart.dataQuality === "date-time" ? "parziali (data e ora, ma manca il luogo)" : "minimi (solo data di nascita)"}`,
  );

  return lines.join("\n");
}

function buildIndividualPrompt(
  data: IndividualChartPromptData,
  length: CommentaryLength,
): string {
  const chartText = formatChartForPrompt(data);
  return `Genera un commento ${length === "short" ? "BREVE (100-150 parole)" : "COMPLETO (300-450 parole)"} per questa carta natale:

${chartText}`;
}

function buildSynastryPrompt(
  data: SynastryPromptData,
  length: CommentaryLength,
): string {
  const chartA = formatChartForPrompt(data.personA);
  const chartB = formatChartForPrompt(data.personB);

  return `Genera un commento di sinastria ${length === "short" ? "BREVE (100-150 parole)" : "COMPLETO (300-450 parole)"} per queste due persone:

--- PERSONA A ---
${chartA}

--- PERSONA B ---
${chartB}

TIPO DI RELAZIONE: ${data.personA.name} è ${data.personB.relationship.toLowerCase()} di ${data.personB.name}.`;
}

// ---- Generation Functions ----

const MODEL_FREE = "gpt-4o-mini";
const MODEL_PREMIUM = "gpt-4o-mini"; // Use same model for now, premium just gets longer output

/**
 * Generate a streaming individual chart commentary.
 * Returns a ReadableStream for real-time display.
 */
export function streamIndividualCommentary(
  data: IndividualChartPromptData,
  length: CommentaryLength,
) {
  const model = length === "short" ? MODEL_FREE : MODEL_PREMIUM;

  return streamText({
    model: openai(model),
    system: SYSTEM_PROMPT_INDIVIDUAL,
    prompt: buildIndividualPrompt(data, length),
    maxOutputTokens: length === "short" ? 250 : 700,
    temperature: 0.7,
  });
}

/**
 * Generate a streaming synastry commentary.
 */
export function streamSynastryCommentary(
  data: SynastryPromptData,
  length: CommentaryLength,
) {
  const model = length === "short" ? MODEL_FREE : MODEL_PREMIUM;

  return streamText({
    model: openai(model),
    system: SYSTEM_PROMPT_SYNASTRY,
    prompt: buildSynastryPrompt(data, length),
    maxOutputTokens: length === "short" ? 250 : 700,
    temperature: 0.7,
  });
}

/**
 * Generate a non-streaming individual chart commentary.
 * Used for caching — returns the full text at once.
 */
export async function generateIndividualCommentary(
  data: IndividualChartPromptData,
  length: CommentaryLength,
): Promise<string> {
  const model = length === "short" ? MODEL_FREE : MODEL_PREMIUM;

  const result = await generateText({
    model: openai(model),
    system: SYSTEM_PROMPT_INDIVIDUAL,
    prompt: buildIndividualPrompt(data, length),
    maxOutputTokens: length === "short" ? 250 : 700,
    temperature: 0.7,
  });

  return result.text;
}

/**
 * Generate a non-streaming synastry commentary.
 */
export async function generateSynastryCommentary(
  data: SynastryPromptData,
  length: CommentaryLength,
): Promise<string> {
  const model = length === "short" ? MODEL_FREE : MODEL_PREMIUM;

  const result = await generateText({
    model: openai(model),
    system: SYSTEM_PROMPT_SYNASTRY,
    prompt: buildSynastryPrompt(data, length),
    maxOutputTokens: length === "short" ? 250 : 700,
    temperature: 0.7,
  });

  return result.text;
}
