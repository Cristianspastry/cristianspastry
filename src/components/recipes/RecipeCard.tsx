import type { Recipe } from "@/sanity/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import Image from 'next/image'
import { ArrowRight, Clock, Users } from "lucide-react"

interface RecipeCardProps {
  recipe: Recipe
  index?: number
}

const difficultyLabels = {
  facile: 'Facile',
  media: 'Media',
  difficile: 'Difficile',
  professionale : 'professionale'
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/ricette/${recipe.slug.current}`} className="block h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Immagine - aspect ratio più largo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {recipe.mainImageUrl ? (
              <Image
                src={urlFor(recipe.mainImageUrl).width(800).height(600).url()}
                alt={recipe.mainImageAlt ?? recipe.title ?? ' '}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <span className="text-gray-400">Nessuna immagine</span>
              </div>
            )}
            
            {/* Badge categoria - più grande */}
            {recipe.categories && (
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-primary-900/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  {Array.isArray(recipe.categories)
                    ? recipe.categories.map((cat, i) =>
                        <span key={cat._id || i}>
                          {cat.title}{i < recipe.categories.length - 1 && ', '}
                        </span>
                      )
                    : recipe.categories}
                </span>
              </div>
            )}
          </div>

          {/* Contenuto - più padding */}
          <div className="flex flex-1 flex-col p-6">
            {/* Titolo - più grande e bold */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-primary-600">
              {recipe.title}
            </h3>

            {/* Meta info - icone più grandi */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {totalTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-600" />
                  <span className="font-semibold">{totalTime} min</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center">
                  <span className="font-semibold lowercase text-gray-700">
                    {difficultyLabels[recipe.difficulty] || recipe.difficulty}
                  </span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  <span className="font-semibold">{recipe.servings}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {recipe.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {recipe.excerpt}
              </p>
            )}

            {/* Footer con CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-primary-600">
                Vai alla ricetta
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}