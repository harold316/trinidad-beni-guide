# Trinidad Beni Guide

Portal turístico y comercial de **Trinidad, Beni (Bolivia)**.  
Directorio moderno para restaurantes, turismo, salud, empresas, promociones, eventos y noticias.

**Autor:** Harold · **Empresa:** [Sofy Tech](https://github.com/harold316) · **Ubicación:** Trinidad, Beni, Bolivia  

[Demo en vivo](https://harold316.github.io/trinidad-beni-guide/) · [Issues](https://github.com/harold316/trinidad-beni-guide/issues)

---

## Stack

| Área | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| UI | Tailwind CSS 4 · Framer Motion · React Icons · Swiper |
| Estado | Zustand (favoritos y comparador) |
| Backend | Firebase Auth · Firestore · Storage |
| Extra | PWA · Dark mode · Google Maps · SEO (JSON-LD, sitemap, OG) |

---

## Características

- Hero full-bleed con video y buscador
- Directorio por categorías con filtros
- Detalle de negocio (galería, horarios, mapa, WhatsApp, reseñas, Schema.org)
- Promociones con slider automático y cupones
- Eventos y noticias
- Publicidad administrable (header, sidebar, footer, entre tarjetas)
- Panel Admin (dashboard + CRUD)
- Panel Negocio (perfil, medios, promociones, productos, horarios)
- Auth (correo + Google) con roles: `admin` · `empresa` · `cliente` · `visitante`
- Favoritos, comparador, newsletter y contacto
- Botones flotantes WhatsApp / Messenger / Telegram
- SEO: metadata, Open Graph, robots, sitemap, JSON-LD
- Analytics listo (GA + Meta Pixel por env)
- Dark mode, lazy loading, skeletons, mobile first

---

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Sin Firebase configurado, la app corre en **modo demo** con datos mock.

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- Firebase (API key, auth domain, project id, storage, app id)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (opcional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_SITE_URL`
- WhatsApp / Messenger / Telegram

---

## Estructura

```text
src/
  app/                 # Rutas (App Router)
  components/          # UI, layout, business, admin, panel, marketing
  contexts/            # Auth
  data/                # Mock data demo
  lib/
    firebase/          # Auth, Firestore, Storage
    services/          # Capa de datos (Firebase + fallback mock)
    seo.ts
    constants.ts
  stores/              # Favoritos y comparador
  types/               # TypeScript models
public/
  icons/               # PWA icons
  manifest.webmanifest
  sw.js
```

---

## Roles

| Rol | Acceso |
|-----|--------|
| Visitante | Navegar y buscar |
| Cliente | Favoritos, reseñas, cuenta |
| Empresa | Panel de negocio |
| Admin | Dashboard y CRUD global |

---

## Deploy

### Vercel (recomendado)

```bash
npm run build
```

Conecta el repo en [vercel.com](https://vercel.com) y define las variables de entorno.

### GitHub Pages

Configurado con `output: "export"` y workflow en `.github/workflows/deploy-github-pages.yml`.

1. Rama `main` en GitHub  
2. **Settings → Pages → Source: GitHub Actions**  
3. Demo: `https://harold316.github.io/trinidad-beni-guide/`

### Firebase Hosting

```bash
npm run build
firebase deploy
```

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo |
| `npm run build` | Build producción |
| `npm run start` | Servir build |
| `npm run lint` | ESLint |

---

## Diseño

- **Paleta:** verde `#4CAF50`, blanco, gris claro, azul `#64B5F6`, amarillo `#F9A825`
- **Tipografías:** Fraunces (display) + Manrope (body)

---

## Sofy Tech

Producto desarrollado en **Trinidad, Beni (Bolivia)** como parte del portafolio de Sofy Tech: soluciones digitales para negocios locales (turismo, salud y comercio).

---

## Licencia

Uso privado / comercial según acuerdo con Sofy Tech.  
© Sofy Tech — Trinidad, Beni, Bolivia
