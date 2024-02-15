export default function RecipeDetails({ params }: { params: { recipeDetails: string } }) {
    
     return (
        <>
         <h1>{params.recipeDetails}</h1>
        </>
      )
    }