import { Card } from '@/components/ui/card'
import { Package, Clock, Snowflake } from 'lucide-react'

interface RecipeStorageProps {
  storage: string
}

export function RecipeStorage({ storage }: RecipeStorageProps) {
  if (!storage) return null

  return (
    <Card className="mt-8 overflow-hidden border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="relative">
        {/* Header decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 shadow-lg shadow-purple-500/30">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900">
                Conservazione
              </h3>
              <p className="text-sm text-gray-600">
                Come mantenere freschezza e qualità
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-purple-200/50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100">
                  <Snowflake className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">{storage}</p>
              </div>
            </div>
            
            {/* Tips decorativi */}
            <div className="mt-4 pt-4 border-t border-purple-200/50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Consiglio:</span>
                <span>Conserva sempre in contenitori ermetici per mantenere la freschezza</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}