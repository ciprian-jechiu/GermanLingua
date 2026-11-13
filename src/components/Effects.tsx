"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Efectele globale ale site-ului: derulare lină (Lenis), apariția secțiunilor
 * la derulare ([data-reveal]) și contoarele animate ([data-count]).
 */
export default function Effects() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;

    const lenis = new Lenis({ duration: 1.05, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // La schimbarea paginii (de ex. de la un curs la altul) pornim de sus, nu de unde era derulat.
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.count ?? "0");
      if (reduce) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) runCounter(el);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal], [data-count], .bar-fill").forEach((el) => {
      if (!el.classList.contains("in")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
