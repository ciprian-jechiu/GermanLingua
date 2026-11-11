import { site } from "@/data/site";
import type { Dict } from "@/i18n/dictionaries/ro";
import { FacebookIcon, Icon, InstagramIcon } from "./Icon";

export default function TopBar({ top }: { top: Dict["top"] }) {
  return (
    <div className="hidden bg-ink text-[13.5px] text-white/85 lg:block">
      <div className="container-x flex h-11 items-stretch justify-between">
        <div className="relative -ml-8 flex items-center gap-3 bg-brand pl-8 pr-10 font-medium text-white [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)]">
          <span>{top.follow}</span>
          <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-brand">
            <FacebookIcon size={14} />
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-brand">
            <InstagramIcon size={14} />
          </a>
        </div>
        <div className="flex items-center gap-7">
          <span className="flex items-center gap-2">
            <Icon name="pin" size={15} className="text-gold" />
            {top.address}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="clock" size={15} className="text-gold" />
            {top.hours}
          </span>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-gold">
            <Icon name="mail" size={15} className="text-gold" />
            {site.email}
          </a>
          <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-gold">
            <Icon name="phone" size={15} className="text-gold" />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
