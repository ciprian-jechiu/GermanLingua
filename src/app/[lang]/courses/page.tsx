import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { CourseCard, CtaBand, PageHero } from "@/components/ui";
import { courses } from "@/data/courses";
import { media } from "@/data/site";
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
      <PageHero lang={lang} home={dict.nav.home} crumb={dict.nav.courses} title={dict.coursesPage.title} lead={dict.coursesPage.lead} image={media.heroCourses} position="center 35%" />

      <div className="container-x py-12 lg:py-24">
        <p data-reveal className="mb-10 flex items-center gap-4 rounded-[20px] bg-mist px-5 py-4 text-[15.5px] font-medium sm:mb-14 sm:rounded-[24px] sm:px-7 sm:py-5 sm:text-[17px]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Icon name="gift" size={21} />
          </span>
          {dict.coursePage.discount}
        </p>

        {groups.map((group) => (
          <section key={group.label} className="mb-12 last:mb-0 sm:mb-20">
            <h2 data-reveal className="mb-6 flex items-center gap-3.5 text-[24px] font-bold tracking-tight sm:mb-9 sm:gap-4 sm:text-4xl">
              <span className="h-8 w-1.5 shrink-0 rounded-full bg-brand sm:h-10" />
              {group.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
              {group.list.map((course, i) => (
                <CourseCard key={course.slug} course={course} lang={lang} dict={dict} delay={(i % 3) + 1} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="pb-16 lg:pb-24">
        <CtaBand lang={lang} cta={dict.cta} />
      </div>
    </>
  );
}
