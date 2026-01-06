import { PortableText } from '@portabletext/react'
import { Card } from '@/components/ui/card'
import { AlertTriangle, X } from 'lucide-react'

interface RecipeCommonMistakesProps {
  mistakes: any[] // PortableText content
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2 my-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <span className="mt-1.5 flex-shrink-0">
          <X className="h-4 w-4 text-red-500" />
        </span>
        <span className="text-gray-700">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="flex items-start gap-3 text-gray-700">
        <span className="font-semibold text-red-600">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-primary-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800">{children}</em>
    ),
  },
}

export function RecipeCommonMistakes({ mistakes }: RecipeCommonMistakesProps) {
  if (!mistakes || mistakes.length === 0) return null

  return (
    <Card className="mt-8 overflow-hidden border-2 border-red-100 bg-gradient-to-br from-red-50 via-white to-rose-50">
      <div className="relative">
        {/* Header decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-rose-500 shadow-lg shadow-red-500/30">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900">
                Errori Comuni da Evitare
              </h3>
              <p className="text-sm text-gray-600">
                Attenzione a questi passaggi critici
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-red-200/50">
            <PortableText 
              value={mistakes} 
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}