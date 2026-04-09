import Link from "next/link";

const footerLinks = {
  Prodotto: [
    { label: "Come funziona", href: "#come-funziona" },
    { label: "Funzionalità", href: "#funzionalita" },
    { label: "Prezzi", href: "#prezzi" },
    { label: "FAQ", href: "#faq" },
  ],
  Legale: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Termini di Servizio", href: "/termini" },
    { label: "Cookie Policy", href: "/cookie" },
  ],
  Supporto: [
    { label: "Contattaci", href: "#contatti" },
    { label: "Segnala un problema", href: "#contatti" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-white">
              ✦ AstralChart
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-indigo-200/50">
              Scopri le dinamiche astrologiche della tua famiglia con
              l&apos;intelligenza artificiale.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">
                {title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-indigo-200/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-indigo-200/30">
            © {new Date().getFullYear()} AstralChart. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-indigo-200/30">
            Fatto con ♥ e un po&apos; di polvere di stelle
          </p>
        </div>
      </div>
    </footer>
  );
}
