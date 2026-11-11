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
    { icon: "mail", label: p.email, value: site.email, href: `mailto:${site.email}` },
    { icon: "clock", label: p.hours, value: dict.top.hours },
  ];

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={p.title} title={p.title} lead={p.lead} image={media.heroContact} position="center 28%" />

      <section className="container-x py-20 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div key={card.label} data-reveal data-delay={i + 1} className="group rounded-[28px] border border-line p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-brand">
              <span className="blob grid h-14 w-14 place-items-center bg-brand text-white">
                <Icon name={card.icon} size={24} />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{card.label}</p>
              {card.href ? (
                <a href={card.href} className="mt-1.5 block break-words text-lg font-bold hover:text-brand">
                  {card.value}
                </a>
              ) : (
                <p className="mt-1.5 text-lg font-bold">{card.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div data-reveal="left" className="rounded-[32px] border border-line p-8 shadow-soft md:p-10">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">{p.formTitle}</h2>
            <LeadForm form={dict.form} lang={lang} source="contact" />
          </div>
          <div data-reveal="right" className="min-h-[420px] overflow-hidden rounded-[32px] border border-line bg-mist">
            <iframe src={site.mapEmbed} title={p.address} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[420px] w-full border-0" />
          </div>
        </div>
      </section>
    </>
  );
}
