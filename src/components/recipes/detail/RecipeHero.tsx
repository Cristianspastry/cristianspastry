'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Recipe } from '@/sanity/lib/types'
import Link from 'next/link'

interface RecipeHeroProps {
  recipe: Recipe
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {/* Immagine - aspect ratio più naturale per ricette */}
            {recipe.mainImageUrl && (
              <div className="p-6 md:p-8">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={recipe.mainImageUrl}
                    alt={recipe.mainImageAlt || recipe.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={95}
                  />
                  {/* Overlay sottile per migliore leggibilità del testo sovrapposto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            )}
            
            {/* Contenuto testuale */}
            <div className="flex flex-col justify-center p-6 md:p-8">
              {/* Categorie */}
              {recipe.categories && recipe.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {recipe.categories.map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary"
                      className="border-primary-200 bg-primary-50 text-primary-900 hover:bg-primary-100"
                    >
                     <Link href={"/ricette/categorie/"}>
                     
                     {category.emoji} {category.title}
                     </Link> 
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Titolo */}
              <h1 className="mb-4 text-3xl font-bold leading-tight text-primary-900 md:text-4xl lg:text-5xl">
                {recipe.title}
              </h1>
              
              {/* Excerpt */}
              {recipe.excerpt && (
                <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
                  {recipe.excerpt}
                </p>
              )}
              
              {/* Autore e data */}
              <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                {recipe.author.imageUrl && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary-200 shadow-sm">
                    <Image
                      src={recipe.author.imageUrl}
                      alt={recipe.author.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary-900">
                    
                    <Link href={"/chi-sono"}>
                    
                    {recipe.author?.name || 'Chef'}
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
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
        </Card>
      </div>
    </div>
  )
}