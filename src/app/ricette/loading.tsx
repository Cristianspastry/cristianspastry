export default function LoadingRecipes() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-20">
                <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl animate-pulse">
                            Ricette di Pasticceria
                        </h1>
                        <p className="text-xl text-primary-100 md:text-2xl animate-pulse">
                            Caricamento del menu dolci in corso...
                        </p>
                    </div>
                </div>
            </section>

            {/* Skeletons Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="flex h-[450px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 animate-pulse">
                                {/* Immagine Mock */}
                                <div className="aspect-[4/3] w-full bg-gray-200" />

                                {/* Contenuto Mock */}
                                <div className="flex flex-1 flex-col p-6">
                                    {/* Titolo */}
                                    <div className="mb-4 h-7 w-3/4 rounded bg-gray-200" />
                                    <div className="mb-6 h-7 w-1/2 rounded bg-gray-200" />

                                    {/* Meta info */}
                                    <div className="mb-4 flex gap-4">
                                        <div className="h-5 w-16 rounded bg-gray-200" />
                                        <div className="h-5 w-20 rounded bg-gray-200" />
                                    </div>

                                    {/* Testo */}
                                    <div className="space-y-3 mt-4">
                                        <div className="h-4 w-full rounded bg-gray-200" />
                                        <div className="h-4 w-5/6 rounded bg-gray-200" />
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto flex justify-between pt-4 border-t border-gray-100">
                                        <div className="h-5 w-24 rounded bg-gray-200" />
                                        <div className="h-9 w-9 rounded-full bg-gray-200" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
