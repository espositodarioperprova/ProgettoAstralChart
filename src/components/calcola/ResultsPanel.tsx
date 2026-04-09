"use client";

import { motion } from "framer-motion";
import type { FamilyMemberInput, ZodiacSign } from "@/types/astrology";
import { getSunSign, getZodiacSymbol, getElement } from "@/lib/astrology";
import { ZODIAC_SIGNS } from "@/types/astrology";

interface ResultsPanelProps {
  members: FamilyMemberInput[];
  isCalculating: boolean;
}

function getSignDescription(sign: ZodiacSign): string {
  const descriptions: Record<ZodiacSign, string> = {
    Ariete:
      "Energico, coraggioso e determinato. L'Ariete è il pioniere dello zodiaco, sempre pronto a nuove avventure.",
    Toro: "Affidabile, paziente e devoto. Il Toro apprezza la stabilità e i piaceri sensoriali della vita.",
    Gemelli:
      "Curioso, adattabile e comunicativo. I Gemelli sono lo spirito vivace e intellettuale dello zodiaco.",
    Cancro:
      "Intuitivo, premuroso e protettivo. Il Cancro è il custode emotivo della famiglia.",
    Leone:
      "Generoso, caloroso e creativo. Il Leone brilla con carisma naturale e leadership.",
    Vergine:
      "Analitico, attento e premuroso. La Vergine porta ordine e cura nei dettagli.",
    Bilancia:
      "Diplomatico, armonioso e giusto. La Bilancia cerca equilibrio e bellezza in ogni cosa.",
    Scorpione:
      "Intenso, passionale e profondo. Lo Scorpione vive le emozioni con rara intensità.",
    Sagittario:
      "Ottimista, avventuroso e filosofico. Il Sagittario è l'eterno cercatore di verità.",
    Capricorno:
      "Ambizioso, disciplinato e responsabile. Il Capricorno costruisce con pazienza e determinazione.",
    Acquario:
      "Innovativo, indipendente e visionario. L'Acquario guarda sempre verso il futuro.",
    Pesci:
      "Empatico, creativo e intuitivo. I Pesci navigano tra sogno e realtà con grazia.",
  };
  return descriptions[sign];
}

