"use client"

import { cx } from '@/utils';
import { Url } from 'next/dist/shared/lib/router/router';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import React from 'react'
import { FaClock, FaRegSmile, FaUtensils } from 'react-icons/fa';
import RecipeCardTitle from './recipeCardTitle';
import RecipeCardCategory from './recipeCardCategory';
import RecipeCardDescription from './recipeCardDescription';
import RecipeCardDetails from './recipeCardDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { onErrorImg, onLoadImg } from '@/utils/onImage';


type Props = {
  title: string,
  href: string,
  titleCategory: string,
  preparationTime: string,
  difficulty: string,
  description: string
}

const RecipeCard = ({ title, href, titleCategory, preparationTime, difficulty, description }: Props) => {
  const img = "https://www.misya.info/wp-content/uploads/2018/08/pan-di-spagna.jpg";

  return (
    <div className=" sm:m-4 md:m-4 lg:m-4 xl:m-4 max-w-md  justify-center my-2 mx-2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 relative  ">

      {/* Immagine della ricetta */}
      <Image
        className="w-full h-48 object-cover rounded-t-md"
        src={img}
        alt="Immagine della ricetta"
        width={600}
        height={600}
        onLoad={onLoadImg}
        onError={onErrorImg}
        priority
      />
      {/* Fine Immagine della ricetta */}

      {/* Contenuto della ricetta */}
      <div className="p-4">

        {/* Titolo della ricetta */}
        <RecipeCardTitle title={title} />

        {/* Categoria della ricetta */}
        <RecipeCardCategory titleCategory={titleCategory} href={href} />

        {/* Dettagli della ricetta */}
        <RecipeCardDetails preparationTime={preparationTime} difficulty={difficulty} />

        {/* Breve descrizione della ricetta */}
        <RecipeCardDescription description={description} />

      </div>
    </div>

  )
}


export default RecipeCard;