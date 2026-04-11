import SignOutCard from "@/features/auth/components/SignOutCard";
import { auth } from "@/server/auth";

type SignOutPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignOutPage({ searchParams }: SignOutPageProps) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  const userLabel =
    session?.user?.email ?? session?.user?.name ?? session?.user?.id ?? null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-amber-950">
          Cristian's Pastry
        </h1>
        <p className="text-xs mt-2 uppercase tracking-[0.25em] text-amber-600 font-medium">
          Logout
        </p>
      </div>

      <div className="w-full">
        <SignOutCard
          isSignedIn={!!session?.user}
          userLabel={userLabel}
          callbackUrl={resolvedSearchParams?.callbackUrl ?? null}
        />
      </div>
    </div>
  );
}
