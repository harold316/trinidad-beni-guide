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

    // Nunca registrar SW en localhost: limpia residuos y evita bucles con HMR.
    if (local || !production) {
      void (async () => {
        const hadController = Boolean(navigator.serviceWorker.controller);
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((reg) => reg.unregister()));

        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((key) => caches.delete(key)));
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
