import { redirect } from "next/navigation";

import RegisterCard from "@/components/auth/RegisterCard";
import { auth } from "@/server/auth";

type RegisterPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  if (session?.user) {
    redirect(resolvedSearchParams?.callbackUrl ?? "/");
  }

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
        <RegisterCard />
      </div>
    </div>
  );
}
