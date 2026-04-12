import { Metadata } from 'next'
import Link from 'next/link'
import PageTransition from '@/components/shared/PageTransition'
import {
  Calculator,
  Scale,
  Droplet,
  Percent,
  Timer,
  ArrowRightLeft,
  Wheat,
  RulerIcon,
  Clock
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calcolatori per Pasticceria | Cristian\'s Pastry',
  description: 'Strumenti professionali per calcolare percentuali panettiere, idratazione impasti, conversioni unità e molto altro. La matematica resa semplice per pasticceri.',
  keywords: ['calcolatori pasticceria', 'baker\'s percentage', 'idratazione impasto', 'conversione unità', 'lievito madre'],
  openGraph: {
    title: 'Calcolatori per Pasticceria | Cristian\'s Pastry',
    description: 'Strumenti professionali per pasticceria: calcoli, conversioni e molto altro.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Calcolatori Pasticceria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calcolatori per Pasticceria | Cristian\'s Pastry',
    description: 'Strumenti professionali per pasticceria.',
    images: ['/og-image.svg'],
  },
}

interface Calculator {
  id: string
  title: string
  description: string
  icon: any
  color: string
  href: string
}

const calculators: Calculator[] = [
  {
    id: 'bakers-percentage',
    title: 'Baker\'s Percentage',
    description: 'Calcola le percentuali professionali del panettiere basate sul peso della farina',
    icon: Percent,
    color: 'from-blue-500 to-blue-600',
    href: '/calcolatori/bakers-percentage'
  },
  {
    id: 'conversione-unita',
    title: 'Conversione Unità',
    description: 'Converti grammi, tazze, cucchiai, once e temperature tra diversi sistemi',
    icon: ArrowRightLeft,
    color: 'from-green-500 to-green-600',
    href: '/calcolatori/conversione-unita'
  },
  {
    id: 'idratazione',
    title: 'Idratazione Impasto',
    description: 'Calcola la percentuale di idratazione e la consistenza finale dell\'impasto',
    icon: Droplet,
    color: 'from-cyan-500 to-cyan-600',
    href: '/calcolatori/idratazione'
  },
  {
    id: 'scaling-ricette',
    title: 'Scaling Ricette',
    description: 'Adatta automaticamente le quantità degli ingredienti per più o meno porzioni',
    icon: Scale,
    color: 'from-purple-500 to-purple-600',
    href: '/calcolatori/scaling-ricette'
  },
  {
    id: 'lievito-madre',
    title: 'Lievito Madre',
    description: 'Calcola i rinfreschi e le conversioni tra lievito madre e lievito di birra',
    icon: Wheat,
    color: 'from-amber-500 to-amber-600',
    href: '/calcolatori/lievito-madre'
  },
  {
    id: 'temperatura-impasto',
    title: 'Temperatura Finale',
    description: 'Calcola la temperatura dell\'acqua necessaria per ottenere l\'impasto perfetto',
    icon: Timer,
    color: 'from-red-500 to-red-600',
    href: '/calcolatori/temperatura-impasto'
  },
  {
    id: 'teglie',
    title: 'Calcolatore Teglie',
    description: 'Determina la quantità di impasto necessaria per teglie di diverse dimensioni',
    icon: RulerIcon,
    color: 'from-indigo-500 to-indigo-600',
    href: '/calcolatori/teglie'
  },
  {
    id: 'tempi-lievitazione',
    title: 'Tempi Lievitazione',
    description: 'Calcola i tempi di lievitazione in base alla temperatura ambiente',
    icon: Clock,
    color: 'from-orange-500 to-orange-600',
    href: '/calcolatori/tempi-lievitazione'
  },
  {
    id: 'convertitore-bloom',
    title: 'Convertitore Bloom',
    description: 'Converti gelatine con diversa forza Bloom e calcola l\'idratazione corretta',
    icon: Droplet,
    color: 'from-pink-500 to-pink-600',
    href: '/calcolatori/convertitore-bloom'
  },
  {
    id: 'forza-farina',
    title: 'Mix Forza W',
    description: 'Miscela farine con diversa forza W per ottenere la forza desiderata',
    icon: Wheat,
    color: 'from-amber-600 to-amber-700',
    href: '/calcolatori/forza-farina'
  }
]

export default function CalcolatoriPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Calcolatori per Pasticceria
            </h1>
            <p className="text-xl text-primary-100">
              La matematica non è il tuo forte? Nessun problema!
              <br />
              Strumenti professionali per semplificare i tuoi calcoli in cucina.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {calculators.map((calculator) => {
              const Icon = calculator.icon
              return (
                <Link
                  key={calculator.id}
                  href={calculator.href}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${calculator.color} opacity-0 transition-opacity group-hover:opacity-10`} />

                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${calculator.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                    {calculator.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {calculator.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Apri calcolatore
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Perché usare i calcolatori?
            </h2>
            <p className="mb-8 text-gray-600">
              Questi strumenti sono stati sviluppati per aiutare sia hobbisti che professionisti
              a ottenere risultati perfetti e costanti in pasticceria e panificazione.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-3 text-3xl">🎯</div>
                <h3 className="mb-2 font-semibold text-gray-900">Precisione</h3>
                <p className="text-sm text-gray-600">
                  Calcoli accurati per risultati professionali
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-3 text-3xl">⚡</div>
                <h3 className="mb-2 font-semibold text-gray-900">Velocità</h3>
                <p className="text-sm text-gray-600">
                  Risparmia tempo nei tuoi preparativi
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-3 text-3xl">📱</div>
                <h3 className="mb-2 font-semibold text-gray-900">Ovunque</h3>
                <p className="text-sm text-gray-600">
                  Usa i calcolatori da qualsiasi dispositivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
