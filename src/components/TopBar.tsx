import { site } from "@/data/site";
import type { Dict } from "@/i18n/dictionaries/ro";
import { Icon } from "./Icon";
import Socials from "./Socials";

export default function TopBar({ top }: { top: Dict["top"] }) {
  return (
    <div className="hidden bg-sun-soft text-[13.5px] text-ink/80 lg:block">
      <div className="container-x flex h-11 items-stretch justify-between">
        <div className="relative -ml-8 flex items-center gap-3 bg-brand pl-8 pr-10 whitespace-nowrap font-medium text-white [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)]">
          <span>{top.follow}</span>
          <Socials className="gap-2" size={14} itemClass="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-brand" />
        </div>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-2">
            <Icon name="pin" size={15} className="text-brand" />
            {top.address}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="clock" size={15} className="text-brand" />
            {top.hours}
          </span>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-brand">
            <Icon name="mail" size={15} className="text-brand" />
            {site.email}
          </a>
          <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-ink transition-colors hover:text-brand">
            <Icon name="phone" size={15} className="text-brand" />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
