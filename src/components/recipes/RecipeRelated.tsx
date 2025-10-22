import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock } from 'lucide-react'

interface RelatedItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImageUrl?: string
  mainImageAlt?: string
  prepTime?: number
  cookTime?: number
  difficulty?: string
}

interface RecipeRelatedProps {
  relatedRecipes?: RelatedItem[]
  relatedTechniques?: RelatedItem[]
  relatedScience?: RelatedItem[]
}

export function RecipeRelated({ relatedRecipes, relatedTechniques, relatedScience }: RecipeRelatedProps) {
  const hasRelated = (relatedRecipes?.length ?? 0) + (relatedTechniques?.length ?? 0) + (relatedScience?.length ?? 0) > 0

  if (!hasRelated) return null

  return (
    <div className="mt-16 space-y-12">
      <h2 className="text-3xl font-bold text-primary-900">Contenuti Correlati</h2>

      {/* Ricette correlate */}
      {relatedRecipes && relatedRecipes.length > 0 && (
        <div>
          <h3 className="mb-6 text-2xl font-bold text-primary-900">
            🍰 Altre Ricette che Potrebbero Piacerti
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedRecipes.map((recipe) => (
              <Link key={recipe._id} href={`/ricette/${recipe.slug.current}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-xl">
                  {recipe.mainImageUrl && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={recipe.mainImageUrl}
                        alt={recipe.mainImageAlt ?? recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 font-bold text-primary-900 group-hover:text-primary-600">
                      {recipe.title}
                    </h4>
                    {recipe.excerpt && (
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {recipe.excerpt}
                      </p>
                    )}
                    {(recipe.prepTime ?? recipe.cookTime) && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{(recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)} min</span>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tecniche correlate */}
      {relatedTechniques && relatedTechniques.length > 0 && (
        <div>
          <h3 className="mb-6 text-2xl font-bold text-primary-900">
            📚 Tecniche Utilizzate in questa Ricetta
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedTechniques.map((technique) => (
              <Link key={technique._id} href={`/tecniche/${technique.slug.current}`}>
                <Card className="group flex items-center gap-4 p-4 transition-all hover:shadow-lg">
                  {technique.mainImageUrl && (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={technique.mainImageUrl}
                        alt={technique.mainImageAlt ?? technique.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="mb-1 font-bold text-primary-900 group-hover:text-blue-600">
                      {technique.title}
                    </h4>
                    {technique.excerpt && (
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {technique.excerpt}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Scienza correlata */}
      {relatedScience && relatedScience.length > 0 && (
        <div>
          <h3 className="mb-6 text-2xl font-bold text-primary-900">
            🔬 La Scienza Dietro questa Ricetta
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedScience.map((article) => (
              <Link key={article._id} href={`/scienza/${article.slug.current}`}>
                <Card className="group flex items-center gap-4 p-4 transition-all hover:shadow-lg">
                  {article.mainImageUrl && (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.mainImageUrl}
                        alt={article.mainImageAlt ?? article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="mb-1 font-bold text-primary-900 group-hover:text-purple-600">
                      {article.title}
                    </h4>
                    {article.excerpt && (
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-600" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}