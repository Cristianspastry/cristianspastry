import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterCard from "@/components/auth/RegisterCard";
import { auth } from "@/server/auth";

type RegisterPageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const session = await auth();
  if (session?.user) {
    redirect(searchParams?.callbackUrl ?? "/");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Cristian's Pastry"
            width={64}
            height={64}
            className="h-16 w-16"
            priority
          />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
              Area riservata
            </p>
            <h1 className="text-4xl font-serif font-bold text-primary-900">
              Registrati
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Crea un account per accedere alle funzionalita riservate del blog.
        </p>

        <div className="mt-6 space-y-3 text-gray-600">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Accesso personalizzato con ruolo dedicato.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Gestisci tecniche, ricette e articoli.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Reset password rapido in ogni momento.</span>
          </div>
        </div>
      </div>

      <RegisterCard />
    </div>
  );
}
