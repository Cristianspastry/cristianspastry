"use client";
import { useRouter } from "next/navigation";

// Definizione del tipo Props
type Props = {
  icon: React.ReactNode; // Icona da passare come elemento React
   // Funzione che viene chiamata al click
  text: string;          // Testo che appare nel bottone
};

export const RecipeDetailsButton = ({ icon, text }: Props) => {
  
  // Funzione che viene chiamata al click
  // va indietro [agggiungere la funzione di altre ricette]
    const useGoBack = () => {
    const router = useRouter();
    return () =>router.back();
  };
  return (
    <button
      onClick={useGoBack()} // Gestisce l'evento di click
      className="flex items-center px-6 py-3 bg-sky-700 text-white rounded-full font-medium shadow-lg transition hover:bg-sky-800 hover:scale-105"
    >
      <span className="w-4 h-4 mr-2">{icon}</span>
      {text}
    </button>
  );
};
