import { mockAds, mockBusinesses, mockEvents, mockNews, mockPromotions } from "@/data/mock";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin Dashboard",
  path: "/admin",
});

const stats = [
  { label: "Negocios", value: mockBusinesses.length },
  { label: "Promociones", value: mockPromotions.length },
  { label: "Eventos", value: mockEvents.length },
  { label: "Noticias", value: mockNews.length },
  { label: "Banners", value: mockAds.length },
  { label: "Calificación media", value: (mockBusinesses.reduce((a, b) => a + b.rating, 0) / mockBusinesses.length).toFixed(1) },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-[var(--color-muted)]">
          Estadísticas generales del portal. Con Firebase conectado, estos datos serán en tiempo real.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <p className="text-sm text-[var(--color-muted)]">{stat.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          Acciones rápidas
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
          <li>CRUD completo preparado en `/admin/*`</li>
          <li>Colecciones Firestore: businesses, events, news, promotions, ads, users, categories</li>
          <li>Roles: admin, empresa, cliente, visitante</li>
        </ul>
      </div>
    </div>
  );
}
