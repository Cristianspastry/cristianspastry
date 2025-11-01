'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Product } from '@/sanity/lib/types'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const handleClick = () => {
    // Track click per analytics (opzionale)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'product_click', {
        product_name: product.title,
        product_category: product.category,
        affiliate_link: product.amazonUrl,
      })
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt || product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Price Badge (if available) */}
        {product.price && (
          <div className="absolute top-4 right-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
            {product.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-gray-600 line-clamp-3">
          {product.description}
        </p>

        {/* Link affiliazione */}
        <p className="mb-4 text-xs text-gray-400 italic">
          link affiliazione
        </p>

        {/* CTA Button */}
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block"
        >
          <Button
            className="w-full rounded-full bg-orange-500 py-6 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg touch-feedback"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            {product.ctaText || 'Scopri la selezione'}
          </Button>
        </a>
      </div>
    </div>
  )
}
