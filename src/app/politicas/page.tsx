import { PageHero } from "@/components/layout/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Políticas de privacidad",
  path: "/politicas",
});

export default function PoliticasPage() {
  return (
    <>
      <PageHero title="Políticas de privacidad" description="Cómo protegemos tus datos en Trinidad Beni Guide." />
      <div className="prose prose-stone mx-auto max-w-3xl px-4 py-10 dark:prose-invert md:px-6">
        <p>
          Recopilamos información necesaria para operar el directorio, autenticar usuarios,
          publicar negocios y mejorar la experiencia. No vendemos datos personales.
        </p>
        <p>
          Usamos Firebase Authentication, Firestore y Storage para gestionar cuentas, contenido
          y archivos. También podemos usar Google Analytics y Meta Pixel con fines de medición.
        </p>
        <p>
          Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a
          hola@trinidadbeniguide.com.
        </p>
      </div>
    </>
  );
}