function ElementBadge({ element }: { element: string }) {
  const colors: Record<string, string> = {
    Fuoco: "bg-orange-50 text-orange-600",
    Terra: "bg-emerald-50 text-emerald-600",
    Aria: "bg-sky-50 text-sky-600",
    Acqua: "bg-blue-50 text-blue-600",
  };
  const icons: Record<string, string> = {
    Fuoco: "🔥",
    Terra: "🌍",
    Aria: "💨",
    Acqua: "💧",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[element] || ""}`}
    >
      {icons[element]} {element}
    </span>
  );
}

function IndividualResult({ member }: { member: FamilyMemberInput }) {
  const sunSign = getSunSign(member.birthDate);
  const symbol = getZodiacSymbol(sunSign);
  const element = getElement(sunSign);
  const signInfo = ZODIAC_SIGNS.find((s) => s.name === sunSign);
  const description = getSignDescription(sunSign);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-3xl">
          {symbol}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.relationship}</p>
        </div>
      </div>

      {/* Sun sign result */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-700">
            ☀️ Segno solare:
          </span>
          <span className="text-sm font-bold text-indigo-600">
            {symbol} {sunSign}
          </span>
          <ElementBadge element={element} />
          {signInfo && (
            <span className="text-xs text-slate-400">
              ({signInfo.dateRange})
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-slate-600">{description}</p>

        {/* Placeholder for Moon + Ascendant (requires birth time) */}
        {member.birthTime ? (
          <div className="mt-3 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4">
            <p className="text-sm font-medium text-indigo-600">
              🌙 Luna e Ascendente
            </p>
            <p className="mt-1 text-xs text-indigo-400">
              Calcolo avanzato in arrivo — richiede un motore di effemeridi.
              L&apos;ora di nascita ({member.birthTime}) è stata registrata.
            </p>
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              💡 Aggiungi l&apos;ora di nascita per ottenere Luna, Ascendente e
              case.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SynastryPreview({
  memberA,
  memberB,
  isLocked,
}: {
  memberA: FamilyMemberInput;
  memberB: FamilyMemberInput;
  isLocked: boolean;
}) {
  const signA = getSunSign(memberA.birthDate);
  const signB = getSunSign(memberB.birthDate);
  const symbolA = getZodiacSymbol(signA);
  const symbolB = getZodiacSymbol(signB);
  const elementA = getElement(signA);
  const elementB = getElement(signB);

  // Basic element compatibility
  const sameElement = elementA === elementB;
  const compatibleElements =
    (elementA === "Fuoco" && elementB === "Aria") ||
    (elementA === "Aria" && elementB === "Fuoco") ||
    (elementA === "Terra" && elementB === "Acqua") ||
    (elementA === "Acqua" && elementB === "Terra");

  const compatibilityLevel = sameElement
    ? "Alta"
    : compatibleElements
      ? "Buona"
      : "Da esplorare";

  const compatibilityColor = sameElement
    ? "text-emerald-600"
    : compatibleElements
      ? "text-blue-600"
      : "text-amber-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl border p-6 shadow-sm ${
        isLocked ? "border-slate-200 bg-slate-50" : "border-slate-100 bg-white"
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-2 text-3xl">🔒</div>
            <p className="text-sm font-semibold text-slate-700">
              Sinastria completa
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Disponibile con Premium
            </p>
            <button className="mt-3 rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500">
              Sblocca tutto →
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="text-2xl">{symbolA}</span>
        <span className="text-slate-300">⟷</span>
        <span className="text-2xl">{symbolB}</span>
        <div className="ml-2">
          <h4 className="text-sm font-bold text-slate-900">
            {memberA.name} & {memberB.name}
          </h4>
          <p className="text-xs text-slate-500">
            {signA} – {signB}
          </p>
        </div>
      </div>

      {!isLocked && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Affinità elementale:</span>
            <span className={`text-sm font-semibold ${compatibilityColor}`}>
              {compatibilityLevel}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            {sameElement
              ? `Entrambi appartenenti all'elemento ${elementA}. Questa connessione porta comprensione naturale e sintonia profonda.`
              : compatibleElements
                ? `${elementA} e ${elementB} sono elementi complementari. Questa combinazione porta equilibrio e arricchimento reciproco.`
                : `${elementA} e ${elementB} hanno energie diverse. Questa combinazione richiede comprensione e adattamento, ma può portare grande crescita.`}
          </p>
          <div className="mt-3 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-3">
            <p className="text-xs text-indigo-500">
              ✨ Commento AI dettagliato in arrivo — richiede collegamento
              OpenAI.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function ResultsPanel({ members, isCalculating }: ResultsPanelProps) {
  if (members.length === 0) {
    return null;
  }

  // Generate all pairs for synastry
  const pairs: [FamilyMemberInput, FamilyMemberInput][] = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      pairs.push([members[i], members[j]]);
    }
  }

  return (
    <div className="space-y-8">
      {/* Calculating overlay */}
      {isCalculating && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-medium text-indigo-700">
            Calcolando le carte astrali...
          </p>
        </div>
      )}

      {/* Individual charts */}
      {!isCalculating && (
        <>
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              ☀️ Carte individuali
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {members.map((member) => (
                <IndividualResult key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Synastry pairs */}
          {pairs.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                ✨ Sinastrie
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {pairs.map(([a, b], index) => (
                  <SynastryPreview
                    key={`${a.id}-${b.id}`}
                    memberA={a}
                    memberB={b}
                    isLocked={index >= 1} // First pair is free, rest locked
                  />
                ))}
              </div>
              {pairs.length > 1 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-500">
                    {pairs.length - 1} sinastrie bloccate •{" "}
                    <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Sblocca tutte con Premium →
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
