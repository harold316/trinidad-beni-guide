import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { fetchNews } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Noticias",
  description: "Noticias de Trinidad, Beni: turismo, negocios y comunidad.",
  path: "/noticias",
});

export default async function NoticiasPage() {
  const news = await fetchNews();

  return (
    <>
      <PageHero
        eyebrow="Actualidad"
        title="Noticias de Trinidad"
        description="Información útil para residentes, visitantes y emprendedores."
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:px-6">
        {news.map((article) => (
          <Link
            key={article.id}
            href={`/noticias/${article.slug}`}
            className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition hover:shadow-lg"
          >
            <div className="relative aspect-[16/9]">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
            </div>
            <div className="space-y-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-blue)]">
                {article.publishedAt} · {article.category}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                {article.title}
              </h2>
              <p className="text-[var(--color-muted)]">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
