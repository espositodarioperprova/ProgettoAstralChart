"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { AddMemberForm } from "@/components/calcola/AddMemberForm";
import { MembersList } from "@/components/calcola/MembersList";
import { ResultsPanel } from "@/components/calcola/ResultsPanel";

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
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(async () => {
    if (members.length === 0) return;

    setIsCalculating(true);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    // Simulate calculation delay (will be replaced by real engine)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsCalculating(false);
  }, [members]);

  const handleClearAll = useCallback(() => {
    setShowResults(false);
    setIsCalculating(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 transition-colors hover:text-indigo-600"
          >
            🌟 AstralChart
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">
              {members.length}/{maxMembers} membri
            </span>
            {/* TODO: Add auth button (Accedi / Registrati) */}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
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

          {/* Right column: Results */}
          <div ref={resultsRef} className="lg:col-span-3">
            {showResults ? (
              <ResultsPanel members={members} isCalculating={isCalculating} />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
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
      <footer className="mt-20 border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        <p>
          AstralChart © {new Date().getFullYear()} • L&apos;astrologia è per
          intrattenimento, non sostituisce consigli professionali.
        </p>
      </footer>
    </div>
  );
}
