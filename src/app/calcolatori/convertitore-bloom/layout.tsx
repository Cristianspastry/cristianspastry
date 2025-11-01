import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertitore Bloom Gelatina | Cristian\'s Pastry',
  description: 'Converti tra diversi gradi Bloom della gelatina e calcola le quantità equivalenti. Strumento essenziale per mousse, bavaresi e desserts.',
  keywords: [
    'bloom gelatina',
    'conversione bloom',
    'gelatina fogli',
    'gelatina polvere',
    'gradi bloom',
  ],
  openGraph: {
    title: 'Convertitore Bloom Gelatina | Cristian\'s Pastry',
    description: 'Converti tra diversi gradi Bloom della gelatina per mousse e desserts perfetti.',
    type: 'website',
  },
}

export default function ConvertitoreBloomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
