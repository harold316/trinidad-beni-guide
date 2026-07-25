"use client";

import { FaFacebook, FaLink, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const btn =
  "inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-xs font-semibold transition hover:border-[var(--color-primary)]";

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    await navigator.clipboard.writeText(url);
    toast.success("Enlace copiado");
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await copy();
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={nativeShare} className={btn}>
        <FaShareAlt /> Compartir
      </button>
      <a
        href={`https://wa.me/?text=${text}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <FaWhatsapp /> WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <FaFacebook /> Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <FaXTwitter /> X
      </a>
      <button type="button" onClick={copy} className={btn}>
        <FaLink /> Copiar
      </button>
    </div>
  );
}
