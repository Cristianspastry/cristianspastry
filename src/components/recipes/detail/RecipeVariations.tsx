import { PortableText } from '@portabletext/react'
import { Card } from '@/components/ui/card'
import { Shuffle, Sparkles } from 'lucide-react'

interface RecipeVariationsProps {
  variations: any[] // PortableText content
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
    ),
    h3: ({ children }: any) => (
      <h4 className="text-lg font-bold text-primary-900 mb-2 mt-4 first:mt-0">{children}</h4>
    ),
    h4: ({ children }: any) => (
      <h5 className="text-base font-semibold text-primary-800 mb-2 mt-3">{children}</h5>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2 my-4 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <span className="mt-1.5 flex-shrink-0">
          <Sparkles className="h-4 w-4 text-green-500" />
        </span>
        <span className="text-gray-700">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700 ml-2">{children}</li>
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

export function RecipeVariations({ variations }: RecipeVariationsProps) {
  if (!variations || variations.length === 0) return null

  return (
    <Card className="mt-8 overflow-hidden border-2 border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="relative">
        {/* Header decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
              <Shuffle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900">
                Varianti
              </h3>
              <p className="text-sm text-gray-600">
                Personalizza la ricetta secondo i tuoi gusti
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-green-200/50">
            <PortableText 
              value={variations} 
              components={portableTextComponents}
            />
          </div>

          {/* Footer decorativo */}
          <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50/50 rounded-lg p-3 border border-green-200/50">
            <Sparkles className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium">Sperimenta e rendi la ricetta unica!</span>
          </div>
        </div>
      </div>
    </Card>
  )
}