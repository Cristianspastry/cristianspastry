// app/admin/page.tsx
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/recipes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Gestione Ricette</h2>
          <p className="text-gray-600">Aggiungi, modifica o elimina le ricette del blog.</p>
        </Link>
        <Link href="/admin/categories" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Categorie</h2>
          <p className="text-gray-600">Gestisci le categorie delle ricette.</p>
        </Link>
        <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Utenti</h2>
          <p className="text-gray-600">Gestisci gli utenti del blog.</p>
        </Link>
      </div>
    </div>
  )
}