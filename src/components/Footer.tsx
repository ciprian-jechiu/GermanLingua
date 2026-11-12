import Link from "next/link";
import { courses } from "@/data/courses";
import { media, site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/ro";
import { FacebookIcon, Icon, InstagramIcon } from "./Icon";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const href = (path = "") => `/${lang}${path}`;
  const cols = [
    { label: dict.nav.general, list: courses.filter((c) => c.group === "general") },
    { label: dict.nav.specialized, list: courses.filter((c) => c.group === "special") },
  ];
  const linkClass = "text-white/70 transition-colors hover:text-gold";

  return (
    <footer className="on-dark relative overflow-hidden bg-ink pb-[76px] text-white lg:pb-0">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]" />
      <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.logoInverted} alt={site.name} className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">{dict.footer.about}</p>
          <div className="mt-6 flex gap-3">
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand">
              <FacebookIcon />
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="mb-4 text-[17px] font-semibold lg:mb-5 lg:text-lg">{dict.footer.company}</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14.5px] lg:block lg:space-y-3 lg:text-[15px]">
            <li><Link className={linkClass} href={href()}>{dict.nav.home}</Link></li>
            <li><Link className={linkClass} href={href("/courses")}>{dict.nav.allCourses}</Link></li>
            <li><Link className={linkClass} href={href("/about")}>{dict.nav.about}</Link></li>
            <li><Link className={linkClass} href={href("/contact")}>{dict.nav.contact}</Link></li>
            <li><Link className={linkClass} href={href("/enroll")}>{dict.nav.enroll}</Link></li>
          </ul>
        </div>

        {cols.map((col) => (
          <div key={col.label} className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-[17px] font-semibold lg:mb-5 lg:text-lg">{col.label}</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14.5px] lg:block lg:space-y-3 lg:text-[15px]">
              {col.list.map((c) => (
                <li key={c.slug}>
                  <Link className={linkClass} href={href(`/courses/${c.slug}`)}>
                    {dict.courses[c.slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 lg:col-span-1">
          <h3 className="mb-4 text-[17px] font-semibold lg:mb-5 lg:text-lg">{dict.footer.contact}</h3>
          <ul className="space-y-4 text-[15px] text-white/70">
            <li className="flex gap-3"><Icon name="pin" size={18} className="mt-0.5 shrink-0 text-gold" />{dict.top.address}</li>
            <li className="flex gap-3"><Icon name="phone" size={18} className="mt-0.5 shrink-0 text-gold" /><a className="hover:text-gold" href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-3"><Icon name="mail" size={18} className="mt-0.5 shrink-0 text-gold" /><a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><Icon name="clock" size={18} className="mt-0.5 shrink-0 text-gold" />{dict.top.hours}</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x py-6 text-center text-sm text-white/55">
          © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
