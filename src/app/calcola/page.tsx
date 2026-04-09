"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { AddMemberForm } from "@/components/calcola/AddMemberForm";
import { MembersList } from "@/components/calcola/MembersList";
import { ResultsPanel } from "@/components/calcola/ResultsPanel";
import type { ComputedChart } from "@/lib/astrology/chart-engine";
import type { FamilyMemberInput } from "@/types/astrology";

export default function CalcolaPage() {
  const {
    members,
    maxMembers,
    canAddMore,
    addMember,
    removeMember,
    startEditing,
  } = useFamilyMembers();

  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [charts, setCharts] = useState<Record<string, ComputedChart>>({});
  const [commentaries, setCommentaries] = useState<Record<string, string>>({});
  const [synastryCommentaries, setSynastryCommentaries] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /** Call /api/generate for one member (individual chart + AI commentary) */
  async function fetchIndividualChart(member: FamilyMemberInput) {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "individual",
        members: [member],
        tier: "free",
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Errore ${res.status}`);
    }
    return res.json() as Promise<{
      chart: ComputedChart;
      commentary: string;
      cached: boolean;
    }>;
  }

  /** Call /api/generate for a synastry pair */
  async function fetchSynastryPair(a: FamilyMemberInput, b: FamilyMemberInput) {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "synastry",
        members: [a, b],
        tier: "free",
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Errore ${res.status}`);
    }
    return res.json() as Promise<{
      chartA: ComputedChart;
      chartB: ComputedChart;
      commentary: string;
      cached: boolean;
    }>;
  }

  const handleCalculate = useCallback(async () => {
    if (members.length === 0) return;

    setError(null);
    setIsCalculating(true);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    try {
      // Phase 1: Compute charts + AI commentary for all members (parallel)
      setIsGeneratingAI(true);
      const individualResults = await Promise.all(
        members.map((m) =>
          fetchIndividualChart(m).catch((err) => ({
            error: err.message,
            member: m,
          })),
        ),
      );

      const newCharts: Record<string, ComputedChart> = {};
      const newCommentaries: Record<string, string> = {};

      for (let i = 0; i < members.length; i++) {
        const result = individualResults[i];
        if ("error" in result) {
          console.warn(
            `Failed to generate for ${result.member.name}:`,
            result.error,
          );
          continue;
        }
        newCharts[members[i].id] = result.chart;
        newCommentaries[members[i].id] = result.commentary;
      }

      setCharts(newCharts);
      setCommentaries(newCommentaries);
      setIsCalculating(false);

      // Phase 2: Generate synastry for first pair (free tier = 1 pair only)
      if (members.length >= 2) {
        const [a, b] = [members[0], members[1]];
        try {
          const synResult = await fetchSynastryPair(a, b);
          // Update charts if they weren't set yet
          setCharts((prev) => ({
            ...prev,
            [a.id]: synResult.chartA,
            [b.id]: synResult.chartB,
          }));
          setSynastryCommentaries({
            [`${a.id}-${b.id}`]: synResult.commentary,
          });
        } catch (synErr) {
          console.warn("Synastry generation failed:", synErr);
        }
      }

      setIsGeneratingAI(false);
    } catch (err) {
      console.error("Calculation error:", err);
      setError(
        err instanceof Error ? err.message : "Errore durante il calcolo.",
      );
      setIsCalculating(false);
      setIsGeneratingAI(false);
    }
  }, [members]);

  const handleClearAll = useCallback(() => {
    setShowResults(false);
    setIsCalculating(false);
    setIsGeneratingAI(false);
    setCharts({});
    setCommentaries({});
    setSynastryCommentaries({});
    setError(null);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 transition-colors hover:text-indigo-600"
          >
            🌟 AstralChart
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href="/#come-funziona"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Come funziona
            </Link>
            <Link
              href="/#prezzi"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Prezzi
            </Link>
            <Link
              href="/#faq"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">
              {members.length}/{maxMembers} membri
            </span>
            {/* Mobile back link */}
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 md:hidden"
            >
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Page title */}
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Calcola la tua{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              carta astrale familiare
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-base text-slate-500"
          >
            Aggiungi i membri della tua famiglia e scopri come le stelle
            influenzano i vostri legami.
          </motion.p>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left column: Form + Members list */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Input form card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-5 text-lg font-bold text-slate-900">
                  Aggiungi un membro
                </h2>
                <AddMemberForm
                  onAdd={addMember}
                  canAddMore={canAddMore}
                  currentCount={members.length}
                  maxMembers={maxMembers}
                />
              </motion.div>

              {/* Members list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    La tua famiglia
                  </h2>
                  {members.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs font-medium text-slate-400 transition-colors hover:text-red-500"
                    >
                      Rimuovi tutti
                    </button>
                  )}
                </div>
                <MembersList
                  members={members}
                  onRemove={removeMember}
                  onEdit={startEditing}
                />
              </motion.div>

              {/* Calculate button */}
              {members.length >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300 disabled:cursor-wait disabled:opacity-70"
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Calcolando...
                      </span>
                    ) : (
                      <>✨ Calcola carte astrali</>
                    )}
                  </button>
                  {members.length === 1 && (
                    <p className="mt-2 text-center text-xs text-slate-400">
                      Aggiungi almeno 2 membri per la sinastria
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right column: Results — stretches to match left column height */}
          <div ref={resultsRef} className="flex lg:col-span-3">
            {showResults ? (
              <div className="w-full">
                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    ⚠️ {error}
                  </div>
                )}
                <ResultsPanel
                  members={members}
                  isCalculating={isCalculating}
                  charts={charts}
                  commentaries={commentaries}
                  synastryCommentaries={synastryCommentaries}
                  isGeneratingAI={isGeneratingAI}
                />
              </div>
            ) : (
              <div className="flex w-full flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
                <div>
                  <div className="mx-auto mb-4 text-5xl">🌌</div>
                  <h3 className="text-lg font-semibold text-slate-600">
                    I risultati appariranno qui
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-slate-400">
                    Aggiungi i membri della tua famiglia e premi
                    &quot;Calcola&quot; per scoprire le carte astrali.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer — minimal for the app page */}
      <footer className="mt-auto border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        <p>
          AstralChart © {new Date().getFullYear()} • L&apos;astrologia è per
          intrattenimento, non sostituisce consigli professionali.
        </p>
      </footer>
    </div>
  );
}
