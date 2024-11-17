// app/admin/categories/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { register, handleSubmit, reset, setValue } = useForm<Omit<Category, 'id'>>()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories')
    const categoriesSnapshot = await getDocs(categoriesCollection)
    const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category))
    setCategories(categoriesList)
  }

  const onSubmit = async (data: Omit<Category, 'id'>) => {
    try {
      if (editingCategory) {
        await updateDoc(doc(db, 'categories', editingCategory.id), data)
      } else {
        await addDoc(collection(db, 'categories'), data)
      }
      reset()
      setEditingCategory(null)
      fetchCategories()
    } catch (error) {
      console.error("Error adding/updating document: ", error)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setValue('name', category.name)
    setValue('description', category.description)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id))
      fetchCategories()
    } catch (error) {
      console.error("Error removing document: ", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestione Categorie</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingCategory ? 'Modifica Categoria' : 'Aggiungi Nuova Categoria'}</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrizione</label>
          <textarea
            id="description"
            {...register('description', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {editingCategory ? 'Salva Modifiche' : 'Aggiungi Categoria'}
        </button>
        {editingCategory && (
          <button type="button" onClick={() => { setEditingCategory(null); reset(); }} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Annulla
          </button>
        )}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Categorie Esistenti</h2>
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="border-b pb-4">
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="mt-2">
                <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700 mr-2">Modifica</button>
                <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">Elimina</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}