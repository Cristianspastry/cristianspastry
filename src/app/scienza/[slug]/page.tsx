import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getScienceArticleBySlug } from '@/features/science/services/scienceService'
import type { ScienceArticle } from '@/features/science/types'
import { 
  ScienceHero,
  ScienceInfo,
  ScienceIntroduction,
  ScienceSections,
  ScienceKeyTakeaways,
  SciencePracticalApplications,
  ScienceExperiments,
  ScienceGlossary,
  ScienceReferences,
  ScienceConclusion,
  ScienceRelated
} from '@/features/science/components'

interface SciencePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: SciencePageProps): Promise<Metadata> {
  const { slug } = await params
  const article: ScienceArticle | null = await getScienceArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Articolo non trovato | Cristian\'s Pastry',
    }
  }

  return {
    title: article.seo?.metaTitle || `${article.title} | Cristian's Pastry`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: article.seo?.ogImageUrl
        ? [{ url: article.seo.ogImageUrl }]
        : article.mainImageUrl
        ? [{ url: article.mainImageUrl }]
        : [],
      type: 'article',
    },
    keywords: article.seo?.synonyms || article.tags,
    robots: article.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export default async function SciencePage({ params }: SciencePageProps) {
  const { slug } = await params
  const article: ScienceArticle | null = await getScienceArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <ScienceHero article={article} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-12 lg:flex-row flex-col">
          {/* Main Column */}
          <div className="space-y-12 lg:w-2/3 flex-1">
            {/* Introduction */}
            {article.introduction && (
              <ScienceIntroduction content={article.introduction} />
            )}

            {/* Info Card - Mobile Only (sotto introduzione) */}
            <div className="lg:hidden">
              <ScienceInfo article={article} />
            </div>

            {/* Sections */}
            {article.sections && article.sections.length > 0 && (
              <ScienceSections sections={article.sections} />
            )}

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <ScienceKeyTakeaways keyTakeaways={article.keyTakeaways} />
            )}

            {/* Practical Applications */}
            {article.practicalApplications && article.practicalApplications.length > 0 && (
              <SciencePracticalApplications applications={article.practicalApplications} />
            )}

            {/* Experiments */}
            {article.experiments && article.experiments.length > 0 && (
              <ScienceExperiments experiments={article.experiments} />
            )}

            {/* Glossary */}
            {article.glossary && article.glossary.length > 0 && (
              <ScienceGlossary terms={article.glossary} />
            )}

            {/* Conclusion */}
            {article.conclusion && (
              <ScienceConclusion content={article.conclusion} />
            )}

            {/* References */}
            {article.references && article.references.length > 0 && (
              <ScienceReferences references={article.references} />
            )}

            {/* Related Content - Mobile Only (in fondo) */}
            <div className="lg:hidden">
              <ScienceRelated article={article} />
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-1/3 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Info Card */}
              <ScienceInfo article={article} />

              {/* Related Content */}
              <ScienceRelated article={article} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}