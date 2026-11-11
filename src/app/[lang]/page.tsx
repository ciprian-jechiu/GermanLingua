import Link from "next/link";
import Hero from "@/components/Hero";
import { Icon, type IconName } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { CourseCard, CtaBand, SectionHeading } from "@/components/ui";
import { courses } from "@/data/courses";
import { media, site } from "@/data/site";
import { getDictionary } from "@/i18n";

const featureIcons: IconName[] = ["gift", "cap", "book", "award"];
const statIcons: IconName[] = ["cap", "laptop", "target", "chat"];
const stepIcons: IconName[] = ["ear", "eye", "repeat", "chat"];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang, dict } = getDictionary((await params).lang);
  const href = (path = "") => `/${lang}${path}`;

  return (
    <>
      <Hero hero={dict.hero} images={[media.hero, media.online]} enrollHref={href("/enroll")} coursesHref={href("/courses")} />

      {/* Cele 4 carduri suprapuse peste hero */}
      <section className="container-x relative z-10 -mt-28 md:-mt-36">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.features.map((f, i) => (
            <article
              key={f.title}
              data-reveal
              data-delay={i + 1}
              className="group relative overflow-hidden rounded-[28px] border border-line bg-white p-7 shadow-card transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between">
                <span className="blob grid h-16 w-16 place-items-center bg-brand text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon name={featureIcons[i]} size={28} />
                </span>
                <span className="outline-num text-[44px]">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </section>

      {/* Despre */}
      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div data-reveal="left" className="relative mx-auto grid w-full max-w-[560px] grid-cols-2 gap-5">
          <div className="row-span-2 overflow-hidden rounded-[120px_28px_120px_28px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.group} alt="" loading="lazy" className="h-full min-h-[380px] w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-full border-[8px] border-white bg-mist shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.a2} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-[28px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.online} alt="" loading="lazy" className="h-full min-h-[170px] w-full object-cover" />
          </div>
          <div className="float absolute -bottom-8 left-4 flex items-center gap-4 rounded-[24px] bg-brand px-6 py-5 text-white shadow-card sm:left-8">
            <span className="text-5xl font-extrabold leading-none">{dict.about.badgeValue}</span>
            <span className="max-w-[130px] text-sm font-medium leading-snug">{dict.about.badge}</span>
          </div>
          <span aria-hidden className="absolute -left-6 -top-6 -z-10 h-28 w-28 rounded-full border-[14px] border-gold/70" />
        </div>

        <div>
          <SectionHeading tag={dict.about.tag} a={dict.about.a} hl={dict.about.hl} b={dict.about.b} text={dict.about.text} />
          <div className="mt-9 grid gap-6 sm:grid-cols-[1fr_0.9fr]">
            <ul className="space-y-6">
              {dict.about.items.map((item, i) => (
                <li key={item.title} data-reveal data-delay={i + 1} className="flex gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-mist text-brand">
                    <Icon name={i === 0 ? "target" : "calendar"} size={24} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <blockquote data-reveal data-delay="2" className="relative rounded-[24px] bg-mist p-6 text-[15px] leading-relaxed text-ink">
              {dict.about.quote}
              <Icon name="quote" size={34} className="absolute -bottom-3 right-5 text-brand" />
            </blockquote>
          </div>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-7">
            <Link href={href("/about")} className="btn btn-ink">
              {dict.about.cta}
              <Icon name="arrow" size={18} />
            </Link>
            <a href={site.phoneHref} className="group flex items-center gap-4">
              <span className="grid h-13 w-13 place-items-center rounded-full bg-brand p-3.5 text-white transition-transform group-hover:scale-110">
                <Icon name="phone" size={22} />
              </span>
              <span>
                <span className="block text-sm text-muted">{dict.about.call}</span>
                <span className="block text-lg font-bold">{site.phone}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Cifre */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${media.hero})` }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,22,27,0.96),rgba(156,12,35,0.72))]" />
        <div className="container-x grid grid-cols-2 gap-y-12 py-20 lg:grid-cols-4">
          {dict.stats.map((s, i) => (
            <div key={s.label} data-reveal data-delay={i + 1} className="text-center">
              <span className="blob mx-auto grid h-20 w-20 place-items-center bg-gold text-ink">
                <Icon name={statIcons[i]} size={34} />
              </span>
              <p className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
                {i < 2 && <span className="text-gold">+</span>}
              </p>
              <p className="mx-auto mt-2 max-w-[180px] text-[15px] text-white/75">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cursuri */}
      <section className="container-x py-24 lg:py-32">
        <SectionHeading center tag={dict.coursesSec.tag} a={dict.coursesSec.a} hl={dict.coursesSec.hl} b={dict.coursesSec.b} text={dict.coursesSec.text} />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course, i) => (
            <CourseCard key={course.slug} course={course} lang={lang} dict={dict} delay={(i % 3) + 1} />
          ))}
        </div>
        <div data-reveal className="mt-12 text-center">
          <Link href={href("/courses")} className="btn btn-ink">
            {dict.coursesSec.all}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      {/* Metoda */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute -right-32 top-0 -z-10 h-[460px] w-[460px] rounded-full bg-brand/35 blur-[140px]" />
        <div className="container-x grid items-center gap-14 py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <div>
            <SectionHeading tag={dict.method.tag} a={dict.method.a} hl={dict.method.hl} b={dict.method.b} text={dict.method.text} />
            <div className="mt-10 space-y-7">
              {dict.method.bars.map((bar) => (
                <div key={bar.label} data-reveal>
                  <div className="mb-2.5 flex justify-between text-[15px] font-semibold">
                    <span>{bar.label}</span>
                    <span className="text-gold">{bar.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="bar-fill h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand),var(--color-gold))]" style={{ "--w": `${bar.value}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {dict.method.steps.map((step, i) => (
              <div
                key={step}
                data-reveal="zoom"
                data-delay={i + 1}
                className={`group rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-500 hover:border-brand hover:bg-brand ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-gold transition-colors group-hover:bg-white group-hover:text-brand">
                    <Icon name={stepIcons[i]} size={26} />
                  </span>
                  <span className="outline-light text-4xl">0{i + 1}</span>
                </div>
                <p className="mt-6 text-2xl font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondatoarea */}
      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-[0.85fr_1fr] lg:gap-20 lg:py-32">
        <div data-reveal="left" className="relative mx-auto w-full max-w-[440px]">
          <div aria-hidden className="absolute -right-5 -top-5 h-full w-full rounded-[36px] border-2 border-brand" />
          <div className="relative overflow-hidden rounded-[36px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.founder} alt={dict.founder.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-[22px] bg-ink px-6 py-4 text-white shadow-card">
            <p className="text-lg font-bold">{dict.founder.name}</p>
            <p className="text-sm text-gold">{dict.founder.tag}</p>
          </div>
        </div>
        <div>
          <SectionHeading tag={dict.founder.tag} a={dict.founder.a} hl={dict.founder.hl} b={dict.founder.b} text={dict.founder.text} />
          <ul className="mt-8 space-y-4">
            {dict.founder.points.map((point, i) => (
              <li key={point} data-reveal data-delay={i + 1} className="flex items-center gap-4 rounded-2xl border border-line px-5 py-4 text-[16px] font-medium">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" size={17} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Online sau în clasă */}
      <section className="bg-mist">
        <div className="container-x py-24 lg:py-28">
          <SectionHeading center tag={dict.formats.tag} a={dict.formats.a} hl={dict.formats.hl} b={dict.formats.b} />
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {[
              { ...dict.formats.online, img: media.online, icon: "laptop" as IconName, slug: "online" },
              { ...dict.formats.onsite, img: media.group, icon: "building" as IconName, slug: "group" },
            ].map((item, i) => (
              <Link
                key={item.slug}
                href={href(`/courses/${item.slug}`)}
                data-reveal
                data-delay={i + 1}
                className="group relative isolate flex min-h-[380px] items-end overflow-hidden rounded-[32px] bg-ink p-8 text-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,22,27,0.1)_20%,rgba(21,22,27,0.92)_85%)]" />
                <div>
                  <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand">
                    <Icon name={item.icon} size={26} />
                  </span>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-md text-white/80">{item.text}</p>
                </div>
                <span className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-all duration-300 group-hover:bg-gold group-hover:rotate-[-45deg]">
                  <Icon name="arrow" size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pași */}
      <section className="container-x py-24 lg:py-32">
        <SectionHeading center tag={dict.steps.tag} a={dict.steps.a} hl={dict.steps.hl} b={dict.steps.b} />
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {dict.steps.items.map((step, i) => (
            <article key={step.title} data-reveal data-delay={i + 1} className="group relative rounded-[28px] border border-line bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-brand hover:shadow-card">
              <span className="outline-num text-6xl">0{i + 1}</span>
              <h3 className="mt-5 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{step.text}</p>
              {i < 2 && <Icon name="arrow" size={26} className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white text-brand md:block" />}
            </article>
          ))}
        </div>
      </section>

      <CtaBand lang={lang} cta={dict.cta} />

      {/* Formular */}
      <section className="container-x py-24 lg:py-32">
        <div className="grid overflow-hidden rounded-[36px] border border-line shadow-card lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal="left" className="on-dark relative isolate overflow-hidden bg-ink p-9 text-white md:p-14">
            <div aria-hidden className="absolute -bottom-24 -left-20 -z-10 h-72 w-72 rounded-full bg-brand/50 blur-[90px]" />
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{dict.form.title}</h2>
            <p className="mt-4 text-lg text-white/75">{dict.form.subtitle}</p>
            <ul className="mt-9 space-y-4">
              {dict.form.bullets.map((b) => (
                <li key={b} className="flex gap-3.5 text-[16px] text-white/90">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                    <Icon name="check" size={15} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right" className="bg-white p-9 md:p-14">
            <LeadForm form={dict.form} lang={lang} source="home" />
          </div>
        </div>
      </section>

      {/* Examene */}
      <section className="border-y border-line bg-mist py-14">
        <div className="container-x text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">{dict.exams.tag}</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">{dict.exams.title}</h2>
        </div>
        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="marquee flex w-max gap-5">
            {[...site.exams, ...site.exams, ...site.exams, ...site.exams].map((exam, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-white px-7 py-4 text-lg font-bold">
                <Icon name="award" size={22} className="text-brand" />
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Povești */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-brand/30 blur-[150px]" />
        <div className="container-x py-24 lg:py-28">
          <SectionHeading center tag={dict.stories.tag} a={dict.stories.a} hl={dict.stories.hl} b={dict.stories.b} />
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {dict.stories.items.map((story, i) => (
              <figure
                key={story.name}
                data-reveal
                data-delay={(i % 3) + 1}
                className="w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-500 hover:border-gold/60 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Icon name="spark" size={26} className="text-gold" />
                <p className="mt-5 min-h-[84px] text-[17px] leading-relaxed text-white/90">{story.text}</p>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media.stories[i]} alt="" loading="lazy" className="h-14 w-14 rounded-full bg-white/10 object-cover" />
                  <span className="text-lg font-bold">{story.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
