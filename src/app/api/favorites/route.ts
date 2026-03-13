import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

const FavoriteTypeSchema = z.enum(["recipe", "technique", "science"]);
type FavoriteType = z.infer<typeof FavoriteTypeSchema>;

const FavoriteSchema = z.object({
  id: z.string().min(1),
  type: FavoriteTypeSchema,
});

const LegacyFavoriteSchema = z.object({
  recipeId: z.string().min(1),
});

const MODEL_BY_TYPE: Record<FavoriteType, string> = {
  recipe: "FavoriteRecipe",
  technique: "FavoriteTechnique",
  science: "FavoriteScience",
};

function parseTypeParam(typeParam: string | null): FavoriteType | null {
  if (!typeParam) return null;
  const parsed = FavoriteTypeSchema.safeParse(typeParam);
  if (!parsed.success) {
    throw new Error("invalid-type");
  }
  return parsed.data;
}

function parseBody(body: unknown): { id: string; type: FavoriteType } {
  const legacy = LegacyFavoriteSchema.safeParse(body);
  if (legacy.success) {
    return { id: legacy.data.recipeId, type: "recipe" };
  }
  return FavoriteSchema.parse(body);
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const legacyRecipeId = request.nextUrl.searchParams.get("recipeId");
  const idParam = request.nextUrl.searchParams.get("id");
  let typeParam: FavoriteType | null = null;

  try {
    typeParam = parseTypeParam(request.nextUrl.searchParams.get("type"));
  } catch {
    return NextResponse.json({ error: "Tipo non valido" }, { status: 400 });
  }

  const id = legacyRecipeId ?? idParam ?? null;
  if (id && !typeParam && !legacyRecipeId) {
    return NextResponse.json({ error: "Tipo mancante" }, { status: 400 });
  }

  const type: FavoriteType = legacyRecipeId ? "recipe" : (typeParam ?? "recipe");

  const check = ensurePrismaClientHasFields([MODEL_BY_TYPE[type]]);
  if (!check.ok) {
    return NextResponse.json(
      { error: check.message ?? "Prisma Client out of date", missing: check.missing },
      { status: 500 },
    );
  }

  if (id) {
    if (type === "recipe") {
      const favorite = await db.favoriteRecipe.findUnique({
        where: {
          userId_recipeId: {
            userId: session.user.id,
            recipeId: id,
          },
        },
        select: { id: true },
      });
      return NextResponse.json({ isFavorite: Boolean(favorite) });
    }

    if (type === "technique") {
      const favorite = await db.favoriteTechnique.findUnique({
        where: {
          userId_techniqueId: {
            userId: session.user.id,
            techniqueId: id,
          },
        },
        select: { id: true },
      });
      return NextResponse.json({ isFavorite: Boolean(favorite) });
    }

    const favorite = await db.favoriteScience.findUnique({
      where: {
        userId_scienceId: {
          userId: session.user.id,
          scienceId: id,
        },
      },
      select: { id: true },
    });
    return NextResponse.json({ isFavorite: Boolean(favorite) });
  }

  if (type === "recipe") {
    const favorites = await db.favoriteRecipe.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: { recipeId: true, createdAt: true },
    });
    return NextResponse.json({ favorites });
  }

  if (type === "technique") {
    const favorites = await db.favoriteTechnique.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: { techniqueId: true, createdAt: true },
    });
    return NextResponse.json({ favorites });
  }

  const favorites = await db.favoriteScience.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { scienceId: true, createdAt: true },
  });
  return NextResponse.json({ favorites });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = parseBody(body);
    const check = ensurePrismaClientHasFields([MODEL_BY_TYPE[data.type]]);
    if (!check.ok) {
      return NextResponse.json(
        { error: check.message ?? "Prisma Client out of date", missing: check.missing },
        { status: 500 },
      );
    }

    if (data.type === "recipe") {
      await db.favoriteRecipe.upsert({
        where: {
          userId_recipeId: {
            userId: session.user.id,
            recipeId: data.id,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          recipeId: data.id,
        },
      });
    } else if (data.type === "technique") {
      await db.favoriteTechnique.upsert({
        where: {
          userId_techniqueId: {
            userId: session.user.id,
            techniqueId: data.id,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          techniqueId: data.id,
        },
      });
    } else {
      await db.favoriteScience.upsert({
        where: {
          userId_scienceId: {
            userId: session.user.id,
            scienceId: data.id,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          scienceId: data.id,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
    }
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const legacyRecipeId = request.nextUrl.searchParams.get("recipeId");
  const idParam = request.nextUrl.searchParams.get("id");
  let typeParam: FavoriteType | null = null;
  let data: { id: string; type: FavoriteType } | null = null;

  if (legacyRecipeId) {
    data = { id: legacyRecipeId, type: "recipe" };
  } else if (idParam) {
    try {
      typeParam = parseTypeParam(request.nextUrl.searchParams.get("type"));
    } catch {
      return NextResponse.json({ error: "Tipo non valido" }, { status: 400 });
    }
    if (!typeParam) {
      return NextResponse.json({ error: "Tipo mancante" }, { status: 400 });
    }
    data = { id: idParam, type: typeParam };
  }

  if (!data) {
    try {
      const body = await request.json();
      data = parseBody(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
      }
      return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
    }
  }

  const check = ensurePrismaClientHasFields([MODEL_BY_TYPE[data.type]]);
  if (!check.ok) {
    return NextResponse.json(
      { error: check.message ?? "Prisma Client out of date", missing: check.missing },
      { status: 500 },
    );
  }

  if (data.type === "recipe") {
    await db.favoriteRecipe.deleteMany({
      where: {
        userId: session.user.id,
        recipeId: data.id,
      },
    });
  } else if (data.type === "technique") {
    await db.favoriteTechnique.deleteMany({
      where: {
        userId: session.user.id,
        techniqueId: data.id,
      },
    });
  } else {
    await db.favoriteScience.deleteMany({
      where: {
        userId: session.user.id,
        scienceId: data.id,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
