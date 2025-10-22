// types.ts - Tipi TypeScript per il blog di pasticceria

export interface SEO {
    metaTitle?: string
    metaDescription?: string
    focusKeyphrase?: string
    synonyms?: string[]
    ogImageUrl?: string
    noIndex?: boolean
    canonicalUrl?: string
  }
  
  export interface Author {
    _id: string
    name: string
    slug: { current: string }
    imageUrl: string
    imageAlt: string
    bio: any[]
    role?: string
    expertise?: string[]
    social?: {
      instagram?: string
      facebook?: string
      youtube?: string
      tiktok?: string
      website?: string
      twitter?: string
    }
    email?: string
  }
  
  export interface Category {
    _id: string | number
    title: string
    emoji : string
    
    featured? : boolean
    slug: { current: string }
    description?: string
    imageUrl?: string
    imageAlt?: string
    color?: string
    recipeCount?: number
  }
  
  export interface IngredientItem {
    quantity: string
    unit?: string
    ingredient: string
    notes?: string
  }
  
  export interface IngredientGroup {
    group?: string
    items: IngredientItem[]
  }
  
  export interface InstructionStep {
    stepNumber?: number
    description: string
    image?: {
      url: string
      alt: string
    }
    tip?: string
  }
  
  export interface InstructionPhase {
    title?: string
    steps: InstructionStep[]
  }
  
  export interface NutritionalInfo {
    calories?: number
    protein?: number
    carbohydrates?: number
    fat?: number
    fiber?: number
    sugar?: number
  }
  
  export interface Recipe {
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
    difficulty: 'facile' | 'media' | 'difficile' | 'professionale'
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
    featured : boolean ;
  }
  
  export interface RecipePreview {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    imageUrl: string
    imageAlt?: string
    difficulty: string
    prepTime: number
    publishedAt: string
  }
  
  // ============================================
  // TECNICHE
  // ============================================
  
  export interface Equipment {
    name: string
    description?: string
    required: boolean
    image?: {
      url: string
      alt: string
    }
  }
  
  export interface TechniqueStep {
    stepNumber?: number
    title: string
    description: any[]
    imageUrl?: string
    imageAlt?: string
    imageCaption?: string
    video?: string
    tips?: string[]
    commonMistakes?: {
      mistake: string
      solution: string
    }[]
  }
  
  export interface KeyPoint {
    point: string
    explanation?: string
  }
  
  export interface Variation {
    name: string
    description: any[]
    imageUrl?: string
    imageAlt?: string
  }
  
  export interface Troubleshooting {
    problem: string
    cause?: string
    solution: string
  }
  
  export interface Technique {
    _id: string
    _createdAt: string
    _updatedAt: string
    title: string
    slug: { current: string }
    excerpt: string
    mainImageUrl: string
    mainImageAlt: string
    mainImageCaption?: string
    difficulty: 'base' | 'intermedio' | 'avanzato' | 'professionale'
    executionTime: number
    category: string
    tags?: string[]
    introduction: any[]
    equipment: Equipment[]
    steps: TechniqueStep[]
    keyPoints?: KeyPoint[]
    variations?: Variation[]
    troubleshooting?: Troubleshooting[]
    videoTutorial?: string
    relatedRecipes?: RecipePreview[]
    relatedScience?: SciencePreview[]
    prerequisiteTechniques?: TechniquePreview[]
    advancedTechniques?: TechniquePreview[]
    publishedAt: string
    author: Author
    estimatedCost?: {
      currency: string
      value: number
    }
    seo: SEO
  }
  
  export interface TechniquePreview {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    imageUrl: string
    difficulty: string
    executionTime?: number
    publishedAt: string
  }
  
  // ============================================
  // SCIENZA
  // ============================================
  
  export interface HighlightBox {
    type: 'tip' | 'warning' | 'info' | 'science'
    title?: string
    content: string
  }
  
  export interface ScienceSection {
    sectionTitle: string
    sectionType: 'text' | 'scientific' | 'example' | 'curiosity' | 'myth' | 'comparison'
    content: any[]
    highlightBox?: HighlightBox
  }
  
  export interface KeyTakeaway {
    point: string
    explanation?: string
  }
  
  export interface PracticalApplication {
    title: string
    description: string
    example?: string
  }
  
  export interface Experiment {
    title: string
    hypothesis?: string
    method: any[]
    results?: any[]
    conclusion?: string
    images?: {
      url: string
      alt: string
      caption?: string
    }[]
  }
  
  export interface GlossaryTerm {
    term: string
    definition: string
  }
  
  export interface Reference {
    type: 'book' | 'article' | 'website' | 'video' | 'other'
    title: string
    author?: string
    url?: string
    year?: number
    notes?: string
  }
  
  export interface Science {
    _id: string
    _createdAt: string
    _updatedAt: string
    title: string
    slug: { current: string }
    excerpt: string
    mainImageUrl: string
    mainImageAlt: string
    mainImageCaption?: string
    articleType: 'ingredienti' | 'processi' | 'reazioni' | 'fisica' | 'dietro-quinte' | 'miti' | 'storia'
    complexity: 'base' | 'intermedio' | 'avanzato'
    readingTime: number
    tags?: string[]
    introduction: any[]
    sections: ScienceSection[]
    keyTakeaways?: KeyTakeaway[]
    practicalApplications?: PracticalApplication[]
    experiments?: Experiment[]
    glossary?: GlossaryTerm[]
    references?: Reference[]
    conclusion?: any[]
    relatedRecipes?: RecipePreview[]
    relatedTechniques?: TechniquePreview[]
    relatedScience?: SciencePreview[]
    publishedAt: string
    updatedAt?: string
    author: Author
    featured?: boolean
    seo: SEO
  }
  
  export interface SciencePreview {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    imageUrl: string
    articleType: string
    complexity?: string
    readingTime?: number
    publishedAt: string
    featured?: boolean
  }
  
  // ============================================
  // RICERCA E HOMEPAGE
  // ============================================
  
  export interface SearchResults {
    recipes: RecipePreview[]
    techniques: TechniquePreview[]
    science: SciencePreview[]
  }
  
  export interface HomepageData {
    featuredRecipes: RecipePreview[]
    featuredTechniques: TechniquePreview[]
    featuredScience: SciencePreview[]
    categories: Category[]
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

  // ============================================
  // SITEMAP
  // ============================================
  
  export interface SitemapEntry {
    slug: string
    _updatedAt: string
    publishedAt?: string
  }
  
  export interface FullSitemap {
    recipes: SitemapEntry[]
    techniques: SitemapEntry[]
    science: SitemapEntry[]
    categories: SitemapEntry[]
    authors: SitemapEntry[]
  }