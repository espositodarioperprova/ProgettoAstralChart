"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";

const faqs = [
  {
    q: "Devo sapere l'ora esatta di nascita?",
    a: "No, non è obbligatoria. L'ora di nascita serve a calcolare l'Ascendente e la posizione della Luna, ma se non la conosci calcoleremo comunque il segno solare e molte delle sinastrie. Consiglio: prova a chiedere ai tuoi genitori o a controllare il certificato di nascita!",
  },
  {
    q: "Quanto è accurato il calcolo del tema natale?",
    a: "Le posizioni planetarie vengono calcolate da un motore astronomico reale basato su effemeridi professionali — lo stesso tipo di dati usati negli osservatori. Non è un chatbot che \"indovina\": Sole, Luna, Ascendente e aspetti sono computati matematicamente con precisione al secondo d'arco. Solo dopo il calcolo, l'AI interpreta i risultati in modo personalizzato. È una differenza fondamentale: un LLM da solo non può calcolare dove si trovava la Luna il giorno della tua nascita.",
  },
  {
    q: 'In che cosa consiste la "sinastria"?',
    a: "La sinastria confronta i temi natali di due persone per capire come i loro pianeti interagiscono. Analizza aspetti come congiunzioni, opposizioni e trigoni per rivelare affinità, tensioni e dinamiche relazionali. È uno degli strumenti più potenti dell'astrologia.",
  },
  {
    q: "Non potrei ottenere lo stesso risultato con ChatGPT?",
    a: "No, e il motivo è tecnico: un modello linguistico (LLM) come ChatGPT non ha un motore di calcolo astronomico. Può inventare risposte che suonano plausibili, ma non può computare la posizione reale della Luna o calcolare il tuo Ascendente per il giorno, l'ora e il luogo esatti della tua nascita. AstralChart fa entrambe le cose: prima calcola con un motore proprietario, poi interpreta con l'AI. Sono due passaggi distinti — ed è proprio questa combinazione che rende i risultati affidabili e impossibili da replicare con un semplice prompt.",
  },
  {
    q: "I miei dati personali sono al sicuro?",
    a: "Assolutamente sì. I dati di nascita vengono elaborati in tempo reale e non vengono condivisi con terze parti. I pagamenti sono gestiti da Lemon Squeezy, un Merchant of Record certificato, che non ci trasmette mai i dati della tua carta. Per gli utenti free non è nemmeno necessaria la registrazione.",
  },
  {
    q: "Cosa include il piano Premium?",
    a: 'Con il pagamento unico sblocchi tutte le sinastrie della famiglia (fino a 15 coppie con 6 membri), commenti AI approfonditi con "consigli di vita" personalizzati, e la possibilità di esportare tutto in un report PDF stampabile. Non è un abbonamento: paghi una volta e basta.',
  },
  {
    q: "Posso avere un rimborso?",
    a: "Sì. Se non sei soddisfatto, contattaci entro 14 giorni e riceverai un rimborso completo, senza domande. Il rimborso è gestito direttamente da Lemon Squeezy.",
  },
  {
    q: "Funziona anche da smartphone?",
    a: "Certo! L'app è completamente responsiva e pensata per funzionare perfettamente su qualsiasi dispositivo: smartphone, tablet e desktop.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors hover:border-white/20">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="pr-4 text-base font-medium text-white">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl text-indigo-300"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-indigo-200/60">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Domande frequenti
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-indigo-200/60">
              Non trovi la risposta?{" "}
              <a
                href="#contatti"
                className="text-indigo-300 underline decoration-indigo-300/30 underline-offset-2 transition-colors hover:text-white"
              >
                Scrivici
              </a>{" "}
              e ti rispondiamo entro 24 ore.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer stagger={0.06} className="mt-16 space-y-3">
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <FaqItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
