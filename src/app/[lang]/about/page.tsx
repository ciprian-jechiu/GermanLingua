import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero, SectionHeading, StepCards } from "@/components/ui";
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
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.about} title={dict.aboutPage.title} lead={dict.aboutPage.lead} image={media.heroAbout} position="center 55%" />

      {/* Metoda */}
      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div>
          <h2 data-reveal className="text-[28px] font-bold tracking-tight sm:text-[42px]">
            {dict.aboutPage.methodTitle}
          </h2>
          <p data-reveal className="mt-6 text-[17px] leading-relaxed text-muted">
            {dict.aboutPage.method1}
          </p>
          <p data-reveal className="mt-4 text-[17px] leading-relaxed text-muted">
            {dict.aboutPage.method2}
          </p>
          <div className="mt-7 grid grid-cols-4 gap-2 sm:mt-9 sm:gap-4">
            {dict.method.steps.map((step, i) => (
              <div key={step} data-reveal="zoom" data-delay={i + 1} className="rounded-[18px] bg-mist px-1 py-4 text-center sm:rounded-[22px] sm:p-5">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-white sm:h-12 sm:w-12">
                  <Icon name={stepIcons[i]} size={22} />
                </span>
                <p className="mt-2.5 hyphens-auto break-words text-[12.5px] font-bold sm:mt-3 sm:text-base">{step}</p>
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
        <div className="container-x py-14 lg:py-24">
          <SectionHeading center tag={dict.steps.tag} a={dict.steps.a} hl={dict.steps.hl} b={dict.steps.b} />
            <StepCards items={dict.steps.items} plain />
        </div>
      </section>

      {/* Fondatoarea */}
      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20 lg:py-28">
        <div data-reveal="left" className="relative mx-auto w-[88%] max-w-[440px] sm:w-full">
          <div aria-hidden className="absolute -right-4 -top-4 sm:-right-5 sm:-top-5 h-full w-full rounded-[36px] border-2 border-brand" />
          <div className="relative overflow-hidden rounded-[36px] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.founder} alt={dict.founder.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-[center_40%] origin-[50%_45%] scale-[1.4]" />
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

      <div className="pb-16 lg:pb-24">
        <CtaBand lang={lang} cta={dict.cta} />
      </div>
    </>
  );
}
