"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function PanelPromocionesPage() {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupon, setCoupon] = useState("");

  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Promociones
      </h1>
      <form
        className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Promoción creada (demo)");
          setTitle("");
          setDiscount("");
          setCoupon("");
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Título</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Descuento</span>
            <input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20%"
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Cupón</span>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="TRINI20"
              className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
            />
          </label>
        </div>
        <Button type="submit" variant="promo">
          Publicar promoción
        </Button>
      </form>
    </div>
  );
}
