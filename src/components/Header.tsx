"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "@/data/courses";
import { media, site } from "@/data/site";
import { localeNames, locales, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/ro";
import { Icon } from "./Icon";

type Props = { lang: Locale; nav: Dict["nav"]; titles: Record<string, string> };

export default function Header({ lang, nav, titles }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (path = "") => `/${lang}${path}`;
  const switchTo = (l: Locale) => pathname.replace(/^\/(de|ro|en|ru)(?=\/|$)/, `/${l}`) || `/${l}`;
  const isActive = (path: string) => (path === "" ? pathname === `/${lang}` : pathname.startsWith(`/${lang}${path}`));

  const general = courses.filter((c) => c.group === "general");
  const special = courses.filter((c) => c.group === "special");

  const linkClass = (path: string) =>
    `relative py-2 text-[15px] font-medium transition-colors hover:text-brand ${
      isActive(path) ? "text-brand" : "text-ink"
    } after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-brand after:transition-all after:duration-300 ${
      isActive(path) ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-soft" : ""}`}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Link href={href()} className="flex shrink-0 items-center" aria-label={site.name} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.logo} alt={site.name} className="h-10 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={nav.menu}>
          <Link href={href()} className={linkClass("")}>
            {nav.home}
          </Link>

          <div className="group relative">
            <Link href={href("/courses")} className={`${linkClass("/courses")} inline-flex items-center gap-1.5`}>
              {nav.courses}
              <Icon name="chevron" size={15} className="transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 translate-y-3 pt-5 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-8 rounded-3xl border border-line bg-white p-8 shadow-card">
                {[
                  { label: nav.general, list: general },
                  { label: nav.specialized, list: special },
                ].map((col) => (
                  <div key={col.label}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">{col.label}</p>
                    <ul className="space-y-1">
                      {col.list.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={href(`/courses/${c.slug}`)}
                            className="block rounded-xl px-3 py-2 text-[14.5px] text-ink transition-colors hover:bg-mist hover:text-brand"
                          >
                            {titles[c.slug]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href={href("/about")} className={linkClass("/about")}>
            {nav.about}
          </Link>
          <Link href={href("/contact")} className={linkClass("/contact")}>
            {nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-full border border-line p-1 sm:flex" aria-label={nav.language}>
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                hrefLang={l}
                title={localeNames[l]}
                className={`rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  l === lang ? "bg-ink text-white" : "text-muted hover:text-brand"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>

          <Link href={href("/enroll")} className="btn btn-brand !hidden !min-h-[46px] !px-6 sm:!inline-flex">
            {nav.enroll}
            <Icon name="arrow" size={17} />
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-label={nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Meniul mobil */}
      <div
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-x space-y-6 py-6">
          <div className="flex gap-2">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 flex-1 items-center justify-center rounded-full border text-sm font-semibold uppercase ${
                  l === lang ? "border-ink bg-ink text-white" : "border-line text-muted"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>

          <nav className="flex flex-col text-lg font-medium">
            {[
              { path: "", label: nav.home },
              { path: "/courses", label: nav.allCourses },
              { path: "/about", label: nav.about },
              { path: "/contact", label: nav.contact },
            ].map((item) => (
              <Link
                key={item.path}
                href={href(item.path)}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-4 ${isActive(item.path) ? "text-brand" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {[
            { label: nav.general, list: general },
            { label: nav.specialized, list: special },
          ].map((col) => (
            <div key={col.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">{col.label}</p>
              <ul>
                {col.list.map((c) => (
                  <li key={c.slug}>
                    <Link href={href(`/courses/${c.slug}`)} onClick={() => setOpen(false)} className="block py-2.5 text-[15px]">
                      {titles[c.slug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link href={href("/enroll")} onClick={() => setOpen(false)} className="btn btn-brand w-full">
            {nav.enroll}
            <Icon name="arrow" size={17} />
          </Link>
          <a href={site.phoneHref} className="flex items-center justify-center gap-2 pb-6 font-semibold">
            <Icon name="phone" size={18} className="text-brand" />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
