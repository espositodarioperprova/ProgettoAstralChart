"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Devo conoscere l'ora esatta di nascita?",
    answer:
      "No! Puoi iniziare con la sola data di nascita per scoprire il segno zodiacale. Se conosci anche l'ora, potrai ottenere un'analisi molto più dettagliata con Luna, Ascendente e case astrologiche.",
  },
  {
    question: "Cos'è la sinastria?",
    answer:
      "La sinastria è il confronto tra le carte natali di due persone. Permette di capire le dinamiche relazionali, le affinità e le sfide tra due individui — perfetta per capire i legami familiari.",
  },
  {
    question: "I commenti sono generati dall'intelligenza artificiale?",
    answer:
      "Sì! Utilizziamo modelli di AI avanzati per generare interpretazioni personalizzate e dettagliate basate sui dati astrologici reali. Non sono oroscopi generici — sono analisi specifiche per te e la tua famiglia.",
  },
  {
    question: "Posso provare prima di pagare?",
    answer:
      "Assolutamente. Il piano Curiosi è gratuito per sempre e non richiede registrazione. I piani a pagamento includono 7 giorni di prova gratuita.",
  },
  {
    question: "I miei dati sono al sicuro?",
    answer:
      "I dati di nascita sono informazioni personali e li trattiamo con la massima serietà. Utilizziamo crittografia e rispettiamo il GDPR. Puoi eliminare i tuoi dati in qualsiasi momento.",
  },
  {
    question: "Posso regalare un report a un familiare?",
    answer:
      "Presto! Stiamo lavorando alla funzione di esportazione PDF, perfetta per stampare e regalare le analisi ai tuoi cari.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-base font-medium text-white">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-xl text-indigo-400"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-indigo-200/70">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative bg-gradient-to-b from-indigo-950 to-slate-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fadeUp">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Domande frequenti
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="mt-12">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
