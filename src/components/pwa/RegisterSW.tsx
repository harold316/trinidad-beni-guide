"use client";

import { useEffect } from "react";

function isLocalHost() {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const local = isLocalHost();
    const production = process.env.NODE_ENV === "production";

    // En local nunca registrar SW: solo limpiar si quedó uno viejo.
    if (local || !production) {
      void (async () => {
        const regs = await navigator.serviceWorker.getRegistrations();
        if (regs.length === 0 && !navigator.serviceWorker.controller) return;

        const hadController = Boolean(navigator.serviceWorker.controller);
        await Promise.all(regs.map((reg) => reg.unregister()));

        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(
            keys
              .filter((key) => key.startsWith("tbg-cache"))
              .map((key) => caches.delete(key))
          );
        }

        if (hadController && !sessionStorage.getItem("tbg-sw-cleared")) {
          sessionStorage.setItem("tbg-sw-cleared", "1");
          window.location.reload();
        }
      })();
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // silent fail in unsupported environments
    });
  }, []);

  return null;
}
