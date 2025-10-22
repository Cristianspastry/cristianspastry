// queries.ts - Query GROQ ottimizzate per SEO
import { groq } from "next-sanity"
// ============================================
// RICETTE
// ============================================

// Query per singola ricetta con tutti i dati SEO
export const RECIPE_QUERY = groq`*[_type == "ricetta" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "mainImageCaption": mainImage.caption,
  "mainImageMetadata": mainImage.asset->metadata,
  difficulty,
  prepTime,
  cookTime,
  restTime,
  servings,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  tags,
  ingredients,
  instructions,
  tips,
  storage,
  variations,
  relatedTechniques[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    difficulty
  },
  relatedScience[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    articleType
  },
  relatedRecipes[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    difficulty,
    prepTime
  },
  publishedAt,
  author->{
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    role,
    bio
  },
  nutritionalInfo,
  seo{
    metaTitle,
    metaDescription,
    focusKeyphrase,
    synonyms,
    "ogImageUrl": ogImage.asset->url,
    noIndex
  }
}`


export const RECIPE_DETAIL_QUERY = groq`
  *[_type == "ricetta" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    difficulty,
    prepTime,
    cookTime,
    restTime,
    servings,
    categories[]->{
      _id,
      title,
      slug,
      emoji
    },
    tags,
    ingredients,
    instructions,
    tips,
    storage,
    variations,
    nutritionalInfo,
    relatedTechniques[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImageUrl,
      mainImageAlt
    },
    relatedScience[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImageUrl,
      mainImageAlt
    },
    relatedRecipes[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImageUrl,
      mainImageAlt,
      prepTime,
      cookTime,
      difficulty
    },
    publishedAt,
    author->{
      name,
      image,
      bio
    },
    seo {
      metaTitle,
      metaDescription,
      focusKeyphrase,
      synonyms,
      ogImage {
        asset->{
          url
        },
        alt
      },
      noIndex
    }
  }
`


// Query per lista ricette (con paginazione)
export const RECIPES_LIST_QUERY = groq`*[_type == "ricetta" && !seo.noIndex] | order(publishedAt desc) [$start...$end]{
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  difficulty,
  prepTime,
  cookTime,
  servings,
  categories[]->{
    _id,
    title,
    slug,
    color
  },
  tags,
  publishedAt,
  author->{
    name,
    slug,
    "imageUrl": image.asset->url
  }
}`

// Query per ricette in evidenza
export const FEATURED_RECIPES_QUERY = groq`*[_type == "ricetta" && !seo.noIndex] | order(publishedAt desc) [0...6]{
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  difficulty,
  prepTime,
  publishedAt,
  categories[0]->{
    title,
    color
  }
}`

// Query per ricette per categoria
export const RECIPES_BY_CATEGORY_QUERY = groq`*[_type == "ricetta" && references(*[_type=="category" && slug.current == $slug]._id) && !seo.noIndex] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  difficulty,
  prepTime,
  publishedAt
}`

// Query per sitemap ricette
export const RECIPES_SITEMAP_QUERY = groq`*[_type == "ricetta" && !seo.noIndex]{
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`

// ============================================
// TECNICHE
// ============================================

// Query per singola tecnica
export const TECHNIQUE_QUERY = groq`*[_type == "tecnica" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "mainImageCaption": mainImage.caption,
  difficulty,
  executionTime,
  category,
  tags,
  introduction,
  equipment,
  steps[]{
    ...,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "imageCaption": image.caption
  },
  keyPoints,
  variations[]{
    ...,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  troubleshooting,
  videoTutorial,
  relatedRecipes[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    difficulty
  },
  relatedScience[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url
  },
  prerequisiteTechniques[]->{
    _id,
    title,
    slug,
    difficulty
  },
  advancedTechniques[]->{
    _id,
    title,
    slug,
    difficulty
  },
  publishedAt,
  author->{
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    role
  },
  estimatedCost,
  seo{
    metaTitle,
    metaDescription,
    focusKeyphrase,
    synonyms,
    "ogImageUrl": ogImage.asset->url,
    noIndex
  }
}`

