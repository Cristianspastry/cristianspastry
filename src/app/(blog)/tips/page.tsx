"use client";

import { useState } from 'react'
import Image from 'next/image'

// Supponiamo che questi siano i tuoi consigli di pasticceria
const tips = [
  {
    id: 1,
    title: "Misurare gli ingredienti con precisione",
    category: "Tecniche di base",
    content: "Usa sempre tazze e cucchiai di misura precisi. In pasticceria, anche piccole variazioni possono fare una grande differenza.",
    image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmuffin.jpg&w=640&q=75"
  },
  {
    id: 2,
    title: "Temperatura degli ingredienti",
    category: "Preparazione",
    content: "Assicurati che ingredienti come burro e uova siano a temperatura ambiente prima di iniziare. Questo garantisce una migliore incorporazione e consistenza dell'impasto.",
    image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmuffin.jpg&w=640&q=75"
  },
  {
    id: 3,
    title: "Setacciare la farina",
    category: "Tecniche di base",
    content: "Setaccia sempre la farina prima di aggiungerla all'impasto. Questo elimina i grumi e incorpora aria, rendendo i tuoi dolci più leggeri.",
    image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmuffin.jpg&w=640&q=75"
  },
  {
    id: 4,
    title: "Non aprire il forno durante la cottura",
    category: "Cottura",
    content: "Resisti alla tentazione di aprire il forno mentre i tuoi dolci stanno cuocendo. Gli sbalzi di temperatura possono compromettere la lievitazione e la cottura uniforme.",
    image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Fmuffin.jpg&w=640&q=75"
  },
  // Aggiungi altri consigli qui
]

const categories = ["Tutte", "Tecniche di base", "Preparazione", "Cottura", "Decorazione"]

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState("Tutte")
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const filteredTips = activeCategory === "Tutte" 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Consigli di Pasticceria</h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === category
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-pink-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredTips.map(tip => (
          <div key={tip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={tip.image}
              alt={tip.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{tip.category}</p>
              <p className="text-gray-700">
                {expandedTip === tip.id ? tip.content : `${tip.content.slice(0, 100)}...`}
              </p>
              <button
                onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                className="mt-4 text-pink-500 hover:text-pink-700 transition-colors"
              >
                {expandedTip === tip.id ? "Mostra meno" : "Leggi tutto"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          Nessun consiglio trovato per questa categoria. Prova a selezionare un'altra categoria.
        </p>
      )}
    </div>
  )
}