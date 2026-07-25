"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaHeartbeat,
  FaHotel,
  FaLandmark,
  FaPills,
  FaStore,
  FaTree,
  FaUtensils,
} from "react-icons/fa";

const categories = [
  { href: "/restaurantes", label: "Restaurantes", icon: FaUtensils, tone: "bg-emerald-500" },
  { href: "/turismo", label: "Turismo", icon: FaTree, tone: "bg-sky-500" },
  { href: "/salud", label: "Salud", icon: FaHeartbeat, tone: "bg-rose-500" },
  { href: "/empresas", label: "Empresas", icon: FaBriefcase, tone: "bg-indigo-500" },
  { href: "/turismo?tipo=hoteles", label: "Hoteles", icon: FaHotel, tone: "bg-amber-500" },
  { href: "/salud?tipo=farmacias", label: "Farmacias", icon: FaPills, tone: "bg-teal-500" },
  { href: "/turismo?tipo=museos", label: "Museos", icon: FaLandmark, tone: "bg-orange-500" },
  { href: "/empresas", label: "Tiendas", icon: FaStore, tone: "bg-lime-600" },
];

export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04 }}
        >
          <Link
            href={cat.href}
            className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${cat.tone}`}>
              <cat.icon />
            </span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{cat.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
