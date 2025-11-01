import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Forza della Farina (W) | Cristian\'s Pastry',
  description: 'Calcola la forza della farina (W) e il rapporto P/L per scegliere la farina più adatta alle tue preparazioni. Guida professionale alla selezione della farina.',
  keywords: [
    'forza farina',
    'W farina',
    'P/L farina',
    'proteine farina',
    'scelta farina',
  ],
  openGraph: {
    title: 'Calcolatore Forza della Farina (W) | Cristian\'s Pastry',
    description: 'Calcola la forza della farina (W) e il rapporto P/L per le tue preparazioni.',
    type: 'website',
  },
}

export default function ForzaFarinaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
