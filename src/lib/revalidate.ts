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
export function revalidateRecipe(slug: string) {
  revalidatePath(`/ricette/${slug}`)
  revalidatePath('/ricette')
  revalidatePath('/')
  console.info(`Revalidated recipe path for slug: ${slug}`)
}

/**
 * Invalida la cache per una tecnica specifica e le pagine correlate
 */
export function revalidateTechnique(slug: string) {
  revalidatePath(`/tecniche/${slug}`)
  revalidatePath('/tecniche')
  revalidatePath('/')
  console.info(`Revalidated technique path for slug: ${slug}`)
}

/**
 * Invalida la cache per un articolo scientifico specifico e le pagine correlate
 */
export function revalidateScience(slug: string) {
  revalidatePath(`/scienza/${slug}`)
  revalidatePath('/scienza')
  revalidatePath('/')
  console.info(`Revalidated science article path for slug: ${slug}`)
}