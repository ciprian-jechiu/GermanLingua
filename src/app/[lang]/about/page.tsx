import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { media } from "@/data/site";
import { getDictionary } from "@/i18n";

const stepIcons: IconName[] = ["ear", "eye", "repeat", "chat"];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { dict } = getDictionary((await params).lang);
  return { title: dict.nav.about, description: dict.aboutPage.lead };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang, dict } = getDictionary((await params).lang);

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.about} title={dict.aboutPage.title} lead={dict.aboutPage.lead} />

      {/* Metoda */}
      <section className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div>
          <h2 data-reveal className="text-3xl font-bold tracking-tight sm:text-[42px]">
            {dict.aboutPage.methodTitle}
          </h2>
          <p data-reveal className="mt-6 text-[17px] leading-relaxed text-muted">
            {dict.aboutPage.method1}
          </p>
          <p data-reveal className="mt-4 text-[17px] leading-relaxed text-muted">
            {dict.aboutPage.method2}
          </p>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {dict.method.steps.map((step, i) => (
              <div key={step} data-reveal="zoom" data-delay={i + 1} className="rounded-[22px] bg-mist p-5 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                  <Icon name={stepIcons[i]} size={22} />
                </span>
                <p className="mt-3 font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal="right" className="relative">
          <div className="overflow-hidden rounded-[28px_120px_28px_120px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.group} alt="" loading="lazy" className="aspect-[5/4] w-full object-cover" />
          </div>
          <span aria-hidden className="float absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full border-[16px] border-gold/70" />
        </div>
      </section>

      {/* Pași */}
      <section className="bg-mist">
        <div className="container-x py-20 lg:py-24">
          <SectionHeading center tag={dict.steps.tag} a={dict.steps.a} hl={dict.steps.hl} b={dict.steps.b} />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {dict.steps.items.map((step, i) => (
              <article key={step.title} data-reveal data-delay={i + 1} className="rounded-[28px] bg-white p-8 shadow-soft">
                <span className="outline-num text-6xl">0{i + 1}</span>
                <h3 className="mt-5 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fondatoarea */}
      <section className="container-x grid items-center gap-14 py-20 lg:grid-cols-[0.85fr_1fr] lg:gap-20 lg:py-28">
        <div data-reveal="left" className="relative mx-auto w-full max-w-[440px]">
          <div aria-hidden className="absolute -right-5 -top-5 h-full w-full rounded-[36px] border-2 border-brand" />
          <div className="relative overflow-hidden rounded-[36px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.founder} alt={dict.founder.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
          </div>
        </div>
        <div>
          <SectionHeading tag={dict.founder.tag} a={dict.founder.a} hl={dict.founder.hl} b={dict.founder.b} text={dict.founder.text} />
          <p data-reveal className="mt-6 text-2xl font-bold">
            {dict.founder.name}
          </p>
          <ul className="mt-6 space-y-4">
            {dict.founder.points.map((point, i) => (
              <li key={point} data-reveal data-delay={i + 1} className="flex items-center gap-4 rounded-2xl border border-line px-5 py-4 font-medium">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" size={17} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pb-24">
        <CtaBand lang={lang} cta={dict.cta} />
      </div>
    </>
  );
}
