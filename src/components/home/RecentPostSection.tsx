



import Link from 'next/link'
import React from 'react'
import RecipeCard from '../card/recipe/recipeCard'
import { generateKey } from 'crypto'
import RecipeModel from '@/model/recipe'

type Props = {
  recipes : {
    title : string
    href : string
    titleCategory : string
    preparationTime : string
    difficulty : string
    description : string
  }[],
}

const RecentPostSection = ({recipes}: Props) => {
 
  return (
    <>
    
    <div className=' text-left ml-8 text-black '>
      <h1 className=' text-black font-semibold text-3xl leading-9 tracking-tight'>{" Ricette Recenti "}</h1>
  </div>

    <div className='grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 flex-row pt-3 max-w-screen-xl'>
      {recipes.map((recipe) => (
        <>
         <RecipeCard 
          key={recipe.title} 
          title={recipe.title} 
          titleCategory={recipe.titleCategory} 
          href={recipe.href} 
          preparationTime={recipe.preparationTime} 
          difficulty={recipe.difficulty} 
          description={recipe.description}
         />
        </>
      ))}
    </div>
    
    </>
  )
}


export default RecentPostSection

