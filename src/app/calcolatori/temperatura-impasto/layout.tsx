import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Temperatura Impasto | Cristian\'s Pastry',
  description: 'Calcola la temperatura dell\'acqua per ottenere la temperatura finale ideale dell\'impasto. Essenziale per panificazione e pasticceria professionale.',
  keywords: [
    'temperatura impasto',
    'temperatura acqua',
    'temperatura finale',
    'panificazione',
    'temperatura lievitazione',
  ],
  openGraph: {
    title: 'Calcolatore Temperatura Impasto | Cristian\'s Pastry',
    description: 'Calcola la temperatura dell\'acqua per ottenere la temperatura finale ideale dell\'impasto.',
    type: 'website',
  },
}

export default function TemperaturaImpastoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
