import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Scaling Ricette | Cristian\'s Pastry',
  description: 'Scala le tue ricette per più o meno porzioni mantenendo le proporzioni perfette. Aumenta o riduci qualsiasi ricetta in modo professionale.',
  keywords: [
    'scaling ricette',
    'scalare ricetta',
    'moltiplicare ricetta',
    'più porzioni',
    'adattare quantità',
  ],
  openGraph: {
    title: 'Calcolatore Scaling Ricette | Cristian\'s Pastry',
    description: 'Scala le tue ricette per più o meno porzioni mantenendo le proporzioni perfette.',
    type: 'website',
  },
}

export default function ScalingRicetteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
