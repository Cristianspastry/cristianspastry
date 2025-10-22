import { revalidatePath, revalidateTag } from 'next/cache'

export function revalidateRecipe(slug: string) {
  revalidatePath(`/ricette/${slug}`)
  revalidatePath('/ricette')
  revalidatePath('/')
  revalidateTag('recipes')
}

export function revalidateTechnique(slug: string) {
  revalidatePath(`/tecniche/${slug}`)
  revalidatePath('/tecniche')
  revalidateTag('techniques')
}

export function revalidateScience(slug: string) {
  revalidatePath(`/scienza/${slug}`)
  revalidatePath('/scienza')
  revalidateTag('science')
}