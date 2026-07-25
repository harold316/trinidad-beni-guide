"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";

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
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-flying-over-the-amazon-rainforest-5635/1080p.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,28,18,0.55)_0%,rgba(8,28,18,0.35)_40%,rgba(8,28,18,0.75)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(76,175,80,0.25),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-28 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.28em] text-green-200 md:text-base"
        >
          {SITE_NAME}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {SITE_TAGLINE}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          El directorio moderno de restaurantes, turismo, salud y negocios locales
          de Trinidad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <ButtonLink href="#explorar" size="lg">
            Explorar
          </ButtonLink>
          <ButtonLink href="/publicar" variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
            Publicar mi negocio
          </ButtonLink>
        </motion.div>

        <motion.form
          onSubmit={onSearch}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 w-full max-w-3xl"
        >
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
        </motion.form>
      </div>
    </section>
  );
}
