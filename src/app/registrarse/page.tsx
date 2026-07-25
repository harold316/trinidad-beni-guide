"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

export default function RegisterPage() {
  const { register, configured } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    role: "cliente" as UserRole,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      toast.message("Modo demo", {
        description: "Configura Firebase en .env.local para registro real.",
      });
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.password, form.displayName, form.role);
      toast.success("Cuenta creada");
      router.push(form.role === "empresa" ? "/panel" : "/");
    } catch {
      toast.error("No se pudo registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Únete"
        title="Crear cuenta"
        description="Regístrate como cliente o empresa."
      />
      <div className="mx-auto max-w-md px-4 py-10 md:px-6">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Nombre</span>
            <input
              required
              value={form.displayName}
              onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Correo</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Contraseña</span>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Tipo de cuenta</span>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            >
              <option value="cliente">Cliente</option>
              <option value="empresa">Empresa</option>
            </select>
          </label>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creando..." : "Registrarse"}
          </Button>
          <p className="text-center text-sm text-[var(--color-muted)]">
            ¿Ya tienes cuenta?{" "}
            <Link href="/iniciar-sesion" className="font-semibold text-[var(--color-primary)]">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
