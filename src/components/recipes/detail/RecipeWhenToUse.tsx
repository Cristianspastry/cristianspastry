import { PortableText } from '@portabletext/react'
import { Card } from '@/components/ui/card'
import { Calendar, Star } from 'lucide-react'

interface RecipeWhenToUseProps {
  whenToUse: any[] // PortableText content
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
          <Star className="h-4 w-4 text-blue-500" />
        </span>
        <span className="text-gray-700">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="flex items-start gap-3 text-gray-700">
        <span className="font-semibold text-blue-600">{children}</span>
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

export function RecipeWhenToUse({ whenToUse }: RecipeWhenToUseProps) {
  if (!whenToUse || whenToUse.length === 0) return null

  return (
    <Card className="mt-8 overflow-hidden border-2 border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="relative">
        {/* Header decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900">
                Quando Usare Questa Ricetta
              </h3>
              <p className="text-sm text-gray-600">
                Le occasioni perfette per prepararlo
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-blue-200/50">
            <PortableText 
              value={whenToUse} 
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}