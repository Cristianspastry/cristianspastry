import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipes/list/RecipeCard";
import { TechniqueCard } from "@/components/technique/list/TechniqueCard";
import { ScienceCard } from "@/components/science/ScienceCard";
import ProfileLinkToast from "@/components/profile/ProfileLinkToast";
import { env } from "@/env";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { isRoleAtLeast } from "@/server/auth/roles";
import { client } from "@/sanity/lib/client";
import {
  FAVORITE_RECIPES_QUERY,
  FAVORITE_TECHNIQUES_QUERY,
  FAVORITE_SCIENCE_QUERY,
} from "@/sanity/lib/queries";
import type { RecipePreview, TechniquePreview, SciencePreview } from "@/sanity/lib/types";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/profilo")}`);
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      passwordHash: true,
    },
  });

  if (!user) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/profilo")}`);
  }

  const linkedAccounts = await db.account.findMany({
    where: { userId: session.user.id },
    select: { provider: true },
  });
  const linkedProviders = new Set(linkedAccounts.map((account) => account.provider));
  const accountCount = linkedAccounts.length;
  const isGoogleEnabled = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET);
  const isGoogleLinked = linkedProviders.has("google");
  const isFacebookEnabled = Boolean(env.AUTH_FACEBOOK_ID && env.AUTH_FACEBOOK_SECRET);
  const isFacebookLinked = linkedProviders.has("facebook");
  const isTikTokEnabled = Boolean(env.AUTH_TIKTOK_ID && env.AUTH_TIKTOK_SECRET);
  const isTikTokLinked = linkedProviders.has("tiktok");

  const favoriteRecipeEntries = await db.favoriteRecipe.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { recipeId: true },
  });

  const favoriteTechniqueEntries = await db.favoriteTechnique.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { techniqueId: true },
  });

  const favoriteScienceEntries = await db.favoriteScience.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { scienceId: true },
  });

  const favoriteRecipeIds = favoriteRecipeEntries.map((fav) => fav.recipeId);
  const favoriteTechniqueIds = favoriteTechniqueEntries.map((fav) => fav.techniqueId);
  const favoriteScienceIds = favoriteScienceEntries.map((fav) => fav.scienceId);
  const totalFavorites =
    favoriteRecipeIds.length + favoriteTechniqueIds.length + favoriteScienceIds.length;
  let favoriteRecipes: RecipePreview[] = [];
  let favoriteTechniques: TechniquePreview[] = [];
  let favoriteScience: SciencePreview[] = [];

  if (favoriteRecipeIds.length > 0) {
    try {
      const results = await client.fetch<RecipePreview[]>(
        FAVORITE_RECIPES_QUERY,
        { ids: favoriteRecipeIds },
      );
      const map = new Map(results.map((recipe) => [recipe._id, recipe]));
      favoriteRecipes = favoriteRecipeIds
        .map((id) => map.get(id))
        .filter(Boolean) as RecipePreview[];
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  }

  if (favoriteTechniqueIds.length > 0) {
    try {
      const results = await client.fetch<TechniquePreview[]>(
        FAVORITE_TECHNIQUES_QUERY,
        { ids: favoriteTechniqueIds },
      );
      const map = new Map(results.map((technique) => [technique._id, technique]));
      favoriteTechniques = favoriteTechniqueIds
        .map((id) => map.get(id))
        .filter(Boolean) as TechniquePreview[];
    } catch (error) {
      console.error("Error fetching favorite techniques:", error);
    }
  }

  if (favoriteScienceIds.length > 0) {
    try {
      const results = await client.fetch<SciencePreview[]>(
        FAVORITE_SCIENCE_QUERY,
        { ids: favoriteScienceIds },
      );
      const map = new Map(results.map((article) => [article._id, article]));
      favoriteScience = favoriteScienceIds
        .map((id) => map.get(id))
        .filter(Boolean) as SciencePreview[];
    } catch (error) {
      console.error("Error fetching favorite science:", error);
    }
  }

  const hasPassword = Boolean(user.passwordHash);
  const canEdit = isRoleAtLeast(user.role, "EDITOR");
  const isAdmin = isRoleAtLeast(user.role, "ADMIN");

  return (
    <div className="container mx-auto px-4 py-12">
      <ProfileLinkToast />
      <div className="flex flex-wrap items-center gap-4">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "Profilo"}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full border-2 border-amber-200/50 object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-amber-200/50 bg-amber-50 text-xl font-semibold text-amber-800 shadow-sm">
            {(user.name ?? user.email ?? "U")[0]!.toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-medium">
            Area riservata
          </p>
          <h1 className="text-3xl font-serif font-bold text-amber-950">
            Profilo
          </h1>
          <p className="mt-1 text-sm text-amber-950/70">
            Gestisci le informazioni del tuo account.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5">
          <h2 className="text-xl font-serif font-bold text-amber-950">
            Dettagli account
          </h2>
          <div className="mt-6 space-y-4 text-sm text-amber-950/80">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-950/50">
                Nome
              </p>
              <p className="text-base font-medium text-amber-950">
                {user.name ?? "Non impostato"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-950/50">
                Email
              </p>
              <p className="text-base font-medium text-amber-950">
                {user.email ?? "Non impostata"}
              </p>
            </div>
            {canEdit && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-950/50">
                  Ruolo
                </p>
                <p className="text-base font-medium text-amber-950">
                  {user.role}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-950/50">
                Metodo di accesso
              </p>
              <p className="text-base font-medium text-amber-950">
                {hasPassword ? "Email e password" : "Solo provider esterni"}
              </p>
              {accountCount > 0 && (
                <p className="mt-1 text-xs text-amber-950/60">
                  Provider collegati: {accountCount}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-950/50">
                Preferiti
              </p>
              <p className="text-base font-medium text-amber-950">
                {totalFavorites}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5">
          <h2 className="text-xl font-serif font-bold text-amber-950">
            Azioni rapide
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <Button asChild variant="outline">
              <Link href="/auth/forgot-password">Cambia password</Link>
            </Button>
            {isGoogleEnabled && !isGoogleLinked && (
              <Button asChild variant="outline">
                <Link
                  href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent("/profilo?linked=google")}`}
                >
                  Collega Google
                </Link>
              </Button>
            )}
            {isGoogleEnabled && isGoogleLinked && (
              <Button variant="outline" disabled>
                Google collegato
              </Button>
            )}
            {isFacebookEnabled && !isFacebookLinked && (
              <Button asChild variant="outline">
                <Link
                  href={`/api/auth/signin/facebook?callbackUrl=${encodeURIComponent("/profilo?linked=facebook")}`}
                >
                  Collega Facebook
                </Link>
              </Button>
            )}
            {isFacebookEnabled && isFacebookLinked && (
              <Button variant="outline" disabled>
                Facebook collegato
              </Button>
            )}
            {isTikTokEnabled && !isTikTokLinked && (
              <Button asChild variant="outline">
                <Link
                  href={`/api/auth/signin/tiktok?callbackUrl=${encodeURIComponent("/profilo?linked=tiktok")}`}
                >
                  Collega TikTok
                </Link>
              </Button>
            )}
            {isTikTokEnabled && isTikTokLinked && (
              <Button variant="outline" disabled>
                TikTok collegato
              </Button>
            )}
            {canEdit && (
              <Button asChild variant="ghost">
                <Link href="/studio">Apri Studio</Link>
              </Button>
            )}
            {isAdmin && (
              <Button asChild variant="ghost">
                <Link href="/admin">Apri Admin</Link>
              </Button>
            )}
            <Button asChild variant="destructive">
              <Link href="/auth/signout">Esci</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-amber-950/60">
            Se cambi email o password, ricordati di aggiornare i tuoi provider.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-950">
              Ricette preferite
            </h2>
            <p className="mt-1 text-sm text-amber-950/70">
              {favoriteRecipes.length > 0
                ? `Hai ${favoriteRecipes.length} ricette salvate.`
                : "Non hai ancora ricette salvate."}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/ricette">Scopri ricette</Link>
          </Button>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-amber-200/60 bg-white/50 p-8 text-center text-sm text-amber-950/60">
            Salva le ricette che ami e le troverai qui.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favoriteRecipes.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-950">
              Tecniche preferite
            </h2>
            <p className="mt-1 text-sm text-amber-950/70">
              {favoriteTechniques.length > 0
                ? `Hai ${favoriteTechniques.length} tecniche salvate.`
                : "Non hai ancora tecniche salvate."}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/tecniche">Scopri tecniche</Link>
          </Button>
        </div>

        {favoriteTechniques.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-amber-200/60 bg-white/50 p-8 text-center text-sm text-amber-950/60">
            Salva le tecniche che ami e le troverai qui.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favoriteTechniques.map((technique, index) => (
              <TechniqueCard key={technique._id} technique={technique} index={index} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-950">
              Scienza preferita
            </h2>
            <p className="mt-1 text-sm text-amber-950/70">
              {favoriteScience.length > 0
                ? `Hai ${favoriteScience.length} articoli salvati.`
                : "Non hai ancora articoli scientifici salvati."}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/scienza">Scopri la scienza</Link>
          </Button>
        </div>

        {favoriteScience.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-amber-200/60 bg-white/50 p-8 text-center text-sm text-amber-950/60">
            Salva gli articoli scientifici che ami e li troverai qui.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favoriteScience.map((article, index) => (
              <ScienceCard key={article._id} science={article} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
