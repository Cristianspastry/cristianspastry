


import React from 'react'
import CategoryCard from '../card/category/categoryCard';

type Props = {
  categories : {title: string,imageUrl : string}[];
}

const CategorySection = ({categories}: Props) => {
  return (
    <>
     <div className=' text-center ml-8 text-black '>
      <h1 className=' text-black font-semibold text-4xl leading-9 tracking-tight'>{" Categorie "}</h1>
  </div>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 flex-row pt-3 max-w-screen-xl'>
    {
      categories.map((category) => (
        <>
        <CategoryCard key={category.title} category={category.title} imageUrl={category.imageUrl}/>
        </>
      ))
    }
  </div>
    </>
  )
}
export default CategorySection;