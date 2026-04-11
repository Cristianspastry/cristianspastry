import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTechniqueBySlug } from '@/features/techniques/services/techniqueService'
import type { Technique } from '@/features/techniques/types'
import { 
  TechniqueHero,
  TechniqueInfo,
  TechniqueIntroduction,
  TechniqueEquipment,
  TechniqueSteps,
  TechniqueKeyPoints,
  TechniqueTroubleshooting,
  TechniqueVariations,
  TechniqueRelated
} from '@/features/techniques/components'

interface TechniquePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TechniquePageProps): Promise<Metadata> {
  const { slug } = await params
  const technique: Technique | null = await getTechniqueBySlug(slug)

  if (!technique) {
    return {
      title: 'Tecnica non trovata | Cristian\'s Pastry',
    }
  }

  return {
    title: technique.seo?.metaTitle || `${technique.title} | Cristian's Pastry`,
    description: technique.seo?.metaDescription || technique.excerpt,
    openGraph: {
      title: technique.seo?.metaTitle || technique.title,
      description: technique.seo?.metaDescription || technique.excerpt,
      images: technique.seo?.ogImageUrl
        ? [{ url: technique.seo.ogImageUrl }]
        : technique.mainImageUrl
          ? [{ url: technique.mainImageUrl }]
          : [],
      type: 'article',
    },
    keywords: technique.seo?.synonyms || technique.tags,
    robots: technique.seo?.noIndex
      ? {
        index: false,
        follow: false,
      }
      : undefined,
  }
}

export default async function TechniquePage({ params }: TechniquePageProps) {
  const { slug } = await params
  const technique: Technique | null = await getTechniqueBySlug(slug)

  if (!technique) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <TechniqueHero technique={technique} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-12 lg:flex-row flex-col">
          {/* Main Column */}
          <div className="space-y-12 lg:w-2/3 flex-1">
            {/* Introduction */}
            {technique.introduction && (
              <TechniqueIntroduction content={technique.introduction} />
            )}

            {/* Info Card - Mobile Only (sotto introduzione) */}
            <div className="lg:hidden">
              <TechniqueInfo technique={technique} />
            </div>

            {/* Equipment */}
            {technique.equipment && technique.equipment.length > 0 && (
              <TechniqueEquipment equipment={technique.equipment} />
            )}

            {/* Steps */}
            {technique.steps && technique.steps.length > 0 && (
              <TechniqueSteps steps={technique.steps} />
            )}

            {/* Key Points */}
            {technique.keyPoints && technique.keyPoints.length > 0 && (
              <TechniqueKeyPoints keyPoints={technique.keyPoints} />
            )}

            {/* Troubleshooting */}
            {technique.troubleshooting && technique.troubleshooting.length > 0 && (
              <TechniqueTroubleshooting troubleshooting={technique.troubleshooting} />
            )}

            {/* Variations */}
            {technique.variations && technique.variations.length > 0 && (
              <TechniqueVariations variations={technique.variations} />
            )}

            {/* Related Content - Mobile Only (in fondo) */}
            <div className="lg:hidden">
              <TechniqueRelated technique={technique} />
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-1/3 flex-shrink-0">
            <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
              {/* Info Card */}
              <TechniqueInfo technique={technique} />

              {/* Related Content */}
              <TechniqueRelated technique={technique} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}