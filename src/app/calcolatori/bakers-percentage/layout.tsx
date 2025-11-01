import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Baker\'s Percentage | Cristian\'s Pastry',
  description: 'Calcola le percentuali professionali del panettiere (baker\'s percentage) per impasti perfetti. Strumento essenziale per scalare ricette mantenendo le proporzioni ideali.',
  keywords: [
    'baker\'s percentage',
    'percentuale panettiere',
    'calcolo impasto',
    'percentuali pasticceria',
    'scalare ricette',
  ],
  openGraph: {
    title: 'Calcolatore Baker\'s Percentage | Cristian\'s Pastry',
    description: 'Calcola le percentuali professionali del panettiere per impasti perfetti.',
    type: 'website',
  },
}

export default function BakersPercentageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
