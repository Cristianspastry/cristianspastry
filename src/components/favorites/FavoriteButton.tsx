"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

type FavoriteButtonProps = {
  itemId: string;
  itemType?: "recipe" | "technique" | "science";
  showLabel?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  activeVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  stopPropagation?: boolean;
};

export default function FavoriteButton({
  itemId,
  itemType = "recipe",
  showLabel = false,
  size = "sm",
  variant = "outline",
  activeVariant = "default",
  className,
  stopPropagation = false,
}: FavoriteButtonProps) {
  const { status } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      setIsFavorite(false);
      return;
    }

    let active = true;
    const loadFavorite = async () => {
      try {
        const response = await fetch(
          `/api/favorites?type=${encodeURIComponent(itemType)}&id=${encodeURIComponent(itemId)}`,
        );
        if (!response.ok) return;
        const data = await response.json();
        if (!active) return;
        setIsFavorite(Boolean(data?.isFavorite));
      } catch {
        if (!active) return;
        setIsFavorite(false);
      }
    };

    loadFavorite();
    return () => {
      active = false;
    };
  }, [itemId, itemType, status]);

  const handleToggle = async (event?: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation && event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (status !== "authenticated") {
      await signIn(undefined, {
        callbackUrl: typeof window !== "undefined" ? window.location.href : "/",
      });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const nextIsFavorite = !isFavorite;
    try {
      const response = await fetch(
        `/api/favorites?type=${encodeURIComponent(itemType)}&id=${encodeURIComponent(itemId)}`,
        {
          method: nextIsFavorite ? "POST" : "DELETE",
          headers: { "Content-Type": "application/json" },
          body: nextIsFavorite ? JSON.stringify({ id: itemId, type: itemType }) : undefined,
        },
      );

      if (response.ok) {
        setIsFavorite(nextIsFavorite);
        if (nextIsFavorite) {
          toast.success("Aggiunto ai preferiti");
        } else {
          toast.message("Rimosso dai preferiti");
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const resolvedVariant =
    isFavorite === true ? activeVariant : variant;

  return (
    <Button
      onClick={handleToggle}
      variant={resolvedVariant}
      size={size}
      className={className}
      disabled={isSaving}
      aria-pressed={Boolean(isFavorite)}
      type="button"
    >
      {isFavorite ? (
        <Heart className="h-4 w-4 fill-red-600 text-red-600" />
      ) : (
        <Heart className="h-4 w-4 text-gray-500" />
      )}
      {showLabel && (
        <span>{isSaving ? "Aggiorno..." : isFavorite ? "Salvata" : "Salva"}</span>
      )}
    </Button>
  );
}
