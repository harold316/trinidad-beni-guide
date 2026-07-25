import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { mockBusinesses, mockEvents, mockNews } from "@/data/mock";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/restaurantes",
    "/turismo",
    "/salud",
    "/empresas",
    "/promociones",
    "/eventos",
    "/noticias",
    "/contacto",
    "/publicar",
    "/buscar",
    "/comparar",
    "/favoritos",
    "/iniciar-sesion",
    "/registrarse",
    "/politicas",
    "/terminos",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const businesses = mockBusinesses.map((b) => ({
    url: `${SITE_URL}/negocios/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const events = mockEvents.map((e) => ({
    url: `${SITE_URL}/eventos/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const news = mockNews.map((n) => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...businesses, ...events, ...news];
}
