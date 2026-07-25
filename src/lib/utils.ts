import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function whatsappLink(phone: string, message?: string): string {
  const clean = formatPhone(phone);
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${clean}${text}`;
}

export function shareUrl(url: string, title: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    return navigator.share({ title, url });
  }
  return navigator.clipboard.writeText(url);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}
