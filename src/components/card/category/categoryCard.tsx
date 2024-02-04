
"use client"

import Image from 'next/image';
import React, { useState } from 'react'

type Props = {
    category : string;
    imageUrl : string;
}

const CategoryCard = ({category,imageUrl}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)} className="ml-4 max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-8 relative">
      
      {/* Immagine della categoria */}
      
      <div className=' relative w-full h-full object-cover rounded-t-md'>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="w-full h-full object-cover rounded-t-md"
        src={imageUrl}
        alt={`Immagine di ${category}`}
      />
       <div className={`absolute inset-0 bg-black opacity-10 rounded-t-md`}></div>
      </div>
      
      {/* Categoria sopra l'immagine */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-4xl font-extrabold text-white">{category}</h2>

        {/* Box bianco sotto il titolo */}
        <div
          className={`bg-white mx-auto h-2 mt-2 ${isHovered ? 'expand-animation' : ''}`}
        ></div>
      </div>
    </div>
  )
}

export default CategoryCard;