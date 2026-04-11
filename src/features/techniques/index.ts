// Techniques Feature - Public API

// Components
export * from './components'

// Types
export type { Technique, TechniquePreview, TechniqueFilters } from './types'

// Services
export {
  getTechniques,
  getTechniqueBySlug,
  getTechniqueCategories,
  getTechniquesByCategory,
} from './services/techniqueService'
