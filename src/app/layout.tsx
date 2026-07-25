import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/marketing/FloatingActions";
import { Analytics } from "@/components/marketing/Analytics";
import { RegisterSW } from "@/components/pwa/RegisterSW";
import { AppProviders } from "@/components/providers/AppProviders";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...createMetadata(),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "Trinidad",
    "Beni",
    "Bolivia",
    "turismo",
    "restaurantes",
    "hoteles",
    "clínicas",
    "directorio",
    "Trinidad Beni Guide",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  other: {
    "theme-color": "#4CAF50",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4CAF50" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1612" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: SITE_NAME,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trinidad",
      addressRegion: "Beni",
      addressCountry: "BO",
    },
    areaServed: "Trinidad, Beni, Bolivia",
  };

  return (
    <html lang="es" suppressHydrationWarning className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
          <RegisterSW />
          <Analytics />
        </AppProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
