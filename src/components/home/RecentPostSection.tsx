



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

const RecentPostSection = ({ recipes }: Props) => {
  /* {grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8
        sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 flex-row pt-3 max-w-screen-xl}*/
  return (
    <>
      <div className='text-left ml-8 text-black'>
        <h1 className='text-black font-semibold text-3xl leading-9 tracking-tight'>{" Ricette Recenti "}</h1>
      </div>

      <div className='  grid grid-cols-1 gap-3 grid-rows-2 p-3 max-w-screen-xl flex-row xs:m-5 sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe) => (
          <Link key={recipe.title} href={`#/categorie/${recipe.titleCategory}/${recipe.title}`}>
            
              <RecipeCard
                title={recipe.title}
                titleCategory={recipe.titleCategory}
                categoryHref={`#/categorie/${recipe.titleCategory}`}
                preparationTime={recipe.preparationTime}
                difficulty={recipe.difficulty}
                description={recipe.description}
              />
           
          </Link>
        ))}
      </div>
    </>
  );
};


export default RecentPostSection

