import type { Dict } from "@/i18n/dictionaries/ro";

export type CourseSlug =
  | "a1"
  | "a2"
  | "b1"
  | "b2"
  | "c1"
  | "online"
  | "group"
  | "individual"
  | "exams"
  | "medical"
  | "business";

export type Course = {
  slug: CourseSlug;
  group: "general" | "special";
  /** Textul mare de pe coperta cardului. */
  badge: string;
  /** module = nivel complet în grup; individual = lecții 1:1; business = companii. */
  kind: "module" | "individual" | "business";
  semi?: boolean;
  minLessons?: boolean;
};

export const courses: Course[] = [
  { slug: "a1", group: "general", badge: "A1", kind: "module" },
  { slug: "a2", group: "general", badge: "A2", kind: "module" },
  { slug: "b1", group: "general", badge: "B1", kind: "module" },
  { slug: "b2", group: "general", badge: "B2", kind: "module" },
  { slug: "c1", group: "general", badge: "C1", kind: "module" },
  { slug: "online", group: "general", badge: "Zoom", kind: "module" },
  { slug: "group", group: "general", badge: "5–7", kind: "module" },
  { slug: "individual", group: "special", badge: "1:1", kind: "individual", semi: true, minLessons: true },
  { slug: "exams", group: "special", badge: "Test", kind: "individual" },
  { slug: "medical", group: "special", badge: "Med", kind: "individual", minLessons: true },
  { slug: "business", group: "special", badge: "B2B", kind: "business" },
];

export const PRICE = { module: 4500, lesson60: 350, lesson90: 450, semi90: 600 };

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

const mdl = (n: number) => `${n.toLocaleString("ro-RO").replace(".", " ")} MDL`;

/** Cele două informații scurte de pe cardul unui curs. */
export function cardMeta(course: Course, l: Dict["labels"]): [string, string] {
  if (course.kind === "module") return [`30 ${l.lessons}`, mdl(PRICE.module)];
  if (course.kind === "individual") return ["60 / 90 min", `${l.from} ${mdl(PRICE.lesson60)}`];
  return [`${l.upTo} 12 ${l.students}`, l.onRequest];
}

/** Tabelul „Detalii curs” de pe pagina unui curs. */
export function courseFacts(course: Course, l: Dict["labels"]): { label: string; value: string }[] {
  if (course.kind === "module") {
    return [
      { label: l.duration, value: `10 ${l.weeks}` },
      { label: l.lessonCount, value: `30 ${l.lessons}` },
      { label: l.lessonLength, value: "90 min" },
      { label: l.frequency, value: `3 ${l.perWeek}` },
      { label: l.groupSize, value: `5–7 ${l.students}` },
      { label: l.format, value: l.onlineOffline },
      { label: l.price, value: `${mdl(PRICE.module)} ${l.perPerson}` },
    ];
  }
  if (course.kind === "individual") {
    const rows = [
      { label: l.duration, value: course.minLessons ? `${l.individualSet}, ${l.minLessons}` : l.individualSet },
      { label: l.lessonLength, value: `60 ${l.or} 90 min` },
      { label: l.frequency, value: l.individualSet },
      { label: l.groupSize, value: course.semi ? `1 (${l.indiv}) / 2 (${l.semi})` : `1 (${l.indiv})` },
      { label: l.format, value: l.onlineOffline },
      { label: l.price, value: `${mdl(PRICE.lesson60)} / 60 min · ${mdl(PRICE.lesson90)} / 90 min` },
    ];
    if (course.semi) rows.push({ label: `${l.price} (${l.semi})`, value: `${mdl(PRICE.semi90)} / 90 min` });
    return rows;
  }
  return [
    { label: l.duration, value: l.individualSet },
    { label: l.lessonLength, value: "90 min" },
    { label: l.frequency, value: l.individualSet },
    { label: l.groupSize, value: `${l.upTo} 12 ${l.students}` },
    { label: l.format, value: l.onlineOffline },
    { label: l.price, value: l.onRequest },
  ];
}
