"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Dict } from "@/i18n/dictionaries/ro";
import { Icon } from "./Icon";

type Props = { hero: Dict["hero"]; images: string[]; enrollHref: string; coursesHref: string };

export default function Hero({ hero, images, enrollHref, coursesHref }: Props) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const count = hero.slides.length;
  const slide = hero.slides[index];

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const timer = setInterval(() => go(1), 8000);
    return () => clearInterval(timer);
  }, [go, index]);

  useEffect(() => {
    if (!textRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 },
      );
    }, textRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <section className="relative isolate overflow-hidden bg-sun text-ink">
      {/* Fotografia stă în dreapta, textul în stânga, ca să rămână clară și neacoperită. */}
      <div aria-hidden className="relative h-[250px] w-full overflow-hidden sm:h-[340px] lg:absolute lg:inset-y-0 lg:right-0 lg:-z-20 lg:h-auto lg:w-[56%]">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === index % images.length ? "opacity-100" : "opacity-0"}`}
          >
            <div className="kenburns h-full w-full bg-cover bg-[position:30%_20%]" style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,210,90,0)_55%,#ffd25a_100%)] lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#ffd25a_0%,rgba(255,210,90,0.55)_20%,rgba(255,210,90,0)_46%)] lg:block" />
      </div>

      <div className="container-x relative pb-36 pt-5 md:pb-56 md:pt-10 lg:pt-36">
        <div ref={textRef} className="max-w-[720px] lg:max-w-[560px] lg:pl-10">
          <p data-hero className="mb-3 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand sm:mb-5 sm:text-sm">
            <span className="h-px w-10 bg-brand" />
            {slide.tag}
          </p>
          <h1 data-hero className="text-[33px] font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-[60px]">
            {slide.a}
            <span className="hl">{slide.hl}</span>
            {slide.b}
          </h1>
          <p data-hero className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-ink/80 sm:mt-6 sm:text-lg">
            {slide.text}
          </p>
          <div data-hero className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4">
            <Link href={enrollHref} className="btn btn-brand">
              {hero.primary}
              <Icon name="arrow" size={18} />
            </Link>
            <Link href={coursesHref} className="btn btn-light">
              {hero.secondary}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-6 flex gap-2 lg:hidden" aria-hidden>
          {hero.slides.map((s, i) => (
            <span key={s.tag} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-brand" : "w-3 bg-ink/25"}`} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-5 top-1/2 hidden -translate-y-[90%] justify-between lg:flex">
        <SliderButton label={hero.prev} icon="arrowLeft" onClick={() => go(-1)} />
        <SliderButton label={hero.next} icon="arrow" onClick={() => go(1)} />
      </div>
    </section>
  );
}

function SliderButton({ label, icon, onClick }: { label: string; icon: "arrow" | "arrowLeft"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-white/85 text-ink backdrop-blur transition-colors hover:border-brand hover:bg-brand hover:text-white"
    >
      <Icon name={icon} size={19} />
    </button>
  );
}
