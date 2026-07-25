import { ButtonLink } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Panel de negocio",
  path: "/panel",
});

export default function PanelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
          Panel del negocio
        </h1>
        <p className="mt-1 text-[var(--color-muted)]">
          Administra tu perfil, medios, promociones y horarios.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Vistas del perfil", "1.2k"],
          ["Clics WhatsApp", "186"],
          ["Favoritos", "64"],
          ["Promociones activas", "2"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <p className="text-sm text-[var(--color-muted)]">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-primary)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/panel/perfil">Editar perfil</ButtonLink>
        <ButtonLink href="/panel/medios" variant="outline">
          Subir fotos
        </ButtonLink>
        <ButtonLink href="/panel/promociones" variant="promo">
          Nueva promoción
        </ButtonLink>
      </div>
    </div>
  );
}
