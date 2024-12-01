"use client"; // Direttiva per indicare che questo componente è client-side.
import { deleteRecipe, getAllRecipes } from '@/lib/db'; // Importa la funzione per recuperare tutte le ricette dal database Firebase.
import Recipe from '@/core/entities/Recipe'; // Importa il modello TypeScript che definisce la struttura di una ricetta.
import Link from 'next/link'; // Componente di Next.js per creare link interni all'app.
import { useEffect, useState } from 'react'; // Importa React per creare componenti.


function RecipesAdminSection() { // Rimosso il tipo Props vuoto per semplificare il codice.
 const [recipes, setRecipes] = useState<Recipe[]>([]); // Inizializza lo stato per le ricette con un array vuoto.


  // Recupero delle ricette dal database con gestione degli errori.
 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes(); // Recupera le ricette
        setRecipes(data); // Aggiorna lo stato
      } catch (error) {
        console.error("Errore durante il recupero delle ricette:", error); // Logga eventuali errori
      }
    };
  
    fetchRecipes(); // Chiama la funzione asincrona
  }, []); // Dipendenze: [] indica che viene eseguito solo una volta al montaggio
  
 
// Funzione per eliminare una ricetta dal database.
 async function handleDelete(recipeId: string) {
  if (
    confirm("Sei sicuro di voler eliminare questa ricetta?")) { 
    
    // Conferma prima dell'eliminazione.
    
    try {
      
      // Qui va implementata la logica per eliminare la ricetta dal database Firebase.
       await deleteRecipe(recipeId); // Elimina la ricetta
      
       console.log(`Eliminazione della ricetta con ID: ${recipeId}`); // Logga l'eliminazione
      
       // Aggiorna lo stato o effettua altre azioni necessarie
       setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
       
       // aggiorna la pagina per rimuovere la ricetta

       
      
    } catch (error) {
      console.error("Errore durante l'eliminazione della ricetta:", error); // Logga eventuali errori.
    }
  }
}
  return (
    <>
      {/* Pulsante per aggiungere una nuova ricetta */}
      <div className="mb-4">
        <Link href="/admin/recipes/add" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Aggiungi Ricetta
          </button>
        </Link>
      </div>

      {/* Sezione che mostra la lista delle ricette */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Lista Ricette</h3>
        {recipes.length > 0 ? ( // Controllo condizionale per gestire il caso in cui non ci siano ricette.
            <div>
            <h1 className="text-2xl font-bold mb-4">Elenco Ricette</h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">ID</th>
                    <th className="border px-4 py-2 text-left">Nome</th>
                    <th className="border px-4 py-2 text-left">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="border px-4 py-2">{recipe.id}</td>
                      <td className="border px-4 py-2">{recipe.title}</td>
                      <td className="border px-4 py-2">
                        <a
                          href={`/admin/recipes/edit/${recipe.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Modifica
                        </a>
                        <button
                          className="ml-2 text-red-500 hover:underline"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          Elimina
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Messaggio di fallback se non ci sono ricette.
          <p className="text-gray-500">Non ci sono ricette disponibili.</p>
        )}
      </div>
    </>
  );
}

export default RecipesAdminSection; // Esporta il componente per poter essere utilizzato altrove.
