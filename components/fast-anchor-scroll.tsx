'use client';

import { useEffect } from 'react';

const HEADER_OFFSET = 88;
const DURATION_MS = 360;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateScrollTo(targetY: number) {
  const startY = window.scrollY || window.pageYOffset;
  const delta = targetY - startY;
  const startTime = performance.now();

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, startY + delta * eased);

    if (progress < 1) {
      window.requestAnimationFrame(frame);
    }
  }

  window.requestAnimationFrame(frame);
}

export default function FastAnchorScroll() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const url = new URL(href, window.location.href);
      const isSamePage = url.pathname === window.location.pathname && url.origin === window.location.origin;
      if (!isSamePage || !url.hash) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();

      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
      history.pushState(null, '', `#${id}`);
      animateScrollTo(targetY);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}

