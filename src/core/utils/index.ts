/**
 * Utility Functions - Funzioni utility condivise
 * 
 * Funzioni pure e helper utilizzati in tutto il progetto.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Unisce classi Tailwind CSS in modo intelligente
 * @param inputs - Classi da unire
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatta una data in formato leggibile
 * @param dateString - Stringa data ISO
 * @param locale - Locale per la formattazione (default: 'it-IT')
 */
export function formatDate(dateString: string, locale: string = 'it-IT'): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formatta un numero di minuti in formato leggibile (es. "1h 30m")
 * @param minutes - Minuti totali
 */
export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return '0 min';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  
  return parts.join(' ') || '0 min';
}

/**
 * Tronca un testo a una lunghezza massima aggiungendo ellissi
 * @param text - Testo da troncare
 * @param maxLength - Lunghezza massima
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Genera uno slug da un titolo
 * @param title - Titolo da convertire
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Calcola il tempo totale di una ricetta (prep + cook + rest)
 */
export function calculateTotalTime(prepTime: number, cookTime: number, restTime?: number): number {
  return prepTime + cookTime + (restTime || 0);
}

/**
 * Estrae il dominio da un URL
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Verifica se un valore è definito e non nullo
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/**
 * Debounce per funzioni async
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
