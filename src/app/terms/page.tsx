import type { Metadata } from "next";

import { siteConfig } from "@/core/constants/config";

export const metadata: Metadata = {
  title: `Termini e Condizioni | ${siteConfig.name}`,
  description:
    "Termini e condizioni d'uso del sito Cristian's Pastry.",
};

export default function TermsPage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
            Documenti legali
          </p>
          <h1 className="mt-3 text-4xl font-serif font-bold text-primary-900">
            Termini e Condizioni
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Ultimo aggiornamento: 13 marzo 2026
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                1. Accettazione dei termini
              </h2>
              <p className="mt-2">
                Utilizzando questo sito, accetti i presenti termini e condizioni.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                2. Uso del sito
              </h2>
              <p className="mt-2">
                Il sito e destinato a uso personale e informativo. E vietato
                utilizzare i contenuti per finalita illecite o non autorizzate.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                3. Proprieta intellettuale
              </h2>
              <p className="mt-2">
                Testi, immagini e contenuti sono di proprieta di{" "}
                {siteConfig.name} o dei rispettivi autori. E vietata la
                riproduzione non autorizzata.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                4. Account e accesso
              </h2>
              <p className="mt-2">
                L&apos;utente e responsabile delle credenziali di accesso e
                delle attivita svolte con il proprio account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                5. Limitazione di responsabilita
              </h2>
              <p className="mt-2">
                {siteConfig.name} non e responsabile di danni diretti o indiretti
                derivanti dall&apos;uso del sito o dei contenuti.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                6. Link a terze parti
              </h2>
              <p className="mt-2">
                Il sito puo contenere link a risorse esterne. Non siamo responsabili
                dei contenuti o delle policy di terze parti.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                7. Modifiche ai termini
              </h2>
              <p className="mt-2">
                Ci riserviamo il diritto di aggiornare i termini in qualsiasi
                momento. Le modifiche saranno pubblicate su questa pagina.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                8. Contatti
              </h2>
              <p className="mt-2">
                Per domande sui termini, scrivi a {siteConfig.contact.email}.
              </p>
            </section>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              Questo testo e un modello di base. Per la conformita legale,
              consultare un professionista.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
