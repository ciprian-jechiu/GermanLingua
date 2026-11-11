import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { CourseCard, CtaBand, PageHero } from "@/components/ui";
import { courses } from "@/data/courses";
import { getDictionary } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/courses">): Promise<Metadata> {
  const { dict } = getDictionary((await params).lang);
  return { title: dict.coursesPage.title, description: dict.coursesPage.lead };
}

export default async function CoursesPage({ params }: PageProps<"/[lang]/courses">) {
  const { lang, dict } = getDictionary((await params).lang);
  const groups = [
    { label: dict.nav.general, list: courses.filter((c) => c.group === "general") },
    { label: dict.nav.specialized, list: courses.filter((c) => c.group === "special") },
  ];

  return (
    <>
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.courses} title={dict.coursesPage.title} lead={dict.coursesPage.lead} />

      <div className="container-x py-20 lg:py-24">
        <p data-reveal className="mb-14 flex items-center gap-4 rounded-[24px] bg-mist px-7 py-5 text-[17px] font-medium">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Icon name="gift" size={21} />
          </span>
          {dict.coursePage.discount}
        </p>

        {groups.map((group) => (
          <section key={group.label} className="mb-20 last:mb-0">
            <h2 data-reveal className="mb-9 flex items-center gap-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="h-10 w-1.5 rounded-full bg-brand" />
              {group.label}
            </h2>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {group.list.map((course, i) => (
                <CourseCard key={course.slug} course={course} lang={lang} dict={dict} delay={(i % 3) + 1} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="pb-24">
        <CtaBand lang={lang} cta={dict.cta} />
      </div>
    </>
  );
}
