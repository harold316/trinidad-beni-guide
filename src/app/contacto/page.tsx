import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MapEmbed } from "@/components/maps/MapEmbed";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contacto",
  description: "Contacta con Trinidad Beni Guide para consultas, alianzas o soporte.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Hablemos"
        title="Contacto"
        description="¿Quieres publicar tu negocio, anunciar o colaborar? Escríbenos."
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
        <ContactForm />
        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Trinidad, Beni
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Capital del departamento del Beni, Bolivia.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              <li>Email: hola@trinidadbeniguide.com</li>
              <li>WhatsApp: +591 73906744</li>
              <li>Horario: Lun–Vie 09:00–18:00</li>
            </ul>
          </div>
          <MapEmbed className="h-72 w-full rounded-2xl border border-[var(--color-border)]" />
        </div>
      </div>
    </>
  );
}
