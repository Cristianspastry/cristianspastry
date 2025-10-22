// lib/seo.ts - Funzioni per generare metadata SEO in Next.js 14+

import type { Recipe, Science, Technique } from "@/sanity/lib/types"
import type { Metadata } from "next"
import { env } from "process"
import { siteConfig } from "./config"


const DEFAULT_OG_IMAGE = '/og-default.jpg'

// ============================================
// METADATA PER RICETTE
// ============================================

export function generateRecipeMetadata(recipe: Recipe): Metadata {
  const title = recipe.seo?.metaTitle ?? `${recipe.title} - Ricetta`
  
  const description = recipe.seo?.metaDescription ?? recipe.excerpt
  const imageUrl = recipe.seo?.ogImageUrl ?? recipe.mainImageUrl
  const url = `${env.NEXT_PUBLIC_SITE_URL}/ricette/${recipe.slug.current}`
  
  // Calcolo tempo totale
  const totalTime = recipe.prepTime + recipe.cookTime + (recipe.restTime ?? 0)
  
  // Ingredienti per schema.org con type guard
  const ingredients = (recipe.ingredients).flatMap((group) => 
    group.items.map(item => 
      `${item.quantity ?? ''}${item.unit ? ' ' + item.unit : ''} ${item.ingredient}`.trim()
    )
  )
  
  // Istruzioni per schema.org con type guard
  const instructions = (recipe.instructions).flatMap((phase, phaseIndex) =>
    phase.steps.map((step, stepIndex) => ({
      '@type': 'HowToStep' as const,
      name: phase.title ?? `Fase ${phaseIndex + 1}, Passo ${stepIndex + 1}`,
      text: step.description,
      image: step.image?.url,
    }))
  )

  // Schema.org Recipe structured data
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: recipe.author.name,
      url: `${env.NEXT_PUBLIC_SITE_URL}/autori/${recipe.author.slug.current}`,
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe._updatedAt,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${totalTime}M`,
    recipeYield: `${recipe.servings} porzioni`,
    recipeCategory: recipe.categories[0]?.title,
    recipeCuisine: 'Italiana',
    keywords: recipe.tags?.join(', '),
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
    aggregateRating: undefined, // Aggiungi se hai un sistema di rating
    nutrition: recipe.nutritionalInfo ? {
      '@type': 'NutritionInformation',
      calories: recipe.nutritionalInfo.calories ? `${recipe.nutritionalInfo.calories} kcal` : undefined,
      proteinContent: recipe.nutritionalInfo.protein ? `${recipe.nutritionalInfo.protein}g` : undefined,
      carbohydrateContent: recipe.nutritionalInfo.carbohydrates ? `${recipe.nutritionalInfo.carbohydrates}g` : undefined,
      fatContent: recipe.nutritionalInfo.fat ? `${recipe.nutritionalInfo.fat}g` : undefined,
      fiberContent: recipe.nutritionalInfo.fiber ? `${recipe.nutritionalInfo.fiber}g` : undefined,
      sugarContent: recipe.nutritionalInfo.sugar ? `${recipe.nutritionalInfo.sugar}g` : undefined,
    } : undefined,
  }

  return {
    title,
    description,
    keywords: recipe.seo?.focusKeyphrase ? [recipe.seo.focusKeyphrase, ...(recipe.seo.synonyms ?? []), ...(recipe.tags ?? [])] : recipe.tags,
    authors: [{ name: recipe.author.name }],
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.mainImageAlt,
        },
      ],
      locale: 'it_IT',
      type: 'article',
      publishedTime: recipe.publishedAt,
      modifiedTime: recipe._updatedAt,
      authors: [recipe.author.name],
      tags: recipe.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: recipe.author.social?.twitter,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: !recipe.seo?.noIndex,
      follow: !recipe.seo?.noIndex,
      googleBot: {
        index: !recipe.seo?.noIndex,
        follow: !recipe.seo?.noIndex,
      },
    },
    other: {
      'script:ld+json': JSON.stringify(recipeSchema),
    },
  }
}

// ============================================
// METADATA PER TECNICHE
// ============================================

export function generateTechniqueMetadata(technique: Technique): Metadata {
  const title = technique.seo?.metaTitle ?? `${technique.title} - Tecnica di Pasticceria`
  const description = technique.seo?.metaDescription ?? technique.excerpt
  const imageUrl = technique.seo?.ogImageUrl ?? technique.mainImageUrl
  const url = `${env.NEXT_PUBLIC_SITE_URL}/tecniche/${technique.slug.current}`

  // Schema.org HowTo structured data
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: technique.title,
    description: technique.excerpt,
    image: [imageUrl],
    estimatedCost: technique.estimatedCost ? {
      '@type': 'MonetaryAmount',
      currency: technique.estimatedCost.currency,
      value: technique.estimatedCost.value,
    } : undefined,
    totalTime: `PT${technique.executionTime}M`,
    tool: technique.equipment.filter(e => e.required).map(e => ({
      '@type': 'HowToTool',
      name: e.name,
    })),
    supply: technique.equipment.filter(e => !e.required).map(e => ({
      '@type': 'HowToSupply',
      name: e.name,
    })),
    step: technique.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      image: step.imageUrl,
      url: `${url}#step-${index + 1}`,
    })),
    author: {
      '@type': 'Person',
      name: technique.author.name,
      url: `${env.NEXT_PUBLIC_SITE_URL}/autori/${technique.author.slug.current}`,
    },
    datePublished: technique.publishedAt,
    dateModified: technique._updatedAt,
  }

  return {
    title,
    description,
    keywords: technique.seo?.focusKeyphrase ? [technique.seo.focusKeyphrase, ...(technique.seo.synonyms ?? []), ...(technique.tags ?? [])] : technique.tags,
    authors: [{ name: technique.author.name }],
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: technique.mainImageAlt,
        },
      ],
      locale: 'it_IT',
      type: 'article',
      publishedTime: technique.publishedAt,
      modifiedTime: technique._updatedAt,
      authors: [technique.author.name],
      tags: technique.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: !technique.seo?.noIndex,
      follow: !technique.seo?.noIndex,
      googleBot: {
        index: !technique.seo?.noIndex,
        follow: !technique.seo?.noIndex,
      },
    },
    other: {
      'script:ld+json': JSON.stringify(howToSchema),
    },
  }
}

