


import Image from 'next/image';
import React from 'react'

type Props = {
    category : string;
    imageUrl : string;
}

const CategoryCard = ({category,imageUrl}: Props) => {
  return (
    <div className=" ml-4 max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-8">
    {/* Immagine della categoria */}
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    <img
      className="w-full object-cover rounded-t-md"
      src={imageUrl}
      alt={`Immagine di ${category}`}
      width={600}
      height={600}
    />

    {/* Categoria sopra l'immagine */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h2 className="text-3xl font-extrabold text-white">{category}</h2>
    </div>
  </div>
  )
}

export default CategoryCard;