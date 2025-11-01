import { siteConfig } from '@/lib/config'

interface StructuredDataProps {
  type: 'website' | 'recipe' | 'article' | 'breadcrumb' | 'organization'
  data?: Record<string, any>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description: siteConfig.description,
          founder: {
            '@type': 'Person',
            name: siteConfig.author,
          },
          sameAs: [
            siteConfig.social.instagram.url,
            siteConfig.social.facebook.url,
            siteConfig.social.youtube.url,
            siteConfig.social.x.url,
            siteConfig.social.tiktok.url,
          ],
        }

      case 'recipe':
        return {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          ...data,
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          ...data,
        }

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          ...data,
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Helper per generare structured data per ricette
export function generateRecipeStructuredData(recipe: any) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    name: recipe.title,
    description: recipe.excerpt || recipe.description,
    image: recipe.mainImageUrl,
    author: {
      '@type': 'Person',
      name: recipe.author?.name || siteConfig.author,
    },
    datePublished: recipe.publishedAt,
    prepTime: `PT${recipe.prepTime || 0}M`,
    cookTime: `PT${recipe.cookTime || 0}M`,
    totalTime: `PT${(recipe.prepTime || 0) + (recipe.cookTime || 0)}M`,
    recipeYield: recipe.servings ? `${recipe.servings} porzioni` : undefined,
    recipeCategory: recipe.categories?.[0]?.title || 'Dolci',
    recipeCuisine: 'Italiana',
    keywords: recipe.tags?.join(', '),
    recipeIngredient: recipe.ingredients?.map((ing: any) => ing.item) || [],
    recipeInstructions: recipe.steps?.map((step: any, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step.description,
    })) || [],
    aggregateRating: recipe.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: recipe.rating.average,
          ratingCount: recipe.rating.count,
        }
      : undefined,
    nutrition: recipe.nutrition
      ? {
          '@type': 'NutritionInformation',
          calories: recipe.nutrition.calories ? `${recipe.nutrition.calories} calories` : undefined,
          proteinContent: recipe.nutrition.protein ? `${recipe.nutrition.protein}g` : undefined,
          fatContent: recipe.nutrition.fat ? `${recipe.nutrition.fat}g` : undefined,
          carbohydrateContent: recipe.nutrition.carbs ? `${recipe.nutrition.carbs}g` : undefined,
        }
      : undefined,
  }
}

// Helper per breadcrumb
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}
