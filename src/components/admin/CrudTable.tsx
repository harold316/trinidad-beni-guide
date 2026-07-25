"use client";

import { Button } from "@/components/ui/Button";

export function CrudTable({
  title,
  description,
  columns,
  rows,
}: {
  title: string;
  description: string;
  columns: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
        </div>
        <Button size="sm">Crear nuevo</Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--color-border)] bg-black/[0.02] dark:bg-white/[0.03]">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 font-semibold">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-[var(--color-muted)]">
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost">
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
