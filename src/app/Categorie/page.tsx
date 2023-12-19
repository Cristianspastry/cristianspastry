import CategorySection from "@/components/category/CategorySection";
import { promises as fs } from "fs";
import category from '@/data/category.json';

export default async function Categorie() {


    return (
      <main className='divide-y divide-gray-200 space-y-2 pb-8 pt-6 md:space-y-5 mb-auto items-center self-center'>
        <CategorySection categories={category}/>
      </main>
    )
  }
  