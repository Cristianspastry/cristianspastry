// app/api/recipes/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/utils/firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, 'recipes', params.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
    } else {
      return NextResponse.json({ message: 'Ricetta non trovata' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel recupero della ricetta' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const docRef = doc(db, 'recipes', params.id)
    await updateDoc(docRef, updateData)
    return NextResponse.json({ id: params.id, ...updateData })
  } catch (error) {
    return NextResponse.json({ error: 'Errore nell\'aggiornamento della ricetta' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, 'recipes', params.id)
    await deleteDoc(docRef)
    return NextResponse.json({ message: 'Ricetta eliminata con successo' })
  } catch (error) {
    return NextResponse.json({ error: 'Errore nell\'eliminazione della ricetta' }, { status: 500 })
  }
}