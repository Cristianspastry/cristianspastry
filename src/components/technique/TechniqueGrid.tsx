import type { Technique } from "@/sanity/lib/types"
import { TechniqueCard } from "./TechniqueCard"

interface TechniqueGridProps {
  techniques: Technique[]
  columns?: 2 | 3 | 4
}

export function TechniqueGrid({ techniques, columns = 3 }: TechniqueGridProps) {
  const gridCols = {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
  }

  return (
    <div className={`grid gap-8 ${gridCols[columns]}`}>
      {techniques.map((technique, index) => (
        <TechniqueCard key={technique._id} technique={technique} index={index} />
      ))}
    </div>
  )
}
