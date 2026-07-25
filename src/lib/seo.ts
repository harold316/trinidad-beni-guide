import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop&q=80",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Descubre Trinidad - Capital del Beni`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_BO",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function localBusinessJsonLd(business: {
  name: string;
  description: string;
  address: string;
  phone?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: business.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: "Trinidad",
      addressRegion: "Beni",
      addressCountry: "BO",
    },
    telephone: business.phone,
    url: business.url,
    aggregateRating: business.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: business.rating,
          reviewCount: business.reviewCount || 0,
        }
      : undefined,
  };
}
