import React from 'react'
import { Loader2 } from 'lucide-react'
import RecipeForm from '@/presentation/components/(ADMIN)/form/RecipeForm'
import { getRecipebyId } from '@/lib/db'

type Props = {
  params: {
    slug: string
  }
}


export default function EditRecipePage({ params }: Props) {
  const id = React.use(Promise.resolve(params.slug))
  const recipe = React.use(getRecipebyId(id))

  if (!recipe) {
    return <div className="text-center">Nessuna ricetta trovata</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Modifica ricetta</h1>
      <React.Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
        <RecipeForm initialRecipe={recipe} mode="edit" />
      </React.Suspense>
    </div>
  )
}