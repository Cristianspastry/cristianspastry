"use client"

import RecipeCard from "@/components/card/recipe/recipeCard";
import recipes from '@/data/recipe.json';
import RecipeModel from "@/model/recipe";
import Link from "next/link";
import { useEffect } from "react";

export default function CategoryDetails({ params }: { params: { categoryDetails: string } }) {
 const category = params.categoryDetails as String;


 return (
      <>
      <main className='divide-y divide-gray-200 space-y-2 pb-8 pt-6 md:space-y-5 mb-auto items-center self-center'>
       <h1> ricette della categoria selezionata </h1> 
        <p> categoria : {category} </p>
       </main>
      </>
    )
  }