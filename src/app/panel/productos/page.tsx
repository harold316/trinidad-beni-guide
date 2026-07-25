"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function PanelProductosPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Menú / Productos
      </h1>
      <form
        className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Producto guardado (demo)");
          setName("");
          setPrice("");
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Nombre</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Precio (Bs.)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-3 outline-none ring-[var(--color-primary)] focus:ring-2"
          />
        </label>
        <Button type="submit">Guardar producto</Button>
      </form>
    </div>
  );
}
