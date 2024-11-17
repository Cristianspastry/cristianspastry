// app/admin/layout.tsx
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="bg-gray-800 text-white w-full md:w-64 md:min-h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/recipes" className="block py-2 px-4 hover:bg-gray-700">Gestione Ricette</Link>
          <Link href="/admin/categories" className="block py-2 px-4 hover:bg-gray-700">Categorie</Link>
          <Link href="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Utenti</Link>
          <Link href="/" className="block py-2 px-4 hover:bg-gray-700">Torna al Blog</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}