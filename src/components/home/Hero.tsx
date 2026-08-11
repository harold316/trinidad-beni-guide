"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";

const HERO_IMAGE =
  "https://i.ibb.co/LXR00gy2/catedral.jpg";

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/buscar?q=${encodeURIComponent(term)}` : "/buscar");
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Catedral de Trinidad, Beni"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,28,18,0.55)_0%,rgba(8,28,18,0.35)_40%,rgba(8,28,18,0.75)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(76,175,80,0.25),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-28 md:px-6">
        <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.28em] text-green-200 md:text-base">
          {SITE_NAME}
        </p>

        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {SITE_TAGLINE}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          El directorio moderno de restaurantes, turismo, salud y negocios locales
          de Trinidad.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#explorar" size="lg">
            Explorar
          </ButtonLink>
          <ButtonLink
            href="/publicar"
            variant="outline"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            Publicar mi negocio
          </ButtonLink>
        </div>

        <form onSubmit={onSearch} className="mt-10 w-full max-w-3xl">
          <label className="sr-only" htmlFor="hero-search">
            Buscar en Trinidad
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/15 p-2 shadow-2xl backdrop-blur-xl">
            <FaSearch className="ml-3 text-white/80" />
            <input
              id="hero-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca restaurantes, clínicas, hoteles, tours..."
              className="h-12 w-full bg-transparent text-white outline-none placeholder:text-white/65"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-[var(--color-primary)] px-5 font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
