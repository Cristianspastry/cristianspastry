import { revalidatePath } from 'next/cache'

/**
 * Invalida la cache per una ricetta specifica e le pagine correlate
 *
 * Con Cache Components, questa funzione viene utilizzata per invalidare
 * immediatamente la cache quando una ricetta viene modificata nel CMS.
 *
 * IMPORTANTE: Usare revalidatePath quando serve aggiornamento IMMEDIATO.
 * Per consistenza eventuale, considera l'uso di revalidateTag.
 *
 * @param slug - Slug della ricetta da invalidare
 */


/**
 * Invalida la cache per una ricetta specifica e le pagine correlate
 */
export function revalidateRecipe(slug: string) {
  // Revalida paths (questo invalida anche i cache components)
  revalidatePath(`/ricette/${slug}`)
  revalidatePath('/ricette')
  revalidatePath('/')
  
  console.info(`✅ Revalidated recipe: ${slug}`)
}

/**
 * Invalida la cache per una tecnica specifica e le pagine correlate
 */
export function revalidateTechnique(slug: string) {
  // Revalida paths
  revalidatePath(`/tecniche/${slug}`)
  revalidatePath('/tecniche')
  revalidatePath('/')
  
  console.info(`✅ Revalidated technique: ${slug}`)
}

/**
 * Invalida la cache per un articolo scientifico specifico e le pagine correlate
 */
export function revalidateScience(slug: string) {
  // Revalida paths
  revalidatePath(`/scienza/${slug}`)
  revalidatePath('/scienza')
  revalidatePath('/')
  
  console.info(`✅ Revalidated science article: ${slug}`)
}

/**
 * Invalida tutte le categorie
 */
export function revalidateCategories() {
  revalidatePath('/ricette')
  revalidatePath('/')
  console.info(`✅ Revalidated all categories`)
}