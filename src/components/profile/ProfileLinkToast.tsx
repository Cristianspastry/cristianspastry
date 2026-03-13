"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ProfileLinkToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const linked = searchParams?.get("linked");
    if (!linked) return;

    if (linked === "google") {
      toast.success("Google collegato");
    } else if (linked === "facebook") {
      toast.success("Facebook collegato");
    } else if (linked === "tiktok") {
      toast.success("TikTok collegato");
    } else {
      toast.success("Account collegato");
    }

    const nextParams = new URLSearchParams(searchParams?.toString());
    nextParams.delete("linked");
    const nextQuery = nextParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
