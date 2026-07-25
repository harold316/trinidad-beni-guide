"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { subscribeNewsletter } from "@/lib/firebase/firestore";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Ingresa un correo válido");
      return;
    }

    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await subscribeNewsletter(email);
      }
      toast.success("¡Gracias! Te suscribiste al newsletter.");
      setEmail("");
    } catch {
      toast.error("No se pudo suscribir. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="h-12 flex-1 rounded-xl border border-[var(--color-border)] bg-white/80 px-4 outline-none ring-[var(--color-primary)] focus:ring-2 dark:bg-stone-900/50"
        aria-label="Correo para newsletter"
      />
      <Button type="submit" disabled={loading} className="sm:w-auto">
        {loading ? "Enviando..." : "Suscribirme"}
      </Button>
    </form>
  );
}
