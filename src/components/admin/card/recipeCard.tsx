import React from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import DOMPurify from 'dompurify'
import Link from 'next/link'

interface RecipeCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminRecipeCard({ id, title, description, imageUrl, onEdit, onDelete,}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
    
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {/* Utilizziamo dangerouslySetInnerHTML per renderizzare il contenuto HTML della descrizione in modo sicuro */}
        <div 
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
       <div className="flex justify-end space-x-2">
          <Link href={`/recipes/${id}`} passHref>
            <button
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              aria-label="Visualizza ricetta"
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={ () => onEdit}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Modifica ricetta"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={ () => onDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Elimina ricetta"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      </div>
  )
}