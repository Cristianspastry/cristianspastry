import crypto from "crypto";

import { db } from "@/server/db";

const REQUEST_THROTTLE_MS = 60_000;

export async function createPasswordResetToken(email: string) {
  const user = await db.user.findUnique({ where: { email } });

  // Always return a generic response to avoid user enumeration.
  if (!user) {
    return { ok: true };
  }

  const now = Date.now();
  const last = await db.passwordResetToken.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (last && now - last.createdAt.getTime() < REQUEST_THROTTLE_MS) {
    return { ok: true };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  return { ok: true, rawToken };
}

export async function validatePasswordResetToken(token: string) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const record = await db.passwordResetToken.findFirst({
    where: {
      tokenHash,
      expiresAt: { gt: new Date() },
      usedAt: null,
    },
  });

  if (!record) return null;
  return record;
}

export async function markPasswordResetTokenUsed(id: string) {
  await db.passwordResetToken.update({
    where: { id },
    data: { usedAt: new Date() },
  });
}
