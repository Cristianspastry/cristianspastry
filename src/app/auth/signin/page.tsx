import { redirect } from "next/navigation";

import SignInCard from "@/features/auth/components/SignInCard";
import { auth } from "@/server/auth";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  if (session?.user) {
    redirect(resolvedSearchParams?.callbackUrl ?? "/");
  }

  const prismaCheck = ensurePrismaClientHasFields(["passwordHash"]);
  const devWarning = prismaCheck.ok
    ? null
    : prismaCheck.message ?? "Prisma Client out of date.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-amber-950">
          Cristian's Pastry
        </h1>
        <p className="text-xs mt-2 uppercase tracking-[0.25em] text-amber-600 font-medium">
          Area riservata
        </p>
      </div>

      <div className="w-full">
        <SignInCard devWarning={devWarning} />
      </div>
    </div>
  );
}