// Query per lista tecniche
export const TECHNIQUES_LIST_QUERY = groq`*[_type == "tecnica" && !seo.noIndex] | order(publishedAt desc) [$start...$end]{
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  difficulty,
  executionTime,
  category,
  tags,
  publishedAt,
  author->{
    name,
    slug
  }
}`

// Query per tecniche per categoria
export const TECHNIQUES_BY_CATEGORY_QUERY = groq`*[_type == "tecnica" && category == $category && !seo.noIndex] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  difficulty,
  executionTime,
  publishedAt
}`

// Query per sitemap tecniche
export const TECHNIQUES_SITEMAP_QUERY = groq`*[_type == "tecnica" && !seo.noIndex]{
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`

// ============================================
// SCIENZA
// ============================================

// Query per singolo articolo scientifico
export const SCIENCE_QUERY = groq`*[_type == "scienza" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "mainImageCaption": mainImage.caption,
  articleType,
  complexity,
  readingTime,
  tags,
  introduction,
  sections[]{
    ...,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "metadata": asset->metadata
      }
    }
  },
  keyTakeaways,
  practicalApplications,
  experiments[]{
    ...,
    images[]{
      "url": asset->url,
      alt,
      caption
    }
  },
  glossary,
  references,
  conclusion,
  relatedRecipes[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    difficulty
  },
  relatedTechniques[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    difficulty
  },
  relatedScience[]->{
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    articleType
  },
  publishedAt,
  updatedAt,
  author->{
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    role,
    bio
  },
  featured,
  seo{
    metaTitle,
    metaDescription,
    focusKeyphrase,
    synonyms,
    "ogImageUrl": ogImage.asset->url,
    noIndex,
    canonicalUrl
  }
}`

// Query per lista articoli scientifici
export const SCIENCE_LIST_QUERY = groq`*[_type == "scienza" && !seo.noIndex] | order(publishedAt desc) [$start...$end]{
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  articleType,
  complexity,
  readingTime,
  tags,
  publishedAt,
  featured,
  author->{
    name,
    slug,
    "imageUrl": image.asset->url
  }
}`

// Query per articoli in evidenza
export const FEATURED_SCIENCE_QUERY = groq`*[_type == "scienza" && featured == true && !seo.noIndex] | order(publishedAt desc) [0...3]{
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  articleType,
  complexity,
  readingTime,
  publishedAt
}`

// Query per articoli per tipo
export const SCIENCE_BY_TYPE_QUERY = groq`*[_type == "scienza" && articleType == $type && !seo.noIndex] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  complexity,
  readingTime,
  publishedAt
}`

// Query per sitemap scienza
export const SCIENCE_SITEMAP_QUERY = groq`*[_type == "scienza" && !seo.noIndex]{
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`

// ============================================
// CATEGORIE
// ============================================

// Query per tutte le categorie
export const CATEGORIES_QUERY = groq`*[_type == "category"] | order(title asc){
  _id,
  title,
  slug,
  description,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  color,
  "recipeCount": count(*[_type == "ricetta" && references(^._id)])
}`

