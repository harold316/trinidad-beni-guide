import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Publicar mi negocio",
  description: "Publica tu negocio en Trinidad Beni Guide y llega a más clientes.",
  path: "/publicar",
});

const steps = [
  "Crea tu cuenta de empresa",
  "Completa el perfil con fotos, horarios y ubicación",
  "Publica promociones y productos destacados",
  "Recibe consultas por WhatsApp y mejora tu calificación",
];

export default function PublicarPage() {
  return (
    <>
      <PageHero
        eyebrow="Negocios"
        title="Publicar mi negocio"
        description="Llega a residentes y turistas con un perfil profesional en el directorio de Trinidad."
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 md:px-6">
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-primary)] font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-2 font-medium text-[var(--color-ink)]">{step}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/registrarse">Crear cuenta empresa</ButtonLink>
          <ButtonLink href="/panel" variant="outline">
            Ir al panel
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
