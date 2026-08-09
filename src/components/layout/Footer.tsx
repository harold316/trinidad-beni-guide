import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTiktok,
} from "react-icons/fa";
import { SITE_NAME } from "@/lib/constants";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-footer)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
            {SITE_NAME}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Portal turístico y comercial de Trinidad, capital del Beni. Descubre
            gastronomía, salud, turismo y negocios locales en un solo lugar.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="social-icon">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
            Explorar ahora
          </h3>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/restaurantes" className="hover:text-[var(--color-primary)]">Restaurantes</Link></li>
            <li><Link href="/turismo" className="hover:text-[var(--color-primary)]">Turismo</Link></li>
            <li><Link href="/salud" className="hover:text-[var(--color-primary)]">Salud</Link></li>
            <li><Link href="/empresas" className="hover:text-[var(--color-primary)]">Empresas</Link></li>
            <li><Link href="/promociones" className="hover:text-[var(--color-primary)]">Promociones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-[var(--color-muted)]">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-[var(--color-primary)]" />
              Trinidad, Beni, Bolivia
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-[var(--color-primary)]" />
              +591 73906744
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-primary)]" />
              hola@trinidadbeniguide.com
            </li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)]">
            <iframe
              title="Mapa de Trinidad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61240.85!2d-64.92!3d-14.833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3086c4c5f7f0d%3A0x6f5f5f5f5f5f5f5f!2sTrinidad%2C%20Bolivia!5e0!3m2!1ses!2sbo!4v1700000000000"
              className="h-36 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
            Newsletter
          </h3>
          <p className="mb-4 text-sm text-[var(--color-muted)]">
            Recibe eventos, promociones y novedades de Trinidad Beni.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/politicas" className="hover:text-[var(--color-primary)]">Políticas</Link>
            <Link href="/terminos" className="hover:text-[var(--color-primary)]">Términos</Link>
            <Link href="/contacto" className="hover:text-[var(--color-primary)]">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
