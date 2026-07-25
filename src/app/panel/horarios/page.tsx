"use client";

import { DAYS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function PanelHorariosPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Horarios
      </h1>
      <form
        className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Horarios actualizados (demo)");
        }}
      >
        {DAYS.map((day) => (
          <div key={day} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-3">
            <span className="text-sm font-medium">{day}</span>
            <input type="time" defaultValue="08:00" className="h-10 rounded-xl border border-[var(--color-border)] bg-transparent px-2" />
            <input type="time" defaultValue="22:00" className="h-10 rounded-xl border border-[var(--color-border)] bg-transparent px-2" />
          </div>
        ))}
        <Button type="submit" className="mt-4">
          Guardar horarios
        </Button>
      </form>
    </div>
  );
}
