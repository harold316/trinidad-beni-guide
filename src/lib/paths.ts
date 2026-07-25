const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefijo de rutas para GitHub Pages (project site). */
export function withBasePath(path: string): string {
  if (!basePath) return path;
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (basePath) {
    // Se completa en CI con el usuario real; fallback genérico
    return `https://localhost${basePath}`;
  }
  return "https://trinidadbeniguide.com";
}
