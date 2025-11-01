'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ChefHat, Award } from 'lucide-react'
import type { Author } from '@/sanity/lib/types'

interface AboutHeroProps {
  author: Author
}

export default function AboutHero({ author }: AboutHeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl ring-8 ring-white/10">
              {author.imageUrl ? (
                <Image
                  src={author.imageUrl}
                  alt={author.imageAlt || author.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-purple-700">
                  <ChefHat className="h-32 w-32 text-purple-400" />
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold">
                <ChefHat className="mr-2 h-4 w-4" />
                Pasticcere Professionista
              </Badge>
            </div>

            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              {author.name}
            </h1>

            {author.role && (
              <p className="mb-6 text-2xl font-semibold text-purple-200 md:text-3xl">
                {author.role}
              </p>
            )}

            <p className="text-xl text-purple-100 leading-relaxed">
              Benvenuto nel mio mondo dolce! Qui condivido la mia passione per la pasticceria,
              unendo tecnica, creatività e scienza per creare dolci straordinari.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {author.expertise && author.expertise.length > 0 && (
                <div className="flex items-center gap-2 text-purple-200">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">{author.expertise.length}+ Specializzazioni</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
