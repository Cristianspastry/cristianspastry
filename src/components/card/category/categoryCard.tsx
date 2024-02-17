
"use client"

import CategoryModel from '@/model/category';
import Image from 'next/image';
import React, { useState } from 'react'
import CategoryCardTitle from './categoryCardTitle';
import RecipeModel from '@/model/recipe';

type Props = {
    category : {
        titleCategory : string;
        imageUrl : string;
    };
}

const CategoryCard = ({category} : Props) => {
 
  return (
    <div  className="ml-4 max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-8 relative">
      
      {/* Immagine della categoria */}
      
      <div className=' relative w-full h-full object-cover rounded-t-md'>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="w-full h-full object-cover rounded-t-md"
        src={category.imageUrl}
        alt={`${category.titleCategory}`}
      />
       <div className={`absolute inset-0 bg-black opacity-10 rounded-t-md`}></div>
      </div>
      
      {/* titolo della Categoria sopra l'immagine */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-4xl font-extrabold text-white">{`${category.titleCategory}`}</h2> 
      </div>

    </div>
  )
}

export default CategoryCard;