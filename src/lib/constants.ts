import type { BusinessCategory } from "@/types";

export const SITE_NAME = "Trinidad Beni Guide";
export const SITE_TAGLINE = "Descubre Trinidad - Capital del Beni";
export const SITE_DESCRIPTION =
  "Portal turístico y comercial de Trinidad, Beni (Bolivia). Descubre restaurantes, hoteles, salud, turismo, empresas y promociones locales.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://trinidadbeniguide.com";

export const TRINIDAD_COORDS = {
  lat: -14.8333,
  lng: -64.9,
};

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/restaurantes", label: "Restaurantes" },
  { href: "/turismo", label: "Turismo" },
  { href: "/salud", label: "Salud" },
  { href: "/empresas", label: "Empresas" },
  { href: "/promociones", label: "Promociones" },
  { href: "/eventos", label: "Eventos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  restaurantes: "Restaurantes",
  hoteles: "Hoteles",
  clinicas: "Clínicas",
  hospitales: "Hospitales",
  farmacias: "Farmacias",
  consultorios: "Consultorios Médicos",
  laboratorios: "Laboratorios",
  cafeterias: "Cafeterías",
  heladerias: "Heladerías",
  pizzerias: "Pizzerías",
  "comida-rapida": "Comida Rápida",
  tiendas: "Tiendas",
  supermercados: "Supermercados",
  "centros-comerciales": "Centros Comerciales",
  universidades: "Universidades",
  institutos: "Institutos",
  gimnasios: "Gimnasios",
  iglesias: "Iglesias",
  turismo: "Turismo",
  "lugares-historicos": "Lugares Históricos",
  museos: "Museos",
  balnearios: "Balnearios",
  parques: "Parques",
  bancos: "Bancos",
  cajeros: "Cajeros",
  veterinarias: "Veterinarias",
  talleres: "Talleres",
  "servicios-profesionales": "Servicios Profesionales",
  empresas: "Empresas",
  "negocios-locales": "Negocios Locales",
};

export const FOOD_CATEGORIES: BusinessCategory[] = [
  "restaurantes",
  "cafeterias",
  "heladerias",
  "pizzerias",
  "comida-rapida",
];

export const HEALTH_CATEGORIES: BusinessCategory[] = [
  "clinicas",
  "hospitales",
  "farmacias",
  "consultorios",
  "laboratorios",
];

export const TOURISM_CATEGORIES: BusinessCategory[] = [
  "hoteles",
  "turismo",
  "balnearios",
  "parques",
  "museos",
  "lugares-historicos",
];

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  "empresas",
  "tiendas",
  "supermercados",
  "centros-comerciales",
  "bancos",
  "cajeros",
  "gimnasios",
  "universidades",
  "institutos",
  "veterinarias",
  "talleres",
  "servicios-profesionales",
  "negocios-locales",
  "iglesias",
];

export const DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
