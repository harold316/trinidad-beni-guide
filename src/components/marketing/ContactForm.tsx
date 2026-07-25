"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { submitContact } from "@/lib/firebase/firestore";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await submitContact(form);
      }
      toast.success("Mensaje enviado. Te contactaremos pronto.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("No se pudo enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
    >
      {(
        [
          ["name", "Nombre", "text"],
          ["email", "Correo", "email"],
          ["phone", "Teléfono", "tel"],
          ["subject", "Asunto", "text"],
        ] as const
      ).map(([key, label, type]) => (
        <label key={key} className="block">
          <span className="mb-1.5 block text-sm font-semibold">{label}</span>
          <input
            required={key !== "phone"}
            type={type}
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/80 px-3 outline-none ring-[var(--color-primary)] focus:ring-2 dark:bg-stone-900/50"
          />
        </label>
      ))}
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Mensaje</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-[var(--color-border)] bg-white/80 px-3 py-3 outline-none ring-[var(--color-primary)] focus:ring-2 dark:bg-stone-900/50"
        />
      </label>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
