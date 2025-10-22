'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Recipe } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface RecipeHeroProps {
  recipe: Recipe
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px]">
      {/* Immagine di sfondo */}
      {recipe.mainImageUrl && (
        <Image
          src={urlFor(recipe.mainImageUrl).url()}
          alt={recipe.mainImageAlt || recipe.title}
          fill
          className="object-cover"
          priority
        />
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Contenuto */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="container mx-auto">
          {/* Categorie */}
          {recipe.categories && recipe.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {recipe.categories.map((category) => (
                <Badge
                  key={category._id}
                  className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1"
                >
                  {category.emoji} {category.title}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Titolo */}
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {recipe.title}
          </h1>
          
          {/* Excerpt */}
          {recipe.excerpt && (
            <p className="max-w-3xl text-lg text-gray-100 md:text-xl">
              {recipe.excerpt}
            </p>
          )}
          
          {/* Autore e data */}
          <div className="mt-6 flex items-center gap-4">
            {recipe.author.imageUrl && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white">
                <Image
                  src={recipe.author.imageUrl}
                  alt={recipe.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold">{recipe.author?.name || 'Chef'}</p>
              <p className="text-sm text-gray-200">
                {new Date(recipe.publishedAt).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}