import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Tempi di Lievitazione | Cristian\'s Pastry',
  description: 'Calcola i tempi di lievitazione in base a temperatura e quantità di lievito. Pianifica perfettamente i tuoi impasti lievitati.',
  keywords: [
    'tempi lievitazione',
    'calcolo lievitazione',
    'temperatura lievitazione',
    'lievito di birra',
    'pianificazione impasti',
  ],
  openGraph: {
    title: 'Calcolatore Tempi di Lievitazione | Cristian\'s Pastry',
    description: 'Calcola i tempi di lievitazione in base a temperatura e quantità di lievito.',
    type: 'website',
  },
}

export default function TempiLievitazioneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
