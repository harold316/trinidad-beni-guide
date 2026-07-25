import { PageHero } from "@/components/layout/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Términos y condiciones",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <>
      <PageHero title="Términos y condiciones" description="Condiciones de uso del portal." />
      <div className="prose prose-stone mx-auto max-w-3xl px-4 py-10 dark:prose-invert md:px-6">
        <p>
          Al usar Trinidad Beni Guide aceptas publicar información veraz, respetar a otros
          usuarios y no utilizar la plataforma para actividades ilegales o engañosas.
        </p>
        <p>
          Los negocios son responsables del contenido que publican (textos, imágenes, precios y
          promociones). La plataforma puede moderar o retirar contenido que viole estas normas.
        </p>
        <p>
          Las calificaciones y reseñas deben basarse en experiencias reales. Nos reservamos el
          derecho de eliminar reseñas fraudulentas.
        </p>
      </div>
    </>
  );
}
