import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "../globals.css";
import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import { courses } from "@/data/courses";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang, dict } = getDictionary((await params).lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://germanlingua.md"),
    title: { default: dict.meta.title, template: "%s — GermanLingua" },
    description: dict.meta.description,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
    openGraph: { title: dict.meta.title, description: dict.meta.description, locale: lang, type: "website" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang, dict } = getDictionary((await params).lang);
  const titles = Object.fromEntries(courses.map((c) => [c.slug, dict.courses[c.slug].title]));

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.bar-fill{width:var(--w)!important}`}</style>
        </noscript>
        <TopBar top={dict.top} />
        <Header lang={lang} nav={dict.nav} titles={titles} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <Effects />
      </body>
    </html>
  );
}
