import {
  mockAds,
  mockBusinesses,
  mockEvents,
  mockNews,
  mockPromotions,
} from "@/data/mock";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import * as firestore from "@/lib/firebase/firestore";
import type { Business, BusinessCategory } from "@/types";
import {
  BUSINESS_CATEGORIES,
  FOOD_CATEGORIES,
  HEALTH_CATEGORIES,
  TOURISM_CATEGORIES,
} from "@/lib/constants";

export async function fetchBusinesses(category?: BusinessCategory) {
  try {
    if (isFirebaseConfigured) {
      return await firestore.getBusinesses(category);
    }
  } catch {
    // fallback to mock
  }
  if (!category) return mockBusinesses;
  return mockBusinesses.filter((b) => b.category === category);
}

export async function fetchBusinessBySlug(slug: string) {
  try {
    if (isFirebaseConfigured) {
      return await firestore.getBusinessBySlug(slug);
    }
  } catch {
    // fallback
  }
  return mockBusinesses.find((b) => b.slug === slug) || null;
}

export async function fetchFeaturedBusinesses(limit = 8) {
  const all = await fetchBusinesses();
  return all.filter((b) => b.featured).slice(0, limit);
}

export async function fetchByCategories(categories: BusinessCategory[]) {
  const all = await fetchBusinesses();
  return all.filter((b) => categories.includes(b.category));
}

export async function fetchRestaurants() {
  return fetchByCategories(FOOD_CATEGORIES);
}

export async function fetchHealth() {
  return fetchByCategories(HEALTH_CATEGORIES);
}

export async function fetchTourism() {
  return fetchByCategories(TOURISM_CATEGORIES);
}

export async function fetchCompanies() {
  return fetchByCategories(BUSINESS_CATEGORIES);
}

export async function fetchPromotions() {
  try {
    if (isFirebaseConfigured) return await firestore.getPromotions();
  } catch {
    // fallback
  }
  return mockPromotions.filter((p) => p.active);
}

export async function fetchEvents() {
  try {
    if (isFirebaseConfigured) return await firestore.getEvents();
  } catch {
    // fallback
  }
  return mockEvents;
}

export async function fetchNews() {
  try {
    if (isFirebaseConfigured) return await firestore.getNews();
  } catch {
    // fallback
  }
  return mockNews;
}

export async function fetchAds(placement?: string) {
  try {
    if (isFirebaseConfigured) {
      const ads = await firestore.getAds();
      return placement
        ? ads.filter((a) => a.active && a.placement === placement)
        : ads.filter((a) => a.active);
    }
  } catch {
    // fallback
  }
  return placement
    ? mockAds.filter((a) => a.active && a.placement === placement)
    : mockAds.filter((a) => a.active);
}

export function searchBusinesses(
  businesses: Business[],
  term: string,
  filters?: {
    category?: string;
    minRating?: number;
    priceLevel?: string;
  }
) {
  const q = term.trim().toLowerCase();
  return businesses.filter((b) => {
    const matchesTerm =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.tags?.some((t) => t.toLowerCase().includes(q)) ||
      b.subcategory?.toLowerCase().includes(q);

    const matchesCategory = !filters?.category || b.category === filters.category;
    const matchesRating = !filters?.minRating || b.rating >= filters.minRating;
    const matchesPrice =
      !filters?.priceLevel || b.priceLevel === filters.priceLevel;

    return matchesTerm && matchesCategory && matchesRating && matchesPrice;
  });
}
