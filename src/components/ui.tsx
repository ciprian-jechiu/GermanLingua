import Link from "next/link";
import { cardMeta, type Course } from "@/data/courses";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries/ro";
import { Icon } from "./Icon";

/** Eticheta mică + titlul mare cu un cuvânt evidențiat, ca în designul de referință. */
export function SectionHeading({
  tag,
  a,
  hl,
  b,
  text,
  center,
  as: Tag = "h2",
}: {
  tag: string;
  a: string;
  hl: string;
  b?: string;
  text?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className={`mb-4 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-brand [.on-dark_&]:text-gold`}>
        <span className="h-px w-8 bg-current" />
        {tag}
        {center && <span className="h-px w-8 bg-current" />}
      </p>
      <Tag className="text-[28px] font-bold leading-[1.18] tracking-tight sm:text-[42px]">
        {a}
        <span className="hl">{hl}</span>
        {b}
      </Tag>
      {text && <p className="mt-4 text-[16px] leading-relaxed sm:mt-5 sm:text-[17px] text-muted [.on-dark_&]:text-white/70">{text}</p>}
    </div>
  );
}

export function CourseCard({ course, lang, dict, delay }: { course: Course; lang: Locale; dict: Dict; delay?: number }) {
  const c = dict.courses[course.slug];
  const [metaA, metaB] = cardMeta(course, dict.labels);
  return (
    <Link
      href={`/${lang}/courses/${course.slug}`}
      data-reveal
      data-delay={delay}
      className="group flex flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card"
    >
      <div className="relative m-3 flex h-32 items-end overflow-hidden rounded-[20px] bg-sun p-5 sm:h-44">
        <div aria-hidden className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-brand transition-transform duration-700 group-hover:scale-125" />
        <div aria-hidden className="absolute -bottom-14 right-16 h-28 w-28 rounded-full border-[14px] border-white/90 transition-transform duration-700 group-hover:-translate-y-3" />
        <span className="relative font-extrabold text-ink text-[46px] tracking-tight sm:text-[64px]">{course.badge}</span>
        {course.full ? (
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white">
            <Icon name="check" size={13} />
            {dict.labels.fullLevel}
          </span>
        ) : (
          <span className="absolute left-5 top-5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink">
            {course.group === "general" ? dict.nav.general : dict.nav.specialized}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3 sm:px-7 sm:pb-7 sm:pt-4">
        <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="book" size={16} className="text-brand" />
            {metaA}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">{metaB}</span>
        </div>
        <h3 className="text-xl font-bold leading-snug transition-colors group-hover:text-brand">{c.title}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{c.level}</p>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{c.short}</p>
        <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-[15px] font-semibold">
          {dict.coursesSec.details}
          <Icon name="arrow" size={17} className="text-brand transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

/** Banda mare de sus de pe paginile interioare, cu fotografie opțională. */
export function PageHero({
  lang,
  home,
  crumb,
  title,
  lead,
  image,
  position = "center",
}: {
  lang: Locale;
  home: string;
  crumb: string;
  title: string;
  lead?: string;
  image?: string;
  position?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-sun text-ink">
      {image ? (
        <div aria-hidden className="relative h-[190px] w-full overflow-hidden sm:h-[280px] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:h-auto lg:w-[56%]">
          <div className="kenburns h-full w-full bg-cover" style={{ backgroundImage: `url(${image})`, backgroundPosition: position }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,210,90,0)_50%,#ffd25a_100%)] lg:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#ffd25a_0%,rgba(255,210,90,0.55)_20%,rgba(255,210,90,0)_46%)] lg:block" />
        </div>
      ) : (
        <>
          <div aria-hidden className="absolute -left-24 -top-24 -z-10 h-[380px] w-[380px] rounded-full bg-white/70 blur-[110px]" />
          <div aria-hidden className="float absolute hidden sm:block -right-16 top-10 -z-10 h-64 w-64 rounded-full border-[26px] border-white/55" />
        </>
      )}
      <div className={`container-x ${image ? "flex flex-col justify-center pb-10 pt-4 md:pb-14 lg:min-h-[500px] lg:py-28" : "py-11 md:py-24"}`}>
        <nav className="mb-3 flex items-center gap-2 text-[13px] text-ink/70 sm:mb-5 sm:text-sm">
          <Link href={`/${lang}`} className="hover:text-brand">
            {home}
          </Link>
          <span>/</span>
          <span className="font-semibold text-brand">{crumb}</span>
        </nav>
        <h1 className={`text-[28px] font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[52px] ${image ? "max-w-3xl lg:max-w-[540px]" : "max-w-4xl"}`}>{title}</h1>
        {lead && <p className={`mt-3 text-[16px] leading-relaxed text-ink/80 sm:mt-5 sm:text-lg ${image ? "max-w-xl lg:max-w-[480px]" : "max-w-2xl"}`}>{lead}</p>}
      </div>
    </section>
  );
}

/** Banda roșie „Fă primul pas”. */
export function CtaBand({ lang, cta }: { lang: Locale; cta: Dict["cta"] }) {
  return (
    <section className="container-x">
      <div data-reveal="zoom" className="relative isolate overflow-hidden rounded-[28px] bg-brand px-6 py-10 text-white md:rounded-[36px] md:px-16 md:py-16">
        <div aria-hidden className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-white/10" />
        <div aria-hidden className="float absolute hidden sm:block -bottom-24 right-40 -z-10 h-56 w-56 rounded-full border-[22px] border-gold/60" />
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-[26px] font-bold tracking-tight sm:text-[40px]">{cta.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-white/85">{cta.text}</p>
          </div>
          <Link href={`/${lang}/enroll`} className="btn btn-light w-full shrink-0 md:w-auto">
            {cta.button}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Cei trei pași: rând compact pe telefon, carduri pe ecrane mari. */
export function StepCards({ items, plain }: { items: Dict["steps"]["items"]; plain?: boolean }) {
  return (
    <div className="mt-9 grid gap-3.5 md:mt-14 md:grid-cols-3 md:gap-7">
      {items.map((step, i) => (
        <article
          key={step.title}
          data-reveal
          data-delay={i + 1}
          className={`group relative flex items-start gap-5 rounded-[22px] bg-white p-5 shadow-soft transition-all duration-500 md:block md:rounded-[28px] md:p-8 md:hover:-translate-y-2 ${plain ? "" : "border border-line md:hover:border-brand md:hover:shadow-card"}`}
        >
          <span className="outline-num shrink-0 text-[40px] md:text-6xl">0{i + 1}</span>
          <div>
            <h3 className="text-[19px] font-bold md:mt-5 md:text-2xl">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted md:mt-3 md:text-[16px]">{step.text}</p>
          </div>
          {!plain && i < items.length - 1 && <Icon name="arrow" size={26} className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white text-brand md:block" />}
        </article>
      ))}
    </div>
  );
}
