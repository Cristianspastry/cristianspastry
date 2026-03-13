import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";

import { db } from "@/server/db";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(64),
});

export async function POST(request: Request) {
  try {
    const check = ensurePrismaClientHasFields(["passwordHash"]);
    if (!check.ok) {
      return NextResponse.json(
        { error: check.message ?? "Prisma Client out of date", missing: check.missing },
        { status: 500 },
      );
    }

    const body = await request.json();
    const data = RegisterSchema.parse(body);

    const existing = await db.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email gia registrata" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(data.password, 10);
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dati non validi", issues: error.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}
