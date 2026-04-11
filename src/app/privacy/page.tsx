import type { Metadata } from "next";

import { siteConfig } from "@/core/constants/config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description:
    "Informativa sulla privacy di Cristian's Pastry. Scopri come vengono gestiti i dati personali.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
            Documenti legali
          </p>
          <h1 className="mt-3 text-4xl font-serif font-bold text-primary-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Ultimo aggiornamento: 13 marzo 2026
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                1. Titolare del trattamento
              </h2>
              <p className="mt-2">
                Il titolare del trattamento e {siteConfig.author}. Per contatti:
                {` ${siteConfig.contact.email}`}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                2. Tipi di dati raccolti
              </h2>
              <p className="mt-2">
                Possiamo raccogliere dati identificativi (nome, email), dati di
                utilizzo del sito, e informazioni inviate tramite moduli di
                contatto o registrazione.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                3. Finalita del trattamento
              </h2>
              <p className="mt-2">
                I dati sono utilizzati per fornire i servizi richiesti,
                gestire l&apos;account, migliorare il sito, e rispondere alle
                richieste degli utenti.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                4. Conservazione dei dati
              </h2>
              <p className="mt-2">
                Conserviamo i dati per il tempo necessario a fornire i servizi
                o per adempiere a obblighi di legge.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                5. Condivisione con terze parti
              </h2>
              <p className="mt-2">
                Alcuni dati possono essere condivisi con fornitori tecnici
                necessari per l&apos;erogazione del servizio (es. hosting,
                strumenti di analytics, provider email).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                6. Diritti dell&apos;utente
              </h2>
              <p className="mt-2">
                Hai diritto di accesso, rettifica, cancellazione e portabilita
                dei tuoi dati. Puoi esercitare i tuoi diritti scrivendo a{" "}
                {siteConfig.contact.email}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                7. Modifiche alla policy
              </h2>
              <p className="mt-2">
                Potremmo aggiornare questa informativa. Le modifiche saranno
                pubblicate su questa pagina.
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
