// app/admin/users/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User))
    setUsers(usersList)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id))
      fetchUsers()
    } catch (error) {
      console.error("Error removing document: ", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestione Utenti</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Utenti Registrati</h2>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.id} className="border-b pb-4">
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Ruolo: {user.role}</p>
              <div className="mt-2">
                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">Elimina</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}