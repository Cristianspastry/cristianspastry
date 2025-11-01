import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Conversione Teglie | Cristian\'s Pastry',
  description: 'Converti quantità ingredienti tra teglie di dimensioni diverse. Adatta le tue ricette a qualsiasi formato di stampo mantenendo le proporzioni perfette.',
  keywords: [
    'conversione teglie',
    'dimensioni teglie',
    'scalare ricetta',
    'stampi diversi',
    'adattare ricetta',
  ],
  openGraph: {
    title: 'Calcolatore Conversione Teglie | Cristian\'s Pastry',
    description: 'Converti quantità ingredienti tra teglie di dimensioni diverse.',
    type: 'website',
  },
}

export default function TeglieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
