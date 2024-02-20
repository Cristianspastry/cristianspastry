



import Link from 'next/link'
import React from 'react'
import RecipeCard from '../card/recipe/recipeCard'
import { generateKey } from 'crypto'
import RecipeModel from '@/model/recipe'
import { renderToStaticMarkup } from 'react-dom/server'
import { Heading } from 'react-aria-components'
import Image from 'next/image'
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
  
  const RecipeCard2 = () => {
    return (
      <>
      <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      
        <div className="aspect-h-3 aspect-w-4 relative bg-gray-100">
          <Image
            src={"https://www.misya.info/wp-content/uploads/2018/08/pan-di-spagna.jpg"}
            alt='IMAGE'
            className='object-cover'
            width={600}
            height={600}
          />
        </div>
      
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <h2 >
          
            <h1>
              {"TITOLO"}
            </h1>  
          
        </h2>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {"24/09/24"}
        </p>
        
      </div>
    </li>
      </>
    )
  }

  return (
    <>
      <div className='text-left'>
        <h1 className='text-black font-semibold text-4xl leading-9 tracking-tight ml-8 xs:ml-10 '>{"Ricette Recenti"}</h1>
      </div>

      <div className='  grid grid-cols-1 gap-3 grid-rows-2 p-3 max-w-screen-xl flex-row xs:ml-4  xs:p-6 sm:m-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {recipes.map((recipe) => (
          <Link key={recipe.title} href={`/categorie/${encodeURIComponent(recipe.titleCategory.toLocaleLowerCase())}/${encodeURIComponent(recipe.title.toLocaleLowerCase())}`}>
            
              <RecipeCard2
                
              />
           
          </Link>
        ))}
      </div>
    </>
  );
};


export default RecentPostSection

