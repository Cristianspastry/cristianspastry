import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const recipesCol = collection(db, 'recipes')
    const recipeSnapshot = await getDocs(recipesCol)
    const recipeList = recipeSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return NextResponse.json(recipeList)
  } catch (error) {
    console.error('Errore nel recupero delle ricette:', error)
    return NextResponse.json({ error: 'Errore nel recupero delle ricette' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newRecipe = await request.json()
    const docRef = await addDoc(collection(db, 'recipes'), newRecipe)
    return NextResponse.json({ id: docRef.id, ...newRecipe }, { status: 201 })
  } catch (error) {
    console.error('Errore nella creazione della ricetta:', error)
    return NextResponse.json({ error: 'Errore nella creazione della ricetta' }, { status: 500 })
  }
}