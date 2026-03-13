import { type UserRole } from "@prisma/client";

export const DEFAULT_ROLE: UserRole = "USER";

const ROLE_RANK: Record<UserRole, number> = {
  ADMIN: 3,
  EDITOR: 2,
  USER: 1,
};

export function isRoleAtLeast(
  userRole: UserRole | null | undefined,
  required: UserRole,
) {
  if (!userRole) return false;
  return ROLE_RANK[userRole] >= ROLE_RANK[required];
}
