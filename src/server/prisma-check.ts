import { readFileSync } from "fs";
import { join } from "path";

type PrismaCheckResult = {
  ok: boolean;
  missing: string[];
  message?: string;
};

let cached: PrismaCheckResult | null = null;

export function ensurePrismaClientHasFields(requiredFields: string[]): PrismaCheckResult {
  if (process.env.NODE_ENV === "production") {
    return { ok: true, missing: [] };
  }

  if (cached) return cached;

  try {
    const schemaPath = join(
      process.cwd(),
      "node_modules",
      ".prisma",
      "client",
      "schema.prisma",
    );
    const schema = readFileSync(schemaPath, "utf8");

    const missing = requiredFields.filter((field) => !schema.includes(field));
    if (missing.length > 0) {
      cached = {
        ok: false,
        missing,
        message:
          "Prisma Client out of date. Run `npm run db:generate` and restart dev server.",
      };
      console.error(
        "[dev-check] Prisma Client schema missing fields:",
        missing.join(", "),
      );
      return cached;
    }
  } catch (error) {
    console.warn("[dev-check] Prisma Client schema check skipped:", error);
  }

  cached = { ok: true, missing: [] };
  return cached;
}
