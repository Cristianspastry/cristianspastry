"use client";
import { useRouter } from "next/navigation";



export  function useGoBack() {
    const router =  useRouter();
    return () => router.back();
}

export function formatDate(date: Date | { seconds: number } | string): string | null {
    if (date instanceof Date) {
      return date.toISOString()
    } else if (typeof date === 'object' && date.seconds) {
      return new Date(date.seconds * 1000).toISOString()
    } else if (typeof date === 'string') {
      return new Date(date).toISOString()
    }
    return null
  }