"use client";

import { FaFacebookMessenger, FaTelegram, FaWhatsapp } from "react-icons/fa";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "59171111111";
const messenger = process.env.NEXT_PUBLIC_MESSENGER_URL || "https://m.me/";
const telegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 md:bottom-8 md:right-6">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-xl text-white shadow-lg shadow-green-500/30 transition hover:scale-110"
      >
        <FaWhatsapp />
      </a>
      <a
        href={messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#0084FF] text-xl text-white shadow-lg shadow-blue-500/30 transition hover:scale-110"
      >
        <FaFacebookMessenger />
      </a>
      <a
        href={telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#229ED9] text-xl text-white shadow-lg shadow-sky-500/30 transition hover:scale-110"
      >
        <FaTelegram />
      </a>
    </div>
  );
}
