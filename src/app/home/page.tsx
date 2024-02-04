import Image from 'next/image'
import { Cardo } from 'next/font/google';
import { siteMetaData } from '@/utils/siteMetaData';
import Link from 'next/link';
import HomeCoverSection from '@/components/home/RecentPostSection';
import RecentPostSection from '@/components/home/RecentPostSection';
import { Carousel } from 'flowbite-react';
import Script from 'next/script';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import recipes from '@/data/recipe.json';


export default function Home() {
  return (
    <main className='divide-y divide-gray-200 space-y-2 pb-8 pt-6 md:space-y-5 mb-auto items-center self-center'>
      <RecentPostSection  recipes={recipes}/>
      <NewsLetter/>
    </main>
  )
}