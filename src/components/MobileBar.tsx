import Link from "next/link";
import { site } from "@/data/site";
import { Icon } from "./Icon";

/** Bara fixă de jos, doar pe telefon: sună sau înscrie-te dintr-o atingere. */
export default function MobileBar({ lang, call, enroll }: { lang: string; call: string; enroll: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-2.5 backdrop-blur pb-[calc(0.625rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href={site.phoneHref} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink text-[15px] font-semibold text-ink">
          <Icon name="phone" size={18} />
          {call}
        </a>
        <Link href={`/${lang}/enroll`} className="flex h-12 flex-[1.3] items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white">
          {enroll}
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </div>
  );
}
