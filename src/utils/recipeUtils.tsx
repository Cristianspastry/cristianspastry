import  Recipe  from '@/models/recipe';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'recipe.json'); // Percorso alla cartella data
const jsonData = fs.readFile(filePath, 'utf-8');
const AllRecipes : Recipe[] = JSON.parse(await jsonData);

export function getFilteredRecipes(query: string): Recipe[] {
    return AllRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return AllRecipes.find(recipe => recipe.slug === slug);
}

// Simula una funzione che recupera i dati della ricetta da un'API o un database
// recupera i dati da data/recipe.json

export async function getAllRecipesbyJson(): Promise<Recipe[]> {
    
    return AllRecipes;
}