import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { CourseCard, PageHero } from "@/components/ui";
import { courseFacts, courses, getCourse } from "@/data/courses";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((lang) => courses.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/courses/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const { dict } = getDictionary(lang);
  const course = getCourse(slug);
  if (!course) return {};
  const c = dict.courses[course.slug];
  return { title: c.title, description: c.short };
}

export default async function CoursePage({ params }: PageProps<"/[lang]/courses/[slug]">) {
  const { lang: rawLang, slug } = await params;
  const { lang, dict } = getDictionary(rawLang);
  const course = getCourse(slug);
  if (!course) notFound();

  const c = dict.courses[course.slug];
  const facts = courseFacts(course, dict.labels);
  const others = courses.filter((x) => x.slug !== course.slug && x.group === course.group).slice(0, 3);

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.courses} title={c.title} lead={c.level} />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_420px] lg:gap-16 lg:py-24">
        <div>
          <p data-reveal className="text-[18px] leading-relaxed text-ink sm:text-[22px]">
            {c.intro}
          </p>

          <h2 data-reveal className="mb-5 mt-10 text-[24px] font-bold tracking-tight sm:mb-6 sm:mt-14 sm:text-3xl">
            {dict.coursePage.offers}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {c.learn.map((item, i) => (
              <li key={item} data-reveal data-delay={(i % 2) + 1} className="flex gap-4 rounded-[18px] border border-line p-4 text-[15.5px] leading-relaxed sm:rounded-[22px] sm:p-5 sm:text-[16px]">
                <span className="outline-num shrink-0 text-3xl">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 data-reveal className="mb-5 mt-10 text-[24px] font-bold tracking-tight sm:mb-6 sm:mt-14 sm:text-3xl">
            {dict.coursePage.forWho}
          </h2>
          <ul className="space-y-3.5">
            {c.forWho.map((item) => (
              <li key={item} data-reveal className="flex items-start gap-3.5 text-[16px] sm:gap-4 sm:text-[17px]">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" size={16} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 rounded-[22px] bg-mist p-6 sm:mt-14 sm:rounded-[28px] sm:p-8">
            <h2 className="text-[21px] font-bold sm:text-2xl">{dict.coursePage.included}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {dict.coursePage.includedItems.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium">
                  <Icon name={(["book", "award", "gift"] as const)[i]} size={22} className="shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            {course.kind === "module" && <p className="mt-6 border-t border-line pt-5 text-[15px] text-muted">{dict.coursePage.discount}</p>}
          </div>
        </div>

        <aside className="space-y-5 sm:space-y-7 lg:sticky lg:top-28 lg:self-start">
          <div data-reveal="right" className="overflow-hidden rounded-[28px] border border-line bg-white text-ink shadow-card">
            <h2 className="bg-brand px-6 py-4 text-lg font-bold text-white sm:px-7 sm:py-5 sm:text-xl">{dict.coursePage.facts}</h2>
            <dl className="divide-y divide-line px-6 sm:px-7">
              {facts.map((fact) => (
                <div key={fact.label} className="py-3.5 sm:flex sm:items-baseline sm:justify-between sm:gap-5 sm:py-4">
                  <dt className="text-[13px] text-muted sm:text-sm">{fact.label}</dt>
                  <dd className="mt-0.5 text-[15px] font-semibold sm:mt-0 sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal="right" data-delay="1" className="rounded-[24px] border border-line p-6 shadow-soft sm:rounded-[28px] sm:p-7">
            <h2 className="text-xl font-bold">{dict.form.title}</h2>
            <p className="mb-5 mt-2 text-[15px] text-muted">{dict.form.subtitle}</p>
            <LeadForm form={dict.form} lang={lang} source="course" course={course.slug} />
          </div>
        </aside>
      </div>

      <section className="bg-mist">
        <div className="container-x py-14 lg:py-20">
          <h2 data-reveal className="mb-6 text-[24px] font-bold tracking-tight sm:mb-9 sm:text-3xl">
            {dict.coursePage.other}
          </h2>
          <div className="snap-row sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <CourseCard key={other.slug} course={other} lang={lang} dict={dict} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
