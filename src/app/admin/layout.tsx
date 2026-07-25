import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/negocios", label: "Negocios" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/promociones", label: "Promociones" },
  { href: "/admin/publicidad", label: "Publicidad" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/categorias", label: "Categorías" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-7xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr] md:px-6">
      <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Panel Admin
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
