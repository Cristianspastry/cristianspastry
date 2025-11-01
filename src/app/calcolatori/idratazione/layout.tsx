import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calcolatore Idratazione Impasto | Cristian\'s Pastry',
  description: 'Calcola l\'idratazione del tuo impasto per pane e pizza. Determina la quantità perfetta di acqua rispetto alla farina per ottenere la consistenza ideale.',
  keywords: [
    'idratazione impasto',
    'calcolo idratazione',
    'percentuale acqua',
    'impasto pane',
    'impasto pizza',
  ],
  openGraph: {
    title: 'Calcolatore Idratazione Impasto | Cristian\'s Pastry',
    description: 'Calcola l\'idratazione perfetta del tuo impasto per pane e pizza.',
    type: 'website',
  },
}

export default function IdratazionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
