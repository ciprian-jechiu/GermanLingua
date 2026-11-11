import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { PageHero, SectionHeading } from "@/components/ui";
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

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <ul className="space-y-4">
            {dict.form.bullets.map((b, i) => (
              <li key={b} data-reveal data-delay={i + 1} className="flex items-center gap-4 rounded-[22px] border border-line px-6 py-5 text-[17px] font-medium">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" size={18} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a data-reveal href={site.phoneHref} className="group mt-8 flex items-center gap-5 rounded-[28px] bg-ink p-7 text-white">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand transition-transform group-hover:scale-110">
              <Icon name="phone" size={24} />
            </span>
            <span>
              <span className="block text-sm text-white/65">{dict.about.call}</span>
              <span className="block text-2xl font-bold">{site.phone}</span>
              <span className="block text-sm text-white/65">{dict.top.hours}</span>
            </span>
          </a>
        </div>
        <div data-reveal="right" className="rounded-[32px] border border-line p-8 shadow-card md:p-10">
          <LeadForm form={dict.form} lang={lang} source="enroll" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-x py-20">
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
    </>
  );
}