// Query per singola categoria
export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  color
}`

// ============================================
// AUTORI
// ============================================

// Query per singolo autore
export const AUTHOR_QUERY = groq`*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  bio,
  role,
  expertise,
  social,
  email,
  "recipeCount": count(*[_type == "ricetta" && author._ref == ^._id]),
  "techniqueCount": count(*[_type == "tecnica" && author._ref == ^._id]),
  "scienceCount": count(*[_type == "scienza" && author._ref == ^._id])
}`

// Query per contenuti dell'autore
export const AUTHOR_CONTENT_QUERY = groq`{
  "recipes": *[_type == "ricetta" && author._ref == $authorId && !seo.noIndex] | order(publishedAt desc) [0...6]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    difficulty,
    prepTime,
    publishedAt
  },
  "techniques": *[_type == "tecnica" && author._ref == $authorId && !seo.noIndex] | order(publishedAt desc) [0...6]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    difficulty,
    publishedAt
  },
  "science": *[_type == "scienza" && author._ref == $authorId && !seo.noIndex] | order(publishedAt desc) [0...6]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    articleType,
    publishedAt
  }
}`

// ============================================
// RICERCA
// ============================================

// Query per ricerca globale
export const SEARCH_QUERY = groq`{
  "recipes": *[_type == "ricetta" && !seo.noIndex && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    $searchTerm in tags
  )] | order(publishedAt desc) [0...10]{
    _type,
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    publishedAt
  },
  "techniques": *[_type == "tecnica" && !seo.noIndex && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    $searchTerm in tags
  )] | order(publishedAt desc) [0...10]{
    _type,
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    publishedAt
  },
  "science": *[_type == "scienza" && !seo.noIndex && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    $searchTerm in tags
  )] | order(publishedAt desc) [0...10]{
    _type,
    _id,
    title,
    slug,
    excerpt,
    "imageUrl": mainImage.asset->url,
    publishedAt
  }
}`

// ============================================
// HOMEPAGE
// ============================================

// Query per homepage
export const HOMEPAGE_QUERY = groq`{
  "featuredRecipes": *[_type == "ricetta" && !seo.noIndex] | order(publishedAt desc) [0...6]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    difficulty,
    prepTime,
    publishedAt,
    categories[0]->{
      title,
      color
    }
  },
  "featuredTechniques": *[_type == "tecnica" && !seo.noIndex] | order(publishedAt desc) [0...4]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    difficulty,
    executionTime,
    publishedAt
  },
  "featuredScience": *[_type == "scienza" && featured == true && !seo.noIndex] | order(publishedAt desc) [0...3]{
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    articleType,
    readingTime,
    publishedAt
  },
  "categories": *[_type == "category"] | order(title asc) [0...8]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    color,
    "recipeCount": count(*[_type == "ricetta" && references(^._id) && !seo.noIndex])
  }
}`

// ============================================
// SITEMAP COMPLETO
// ============================================

export const FULL_SITEMAP_QUERY = groq`{
  "recipes": *[_type == "ricetta" && !seo.noIndex]{
    "slug": slug.current,
    _updatedAt,
    publishedAt
  },
  "techniques": *[_type == "tecnica" && !seo.noIndex]{
    "slug": slug.current,
    _updatedAt,
    publishedAt
  },
  "science": *[_type == "scienza" && !seo.noIndex]{
    "slug": slug.current,
    _updatedAt,
    publishedAt
  },
  "categories": *[_type == "category"]{
    "slug": slug.current,
    _updatedAt
  },
  "authors": *[_type == "author"]{
    "slug": slug.current,
    _updatedAt
  }
}`

// Types
/*export interface Recipe {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImageUrl: string
  mainImageAlt: string
  mainImageCaption?: string
  mainImageMetadata?: any
  difficulty: 'facile' | 'medio' | 'difficile' | 'professionale'
  prepTime: number
  cookTime: number
  restTime?: number
  servings: number
  categories: Category[]
  tags?: string[]
  ingredients: IngredientGroup[]
  instructions: InstructionPhase[]
  tips?: any[]
  storage?: string
  variations?: any[]
  relatedTechniques?: TechniquePreview[]
  relatedScience?: SciencePreview[]
  relatedRecipes?: RecipePreview[]
  publishedAt: string
  author: Author
  nutritionalInfo?: NutritionalInfo
  seo: SEO
}
export interface Technique {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  excerpt?: string
  content?: any[]
  difficulty?: 'base' | 'intermedio' | 'avanzato'
  category?: string
  publishedAt: string
}

export interface Science {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  excerpt?: string
  content?: any[]
  topic?: string
  publishedAt: string
}

export interface Author {
  name: string
  bio?: any[]
  image?: any
  social?: {
    instagram?: string
    facebook?: string
    youtube?: string
  }
}

export interface LatestPost {
  _id: string
  _type: 'recipe' | 'technique' | 'science'
  title: string
  slug: { current: string }
  mainImage?: any
  excerpt?: string
  publishedAt: string
}
*/