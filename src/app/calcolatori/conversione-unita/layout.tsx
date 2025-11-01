import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertitore Unità di Misura | Cristian\'s Pastry',
  description: 'Converti tra grammi, tazze, cucchiai, once e temperature. Strumento completo per adattare ricette da qualsiasi sistema di misura.',
  keywords: [
    'conversione unità',
    'grammi cups',
    'conversione temperature',
    'oz grammi',
    'cucchiai grammi',
  ],
  openGraph: {
    title: 'Convertitore Unità di Misura | Cristian\'s Pastry',
    description: 'Converti tra grammi, tazze, cucchiai, once e temperature.',
    type: 'website',
  },
}

export default function ConversioneUnitaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
