import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { PageHero, SectionHeading, StepCards } from "@/components/ui";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/enroll">): Promise<Metadata> {
  const { dict } = getDictionary((await params).lang);
  return { title: dict.nav.enroll, description: dict.form.subtitle };
}

export default async function EnrollPage({ params }: PageProps<"/[lang]/enroll">) {
  const { lang, dict } = getDictionary((await params).lang);

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.enroll} title={dict.form.title} lead={dict.form.subtitle} />

      <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <ul className="space-y-4">
            {dict.form.bullets.map((b, i) => (
              <li key={b} data-reveal data-delay={i + 1} className="flex items-center gap-4 rounded-[18px] border border-line px-5 py-4 text-[15.5px] font-medium sm:rounded-[22px] sm:px-6 sm:py-5 sm:text-[17px]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" size={18} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a data-reveal href={site.phoneHref} className="group mt-6 hidden items-center gap-5 rounded-[28px] bg-sun p-7 text-ink lg:flex">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand transition-transform group-hover:scale-110">
              <Icon name="phone" size={24} />
            </span>
            <span>
              <span className="block text-sm text-ink/70">{dict.about.call}</span>
              <span className="block text-2xl font-bold">{site.phone}</span>
              <span className="block text-sm text-ink/70">{dict.top.hours}</span>
            </span>
          </a>
        </div>
        <div data-reveal="right" className="order-first rounded-[24px] border border-line p-6 shadow-card md:rounded-[32px] md:p-10 lg:order-none">
          <LeadForm form={dict.form} lang={lang} source="enroll" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-x py-14 lg:py-20">
          <SectionHeading center tag={dict.steps.tag} a={dict.steps.a} hl={dict.steps.hl} b={dict.steps.b} />
            <StepCards items={dict.steps.items} plain />
        </div>
      </section>
    </>
  );
}
