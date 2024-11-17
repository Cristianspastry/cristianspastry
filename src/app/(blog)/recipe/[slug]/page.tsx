// recipe details page

import { getRecipeBySlug } from "@/utils/recipeUtils";
import { IngredientGroup } from "@/models/recipe";
import { ArrowLeft, Book, ChefHat, Clock, Star } from "lucide-react";
import MoldCakeIcon from '../../../../../assets/icon/mold.svg';
import Image from "next/image";
import { RecipeDetailsButton } from "@/components/button/RecipeDetailsButton";
import Accordion from "@/components/accordion/accordion";
import { Metadata, ResolvingMetadata } from "next";

// Simula una funzione che recupera i dati della ricetta da un'API o un database
/*async function getRecipe(slug: string) {
  // In un'applicazione reale, qui faresti una chiamata API o una query al database
  const recipes = {
    'torta-al-cioccolato': {
      title: 'Torta al Cioccolato',
      slug: 'torta-al-cioccolato',
      description: 'Una deliziosa torta al cioccolato fatta in casa',
      ingredients: ['200g di farina', '150g di zucchero', '2 uova', '100g di burro', '50g di cacao amaro'],
      instructions: [
        'Preriscalda il forno a 180°C.',
        'Mescola gli ingredienti secchi in una ciotola.',
        'Aggiungi le uova e il burro fuso, mescola bene.',
        'Versa l\'impasto in una teglia e cuoci per 30 minuti.'
      ],
      image: '/images/torta-al-cioccolato.jpg',
      prepTime: 'PT20M',
      cookTime: 'PT30M',
      totalTime: 'PT50M',
      recipeYield: '8 porzioni',
    },
    // Altre ricette...
  }
  return recipes[slug] || null
} */

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  //parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug)
  
  if (!recipe) {
    return {}
  }

  //const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${recipe.title} | Cristian's Pastry`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title}: Ricetta Dettagliata | Cristian's Pastry`,
      description: recipe.description,
      
    },
  }
}


export default async function RecipePage({params,}: Props) {

  // get slug
  const slug = (await params).slug;

  // get recipe by slug
  const recipeData = getRecipeBySlug(slug);

  // if not found
  if (!recipeData) {
    return (
      <></>
    );
  }

  const renderIngredients = (ingredients: string[] | IngredientGroup[]) => {
    // Verifica se l'elemento è un oggetto e contiene la proprietà 'name'
    if (Array.isArray(ingredients) && ingredients[0] && typeof ingredients[0] === 'object' && 'name' in ingredients[0]) {
      // Ingredienti raggruppati per categoria
      return (
        <>
          {(ingredients as IngredientGroup[]).map((group, index) => (
            <div key={index}>
              <h3 className="font-bold">{group.name}</h3>
              <ul className="list-disc pl-6">
                {group.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      );
    } else {
      // Ingredienti senza raggruppamento (sono semplici stringhe)
      return (
        <ul className="list-disc pl-6">
          {(ingredients as string[]).map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      );
    }
  };



  return (
    <div className="px-5 py-12">
      <div className=" mx-auto"> {/* Expanded max width */}
        <div className="rounded-2xl shadow-xl overflow-hidden"> {/* Removed bg-white */}

          {/* Popular Badge */}
          {recipeData.isPopular && (
            <div className="bg-sky-700 text-white px-4 py-2 absolute right-4 top-4 rounded-full z-10 flex items-center">
              <Star className="w-4 h-4 mr-1" fill="white" />
              Popolare
            </div>
          )}

          {/* Title Section */}
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 text-center pt-8 px-6">
            {recipeData.title}
          </h1>

          {/* Description Section */}
          <p className="text-gray-600 text-center text-lg italic px-6 mt-2 mb-8">
            {recipeData.description}
          </p>

          {/* Image Section */}
          <div className="relative mx-auto px-6 mb-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={recipeData.image}
                alt={recipeData.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
                className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-8">

            {/* Recipe Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                <Clock className="text-sky-700 w-6 h-6" />
                <div>
                  <p className="text-sm text-sky-700 font-medium">Tempo</p>
                  <p className="text-gray-900">{recipeData.prepTime}</p>
                </div>
              </div>
              <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                <ChefHat className="text-sky-700 w-6 h-6" />
                <div>
                  <p className="text-sm text-sky-700 font-medium">Difficoltà</p>
                  <p className="text-gray-900">{recipeData.difficulty}</p>
                </div>
              </div>
              <div className="bg-sky-50 p-4 rounded-xl flex items-center space-x-3">
                <Image src={MoldCakeIcon} alt="Stampo" width={30} height={30} />
                <div>
                  <p className="text-sm text-sky-700 font-medium">Stampo</p>
                  <p className="text-gray-900">{recipeData.moldSize}</p>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="border border-sky-100 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-sky-800 mb-4 flex items-center border-b border-sky-800">
                Ingredienti
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {renderIngredients(recipeData.ingredients)}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-sky-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-sky-800 mb-4">Preparazione</h2>
              <ol className="space-y-4">
                {recipeData.steps.map((step, index) => (
                  <li key={index} className="flex space-x-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-sky-700 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips Section */}
            {recipeData.tips && (
              <Accordion title="Consigli di Cristian">
                {recipeData.tips.map((tip, index) => (
                  <p key={index} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full mr-2" />
                    {tip}
                  </p>
                ))}
              </Accordion>
            )}

            {/* Conservation Section */}
            {recipeData.conservation && (
              <div className="border border-sky-100 rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-sky-800 mb-4 flex items-center">
                  Conservazione
                </h2>
                <p className="text-gray-700">{recipeData.conservation}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <RecipeDetailsButton icon={<ArrowLeft className="w-4 h-4 mr-2" />} text="Indietro" />
              <RecipeDetailsButton icon={<Book className="w-4 h-4 mr-2" />} text="Altre ricette" />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}



/*const renderIngredients = (ingredients: string[] | IngredientGroup[]) => {
  if (Array.isArray(ingredients[0]) && (ingredients[0] as IngredientGroup).name) {
    // Ingredienti raggruppati per categoria
    return (
      <>
        {(ingredients as IngredientGroup[]).map((group, index) => (
          <div key={index}>
            <h3 className="font-medium">{group.name}</h3>
            <ul className="list-disc pl-6">
              {group.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  } else {
    // Ingredienti senza raggruppamento
    return (
      <ul className="list-disc pl-6">
        {(ingredients as string[]).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    );
  }
};*/