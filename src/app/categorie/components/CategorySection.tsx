


import React from 'react'
import CategoryCard from '../../../components/card/category/categoryCard';
import Link from 'next/link';
import CategoryModel from '@/model/category';
import RecipeModel from '@/model/recipe';

type Props = {
  categories: CategoryModel[];
}

const CategorySection = ({ categories }: Props) => {
  return (
    <>
      <div className=' text-center ml-8 text-black '>
        <h1 className=' text-black font-semibold text-4xl leading-9 tracking-tight'>{" Categorie "}</h1>
      </div>
      <div className=' grid grid-cols-1 gap-3 grid-rows-2 p-3 max-w-screen-xl flex-row xs:m-1 sm:grid-cols-2 lg:grid-cols-3'>
        {
          categories.map((category: CategoryModel) => (
            <>
            <Link href={`/categorie/${category.titleCategory}`}>
            
              <CategoryCard key={category.titleCategory}  category={category} />
            </Link>
            </>
          ))
        }
      </div>
    </>
  )
}
export default CategorySection;