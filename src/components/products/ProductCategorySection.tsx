import type { Product } from '@/sanity/lib/types'
import ProductCard from './ProductCard'
import FadeInView from '@/components/shared/FadeInView'

interface ProductCategorySectionProps {
  title: string
  description: string
  products: Product[]
  categoryKey: string
}

const categoryColors: Record<string, string> = {
  crostate: 'border-l-4 border-l-yellow-500',
  ingredienti: 'border-l-4 border-l-orange-500',
  cottura: 'border-l-4 border-l-red-500',
  decorazione: 'border-l-4 border-l-pink-500',
  attrezzatura: 'border-l-4 border-l-blue-500',
  elettrodomestici: 'border-l-4 border-l-purple-500',
}

export default function ProductCategorySection({
  title,
  description,
  products,
  categoryKey,
}: ProductCategorySectionProps) {
  if (products.length === 0) return null

  return (
    <section className="mb-16">
      <FadeInView>
        {/* Section Header */}
        <div className={`mb-8 rounded-2xl bg-white p-6 shadow-lg ${categoryColors[categoryKey] || ''}`}>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <FadeInView key={product._id} delay={index * 0.1}>
              <ProductCard product={product} index={index} />
            </FadeInView>
          ))}
        </div>
      </FadeInView>
    </section>
  )
}
