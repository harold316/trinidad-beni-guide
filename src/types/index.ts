export type UserRole = "admin" | "empresa" | "cliente" | "visitante";

export type BusinessCategory =
  | "restaurantes"
  | "hoteles"
  | "clinicas"
  | "hospitales"
  | "farmacias"
  | "consultorios"
  | "laboratorios"
  | "cafeterias"
  | "heladerias"
  | "pizzerias"
  | "comida-rapida"
  | "tiendas"
  | "supermercados"
  | "centros-comerciales"
  | "universidades"
  | "institutos"
  | "gimnasios"
  | "iglesias"
  | "turismo"
  | "lugares-historicos"
  | "museos"
  | "balnearios"
  | "parques"
  | "bancos"
  | "cajeros"
  | "veterinarias"
  | "talleres"
  | "servicios-profesionales"
  | "empresas"
  | "negocios-locales";

export type PriceLevel = "$" | "$$" | "$$$" | "$$$$";

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful?: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  featured?: boolean;
}

export interface Promotion {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string;
  discount?: string;
  couponCode?: string;
  image: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: BusinessCategory;
  subcategory?: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  email?: string;
  social?: SocialLinks;
  hours: BusinessHours[];
  images: string[];
  logo?: string;
  video?: string;
  location: GeoLocation;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  priceLevel?: PriceLevel;
  promotions?: string[];
  products?: Product[];
  specialties?: string[];
  doctors?: string[];
  emergency?: boolean;
  tags?: string[];
  featured?: boolean;
  verified?: boolean;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  location: string;
  startDate: string;
  endDate?: string;
  category: string;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
}

export interface AdBanner {
  id: string;
  title: string;
  image: string;
  link: string;
  placement: "header" | "sidebar" | "footer" | "inline" | "between-cards";
  active: boolean;
  priority: number;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  businessIds?: string[];
  favorites?: string[];
  createdAt: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface NewsletterSubscriber {
  email: string;
  createdAt: string;
}
