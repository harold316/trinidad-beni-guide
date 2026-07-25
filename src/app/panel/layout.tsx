import Link from "next/link";

const links = [
  { href: "/panel", label: "Resumen" },
  { href: "/panel/perfil", label: "Perfil del negocio" },
  { href: "/panel/medios", label: "Fotos y videos" },
  { href: "/panel/promociones", label: "Promociones" },
  { href: "/panel/productos", label: "Menú / Productos" },
  { href: "/panel/horarios", label: "Horarios" },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-7xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr] md:px-6">
      <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Panel Negocio
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
