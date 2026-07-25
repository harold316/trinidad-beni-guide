# Trinidad Beni Guide

Portal turístico y comercial de **Trinidad, Beni (Bolivia)**. Directorio moderno para restaurantes, turismo, salud, empresas, promociones, eventos y noticias.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- React Icons
- Firebase (Auth, Firestore, Storage)
- Google Maps (embed + API ready)
- PWA (manifest + service worker)
- next-themes (Dark Mode)
- Zustand (favoritos y comparador)
- Swiper (promociones)
- Sonner (toasts)

## Características

- Hero full-bleed con video y buscador
- Directorio por categorías con filtros
- Detalle de negocio (galería, horarios, mapa, WhatsApp, reseñas, Schema.org)
- Promociones con slider automático y cupones
- Eventos y noticias
- Publicidad administrable (header, sidebar, footer, entre tarjetas)
- Panel Admin (dashboard + CRUD UI)
- Panel Negocio (perfil, medios, promociones, productos, horarios)
- Auth (correo + Google) con roles: admin, empresa, cliente, visitante
- Favoritos, comparador, newsletter, contacto
- Botones flotantes WhatsApp / Messenger / Telegram
- SEO: metadata, Open Graph, robots, sitemap, JSON-LD
- Analytics listo (GA + Meta Pixel por env)
- Dark mode, lazy loading, skeletons, mobile first

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Sin Firebase configurado, la app corre en **modo demo** con datos mock.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- Firebase (API key, auth domain, project id, storage, app id)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (opcional para Maps JS avanzado)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_SITE_URL`
- WhatsApp / Messenger / Telegram

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

## Firebase

Colecciones sugeridas:

- `users`
- `businesses`
- `promotions`
- `events`
- `news`
- `ads`
- `contacts`
- `newsletter`
- `categories`

Storage:

- `businesses/{businessId}/logo|images|videos|menus/`

Reglas de ejemplo en `firestore.rules` y hosting en `firebase.json`.

## Deploy

### Vercel (recomendado)

```bash
npm run build
# Conectar repo en vercel.com y definir env vars
```

### Firebase Hosting

```bash
npm run build
firebase deploy
```

> Para App Router en Firebase Hosting suele usarse SSR con Cloud Functions o export estático según tu estrategia. Vercel es el path más directo.

### GitHub Pages

El proyecto está configurado con `output: "export"` y un workflow en `.github/workflows/deploy-github-pages.yml`.

1. Sube el repo a GitHub (rama `main`)
2. En el repo: **Settings → Pages → Source: GitHub Actions**
3. Cada push a `main` publica el sitio en:
   `https://TU_USUARIO.github.io/trinidad-beni-guide/`

Para desarrollo local no uses `NEXT_PUBLIC_BASE_PATH`. En CI se define automáticamente.

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build producción
- `npm run start` — servir build
- `npm run lint` — ESLint

## Roles

| Rol | Acceso |
|---|---|
| Visitante | Navegar y buscar |
| Cliente | Favoritos, reseñas, cuenta |
| Empresa | Panel de negocio |
| Admin | Dashboard y CRUD global |

## Diseño

Paleta: verde `#4CAF50`, blanco, gris claro, azul suave `#64B5F6`, amarillo promociones `#F9A825`.

Tipografías: **Fraunces** (display) + **Manrope** (body).

## Licencia

Proyecto privado / uso del cliente. Ajusta según tu acuerdo comercial.
