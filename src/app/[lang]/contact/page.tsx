import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { PageHero } from "@/components/ui";
import { media, site } from "@/data/site";
import { getDictionary } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { dict } = getDictionary((await params).lang);
  return { title: dict.contactPage.title, description: dict.contactPage.lead };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang, dict } = getDictionary((await params).lang);
  const p = dict.contactPage;
  const cards: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "pin", label: p.address, value: dict.top.address },
    { icon: "phone", label: p.phone, value: site.phone, href: site.phoneHref },
    { icon: "clock", label: p.hours, value: dict.top.hours },
    { icon: "mail", label: p.email, value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={p.title} title={p.title} lead={p.lead} image={media.heroContact} position="center 28%" />

      <section className="container-x py-12 lg:py-24">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div key={card.label} data-reveal data-delay={i + 1} className={`group rounded-[20px] border border-line p-4 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-brand sm:rounded-[28px] sm:p-7 flex items-center gap-4 sm:block`}>
              <span className="blob grid h-11 w-11 shrink-0 place-items-center bg-brand text-white sm:h-14 sm:w-14">
                <Icon name={card.icon} size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0 sm:mt-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-sm">{card.label}</p>
              {card.href ? (
                <a href={card.href} className="mt-1 block break-words text-[15px] font-bold leading-snug hover:text-brand sm:mt-1.5 sm:text-lg">
                  {card.value}
                </a>
              ) : (
                <p className="mt-1 text-[15px] font-bold leading-snug sm:mt-1.5 sm:text-lg">{card.value}</p>
              )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-8">
          <div data-reveal="left" className="rounded-[24px] border border-line p-6 shadow-soft md:rounded-[32px] md:p-10">
            <h2 className="mb-5 text-[24px] font-bold tracking-tight sm:mb-6 sm:text-3xl">{p.formTitle}</h2>
            <LeadForm form={dict.form} lang={lang} source="contact" />
          </div>
          <div data-reveal="right" className="min-h-[320px] overflow-hidden rounded-[24px] border border-line bg-mist md:min-h-[420px] md:rounded-[32px]">
            <iframe src={site.mapEmbed} title={p.address} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[320px] w-full border-0 md:min-h-[420px]" />
          </div>
        </div>
      </section>
    </>
  );
}
