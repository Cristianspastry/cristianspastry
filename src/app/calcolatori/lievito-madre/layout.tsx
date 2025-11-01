import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Lievito Madre | Cristian\'s Pastry',
  description: 'Calcola i rinfreschi del lievito madre e converti da lievito madre a lievito di birra. Strumento indispensabile per la gestione della pasta madre.',
  keywords: [
    'lievito madre',
    'pasta madre',
    'rinfresco lievito',
    'conversione lievito',
    'sourdough',
  ],
  openGraph: {
    title: 'Calcolatore Lievito Madre | Cristian\'s Pastry',
    description: 'Calcola i rinfreschi del lievito madre e converti da lievito madre a lievito di birra.',
    type: 'website',
  },
}

export default function LievitoMadreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
