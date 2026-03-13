import Image from "next/image";
import { redirect } from "next/navigation";

import SignInCard from "@/components/auth/SignInCard";
import { auth } from "@/server/auth";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

type SignInPageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  if (session?.user) {
    redirect(searchParams?.callbackUrl ?? "/");
  }

  const prismaCheck = ensurePrismaClientHasFields(["passwordHash"]);
  const devWarning = prismaCheck.ok
    ? null
    : prismaCheck.message ?? "Prisma Client out of date.";

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
              Accedi
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Accedi per gestire contenuti, revisioni e pubblicazioni del blog.
        </p>

        <div className="mt-6 space-y-3 text-gray-600">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Accesso rapido con provider esterni.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Ruoli e permessi separati per editor e admin.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Esperienza coerente con lo stile del blog.</span>
          </div>
        </div>
      </div>

      <SignInCard devWarning={devWarning} />
    </div>
  );
}
