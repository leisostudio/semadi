import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a date string to Brazilian Portuguese locale */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
): string {
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

/** Truncate text to a given word count */
export function truncateWords(text: string, wordCount: number): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + '…'
}

/** Strip HTML tags (for rich-text excerpts) */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/** Generate a slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Unsplash placeholder URL builder */
export function unsplashUrl(
  query: string,
  width = 800,
  height = 600
): string {
  return `https://images.unsplash.com/photo-1593113598332-cd288d649433?w=${width}&h=${height}&auto=format&fit=crop&q=60&${query}`
}