// ============================================
// METADATA PER SCIENZA
// ============================================

export function generateScienceMetadata(science: Science): Metadata {
  const title = science.seo?.metaTitle ?? `${science.title} - Scienza della Pasticceria`
  const description = science.seo?.metaDescription ?? science.excerpt
  const imageUrl = science.seo?.ogImageUrl ?? science.mainImageUrl
  const url = `${env.NEXT_PUBLIC_SITE_URL}/scienza/${science.slug?.current}`
  const canonicalUrl = science.seo?.canonicalUrl ?? url

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: science.title,
    description: science.excerpt,
    image: [imageUrl],
    datePublished: science.publishedAt,
    dateModified: science.updatedAt ?? science._updatedAt,
    author: {
      '@type': 'Person',
      name: science.author.name,
      url: `${env.NEXT_PUBLIC_SITE_URL}/autori/${science.author.slug.current}`,
    },
    publisher: {
      '@type': 'Organization',
      name: env.NEXT_PUBLIC_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: science.articleType,
    keywords: science.tags?.join(', '),
    wordCount: undefined, // Puoi calcolarlo se necessario
    timeRequired: `PT${science.readingTime}M`,
  }

  return {
    title,
    description,
    keywords: science.seo?.focusKeyphrase ? [science.seo.focusKeyphrase, ...(science.seo.synonyms ?? []), ...(science.tags ?? [])] : science.tags,
    authors: [{ name: science.author.name }],
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: science.mainImageAlt,
        },
      ],
      locale: 'it_IT',
      type: 'article',
      publishedTime: science.publishedAt,
      modifiedTime: science.updatedAt ?? science._updatedAt,
      authors: [science.author.name],
      tags: science.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !science.seo?.noIndex,
      follow: !science.seo?.noIndex,
      googleBot: {
        index: !science.seo?.noIndex,
        follow: !science.seo?.noIndex,
      },
    },
    other: {
      'script:ld+json': JSON.stringify(articleSchema),
    },
  }
}

// ============================================
// METADATA PER CATEGORIA
// ============================================

export function generateCategoryMetadata(
  category: { title: string; slug: { current: string }; description?: string; imageUrl?: string },
  type: 'ricette' | 'tecniche' = 'ricette'
): Metadata {
  const title = `${category.title} - ${type === 'ricette' ? 'Ricette' : 'Tecniche'}`
  const description = category.description ?? `Scopri tutte le ${type} di ${category.title.toLowerCase()}`
  const url = `${env.NEXT_PUBLIC_SITE_URL}/${type}/categoria/${category.slug.current}`
  const imageUrl = category.imageUrl ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

// ============================================
// METADATA PER AUTORE
// ============================================

export function generateAuthorMetadata(author: {
  name: string
  slug: { current: string }
  bio?: unknown[]
  imageUrl?: string
  role?: string
}): Metadata {
  const title = `${author.name}${author.role ? ` - ${author.role}` : ''}`
  const description = author.bio 
    ? `Scopri tutte le ricette e gli articoli di ${author.name}` 
    : `Autore su ${env.NEXT_PUBLIC_SITE_URL}`
  const url = `${env.NEXT_PUBLIC_SITE_URL}/autori/${author.slug.current}`
  const imageUrl = author.imageUrl ?? DEFAULT_OG_IMAGE

  // Schema.org Person
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    image: imageUrl,
    url,
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'it_IT',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'script:ld+json': JSON.stringify(personSchema),
    },
  }
}

// ============================================
// METADATA HOMEPAGE
// ============================================

export function generateHomeMetadata(): Metadata {
  const title = `${siteConfig.name} - Ricette, Tecniche e Scienza della Pasticceria`
  const description = 'Scopri ricette dettagliate, tecniche professionali e la scienza dietro l\'arte della pasticceria'
  const url = env.NEXT_PUBLIC_SITE_URL

  // Schema.org WebSite
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${env.NEXT_PUBLIC_SITE_URL}/cerca?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'script:ld+json': JSON.stringify(websiteSchema),
    },
  }
}

// ============================================
// BREADCRUMBS SCHEMA
// ============================================

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${env.NEXT_PUBLIC_SITE_URL}${item.url}`,
    })),
  }
}