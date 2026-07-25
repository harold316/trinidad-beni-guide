import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "promo" | "success" | "info";
}) {
  const tones = {
    default: "bg-black/5 text-stone-700 dark:bg-white/10 dark:text-stone-200",
    promo: "bg-[var(--color-promo)]/20 text-amber-800 dark:text-amber-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    info: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
