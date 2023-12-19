



import Link from 'next/link'
import React from 'react'
import RecipeCard from '../card/recipe/recipeCard'
import { generateKey } from 'crypto'
import RecipeModel from '@/model/recipe'

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

const RecentPostSection = ({recipes}: Props) => {
 
  
  const Recipes  : RecipeModel[] = [
    {
      title : "Pan Di Spagna",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna1",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna2",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna3",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna4",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna5",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna6",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna7",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna8",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
    {
      title : "Pan Di Spagna9",
      href : " #/category/ ",
      titleCategory : " Masse Montate",
      preparationTime : "25 min",
      difficulty : " Media ",
      description : "Il Pan di Spagna, una base versatile per dolci italiani, ottiene la sua sofficità da una combinazione di farina debole e fecola, senza l'uso di lievito. Le uova vengono montate per introdurre bollicine d'aria, assicurando una consistenza leggera. Questa ricetta offre molte varianti, tra cui versioni al cacao, senza glutine e salate. Con diversi metodi di preparazione, è possibile ottenere un risultato eccellente in modo semplice, riducendo la pulizia. Perfetto per torte speciali o creazioni creative come dolci a tema Halloween, come le dolci bare farcite con marmellata."
    },
  ];
   
  return (
    <>
    
    <div className=' text-left ml-8 text-black '>
      <h1 className=' text-black font-semibold text-3xl leading-9 tracking-tight'>{" Ricette Recenti "}</h1>
  </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 flex-row pt-3 max-w-screen-xl'>
      {recipes.map((recipe) => (
        <>
         <RecipeCard 
          key={recipe.title} 
          title={recipe.title} 
          titleCategory={recipe.titleCategory} 
          href={recipe.href} 
          preparationTime={recipe.preparationTime} 
          difficulty={recipe.difficulty} 
          description={recipe.description}
         />
        </>
      ))}
    </div>
    
    </>
  )
}


export default RecentPostSection

