import { site } from "@/data/site";
import { FacebookIcon, InstagramIcon, TelegramIcon, WhatsAppIcon } from "./Icon";

export const socials = [
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: site.telegram, label: "Telegram", Icon: TelegramIcon },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
];

/** Cele 4 rețele (WhatsApp, Telegram, Instagram, Facebook) ca butoane rotunde. */
export default function Socials({ className = "", itemClass, size = 16 }: { className?: string; itemClass: string; size?: number }) {
  return (
    <div className={`flex items-center ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={itemClass}>
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
