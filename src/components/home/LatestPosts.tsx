'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { LatestPost } from '@/sanity/lib/types'

interface LatestPostsProps {
  posts: LatestPost[]
}

const typeLabels = {
  recipe: 'Ricetta',
  technique: 'Tecnica',
  science: 'Scienza',
}

const typeColors = {
  recipe: 'bg-pastry-600',
  technique: 'bg-blue-600',
  science: 'bg-purple-600',
}

const typePaths = {
  recipe: 'ricette',
  technique: 'tecniche',
  science: 'scienza',
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="bg-gray-50 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-pastry-900 md:text-4xl">
          Ultimi Articoli
        </h2>
        <p className="text-gray-600">
          Resta aggiornato con le ultime pubblicazioni
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link href={`/${typePaths[post._type]}/${post.slug.current}`}>
              <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage as SanityImageSource).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <Badge className={`absolute left-4 top-4 ${typeColors[post._type]}`}>
                    {typeLabels[post._type]}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-pastry-900 group-hover:text-pastry-600">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/ricette"
          className="inline-flex items-center gap-2 text-pastry-600 hover:text-pastry-700"
        >
          Vedi tutte le ricette
          <span>→</span>
        </Link>
      </div>
    </div>
  </section>
  )
}