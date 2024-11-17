

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Chi Siamo</h1>
          
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Image
              src="https://media.istockphoto.com/id/666908954/it/foto/bel-chef-che-versa-olio-doliva-sul-pasto.jpg?s=2048x2048&w=is&k=20&c=scuht5ypWh9sQWlDFwA94i69EkyyN2R4JrB7EltIUT4="
              alt="Foto del pasticcere"
              width={300}
              height={300}
              className="rounded-full"
            />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Benvenuti nel Mondo Dolce di [Il Tuo Nome]</h2>
              <p className="text-gray-600">
                Ciao! Sono [Il Tuo Nome], il pasticcere dietro questo blog. La mia passione per i dolci è iniziata nella cucina di mia nonna e da allora non si è mai fermata.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">La Nostra Storia</h3>
              <p className="text-gray-600">
                Questo blog è nato nel [Anno] come un modo per condividere le mie ricette preferite e le tecniche che ho imparato nel corso degli anni. Da allora, è cresciuto fino a diventare una comunità di appassionati di dolci da tutto il mondo.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">La Nostra Missione</h3>
              <p className="text-gray-600">
                La nostra missione è semplice: ispirare le persone a creare dolci deliziosi nella propria cucina. Crediamo che la pasticceria sia un'arte accessibile a tutti, e vogliamo condividere la gioia che porta nella nostra vita.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Cosa Troverai Qui</h3>
              <ul className="list-disc list-inside text-gray-600 pl-4">
                <li>Ricette dettagliate e facili da seguire</li>
                <li>Consigli e trucchi per migliorare le tue abilità di pasticceria</li>
                <li>Recensioni di attrezzature e ingredienti</li>
                <li>Storie e aneddoti dal mondo della pasticceria</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Restiamo in Contatto</h3>
              <p className="text-gray-600">
                Grazie per essere parte di questa dolce avventura! Non esitare a contattarmi per domande, suggerimenti o semplicemente per condividere le tue creazioni.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}