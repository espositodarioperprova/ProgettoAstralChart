export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
      <main className="flex flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          🌟 AstralChart
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-indigo-200">
          Scopri le connessioni astrali tra i membri della tua famiglia. Carte
          astrali complete, sinastrie dettagliate e commenti personalizzati
          generati dall&apos;intelligenza artificiale.
        </p>
        <div className="mt-4 rounded-lg border border-indigo-500/30 bg-indigo-900/20 px-6 py-4 text-sm text-indigo-300">
          🚧 Sito in costruzione — Ci stiamo lavorando!
        </div>
      </main>
    </div>
  );
}
