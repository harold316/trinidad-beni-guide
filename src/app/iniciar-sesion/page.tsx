"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login, loginGoogle, configured } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      toast.message("Modo demo", {
        description: "Configura Firebase en .env.local para autenticación real.",
      });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Sesión iniciada");
      router.push("/");
    } catch {
      toast.error("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero eyebrow="Cuenta" title="Iniciar sesión" description="Accede como cliente o empresa." />
      <div className="mx-auto max-w-md px-4 py-10 md:px-6">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Correo</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={async () => {
              if (!configured) {
                toast.message("Configura Firebase para Google Auth");
                return;
              }
              try {
                await loginGoogle();
                router.push("/");
              } catch {
                toast.error("No se pudo iniciar con Google");
              }
            }}
          >
            <FaGoogle /> Continuar con Google
          </Button>
          <p className="text-center text-sm text-[var(--color-muted)]">
            ¿No tienes cuenta?{" "}
            <Link href="/registrarse" className="font-semibold text-[var(--color-primary)]">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
