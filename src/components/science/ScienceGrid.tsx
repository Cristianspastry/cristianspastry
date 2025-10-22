import { Beaker } from 'lucide-react'
import { ScienceCard } from './ScienceCard'
import type { Science } from '@/sanity/lib/types'

interface ScienceGridProps {
  articles: Science[]
  columns?: 2 | 3 | 4
}

export function ScienceGrid({ articles, columns = 3 }: ScienceGridProps) {
  const gridCols = {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <Beaker className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <p className="text-gray-600">Nessun articolo scientifico disponibile al momento.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-8 ${gridCols[columns]}`}>
      {articles.map((article, index) => (
        <ScienceCard key={article._id} science={article} index={index} />
      ))}
    </div>
  )
}