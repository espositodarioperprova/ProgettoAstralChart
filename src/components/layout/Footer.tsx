export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white">🌟 AstralChart</h3>
            <p className="mt-2 text-sm leading-relaxed text-indigo-200/60">
              Scopri le connessioni astrali tra i membri della tua famiglia.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Prodotto
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#come-funziona"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Come funziona
                </a>
              </li>
              <li>
                <a
                  href="#funzionalita"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Funzionalità
                </a>
              </li>
              <li>
                <a
                  href="#prezzi"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Prezzi
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Supporto
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contatti"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Legale
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/termini"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a
                  href="/cookie"
                  className="text-sm text-indigo-200/60 transition-colors hover:text-white"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-indigo-200/40">
          © {currentYear} AstralChart. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
