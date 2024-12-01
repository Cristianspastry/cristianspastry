// app/admin/layout.tsx
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row ">
     
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className=" p-4 bg-gray-800 text-white w-full md:w-64 md:min-h-screen">
            <nav>
              <h2 className="text-lg font-bold mb-4">Menu</h2>
              <ul className="space-y-2">
                <li>

                  <Link href="/admin/categories" className="block hover:text-gray-300 text-xl">
                    Categorie
                  </Link>


                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer hover:text-gray-300">
                      <span className="font-semibold text-lg">Gestione Ricette</span>
                      <span className="group-open:rotate-180 transition-transform">&or;</span>
                    </summary>
                    <ul className="pl-4 mt-2 space-y-1">
                      <li>
                        <Link href="/admin/recipes/add" className="block hover:text-gray-300 text-xl">
                          Aggiungi Ricetta
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/recipes" className="block hover:text-gray-300 text-xl">
                          Visualizza Ricette
                        </Link>
                      </li>
                    </ul>
                  </details>

                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4">{children}</main>
        </div>

    </div>
  )
}