import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { fetchNews } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const news = await fetchNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await fetchNews();
  const article = news.find((n) => n.slug === slug);
  if (!article) return createMetadata({ title: "Noticia" });
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/noticias/${article.slug}`,
    image: article.image,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await fetchNews();
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} description={article.excerpt} />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 md:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          Por {article.author} · {article.publishedAt}
        </p>
        <p className="text-lg leading-relaxed text-[var(--color-ink)]">{article.content}</p>
      </article>
    </>
  );
}
