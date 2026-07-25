"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { BusinessCategory } from "@/types";

const field =
  "h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2";

export function BusinessForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "restaurantes" as BusinessCategory,
    description: "",
    address: "",
    phone: "",
    whatsapp: "",
    website: "",
    facebook: "",
    instagram: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Perfil guardado (demo). Conecta Firebase para persistir.");
    setLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Nombre del negocio</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Categoría</span>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value as BusinessCategory }))
            }
            className={field}
          >
            {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
              <option key={slug} value={slug}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Teléfono</span>
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">WhatsApp</span>
          <input
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Sitio web</span>
          <input
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Dirección</span>
          <input
            required
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Descripción</span>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={`${field} h-auto py-3`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Facebook</span>
          <input
            value={form.facebook}
            onChange={(e) => setForm((f) => ({ ...f, facebook: e.target.value }))}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Instagram</span>
          <input
            value={form.instagram}
            onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
            className={field}
          />
        </label>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar perfil"}
      </Button>
    </form>
  );
}
