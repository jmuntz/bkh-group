'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scroll-reveal]')
    );

    if (!elements.length) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    root.classList.add('scroll-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove('scroll-reveal-ready');
    };
  }, []);

  return null;
}
