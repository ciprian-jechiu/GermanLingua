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
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {/* Fotografia stă în dreapta, textul în stânga, ca să rămână clară și neacoperită. */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-20 w-full overflow-hidden lg:w-[56%]">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === index % images.length ? "opacity-100" : "opacity-0"}`}
          >
            <div className="kenburns h-full w-full bg-cover bg-[position:30%_20%]" style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-ink/75 lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#15161b_0%,rgba(21,22,27,0.45)_22%,rgba(21,22,27,0)_50%)] lg:block" />
      </div>

      <div className="container-x relative pb-44 pt-20 md:pb-56 md:pt-28 lg:pt-36">
        <div ref={textRef} className="max-w-[720px] lg:max-w-[560px] lg:pl-10">
          <p data-hero className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {slide.tag}
          </p>
          <h1 data-hero className="text-[40px] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[60px]">
            {slide.a}
            <span className="hl">{slide.hl}</span>
            {slide.b}
          </h1>
          <p data-hero className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/80">
            {slide.text}
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-4">
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

        <div className="mt-10 flex items-center gap-3 lg:hidden">
          <SliderButton label={hero.prev} icon="arrowLeft" onClick={() => go(-1)} />
          <SliderButton label={hero.next} icon="arrow" onClick={() => go(1)} />
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
      className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:border-brand hover:bg-brand"
    >
      <Icon name={icon} size={19} />
    </button>
  );
}
