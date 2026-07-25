"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut, isAdmin, isEmpresa } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl shadow-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary)] font-[family-name:var(--font-display)] text-lg font-bold text-white shadow-md shadow-green-500/30 transition group-hover:scale-105">
            TB
          </span>
          <div className="leading-tight">
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)] md:text-lg">
              {SITE_NAME}
            </p>
            <p className="hidden text-xs text-[var(--color-muted)] sm:block">
              Capital del Beni
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition hover:bg-black/5 hover:text-[var(--color-ink)] dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                {isAdmin ? (
                  <ButtonLink href="/admin" variant="outline" size="sm">
                    Admin
                  </ButtonLink>
                ) : null}
                {isEmpresa ? (
                  <ButtonLink href="/panel" variant="outline" size="sm">
                    Mi negocio
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/favoritos" variant="ghost" size="sm">
                  Hola, {profile?.displayName?.split(" ")[0] || "Usuario"}
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <ButtonLink href="/iniciar-sesion" variant="ghost" size="sm">
                  Iniciar sesión
                </ButtonLink>
                <ButtonLink href="/registrarse" size="sm">
                  Registrarse
                </ButtonLink>
              </>
            )}
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Móvil">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <ButtonLink href="/iniciar-sesion" variant="outline" onClick={() => setOpen(false)}>
                  Iniciar sesión
                </ButtonLink>
                <ButtonLink href="/registrarse" onClick={() => setOpen(false)}>
                  Registrarse
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
