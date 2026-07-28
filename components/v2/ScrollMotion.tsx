'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { animate, onScroll, stagger, type ScrollObserver } from 'animejs';

type ScrollMotionProps = {
  children: ReactNode;
  className?: string;
};

type Revertible = { revert: () => unknown };

function isVisible(el: HTMLElement) {
  return Number.parseFloat(getComputedStyle(el).opacity) > 0.05;
}

export default function ScrollMotion({ children, className }: ScrollMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      root.querySelectorAll<HTMLElement>('[data-scroll-in]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      root.querySelectorAll<HTMLElement>('[data-scroll-stagger] > *').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      root.querySelectorAll<HTMLElement>('[data-statement-headline], [data-statement-subline]').forEach(
        (el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      );
      return;
    }

    const observers: ScrollObserver[] = [];
    const animations: Revertible[] = [];

    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = Math.min(Number(el.dataset.parallax) || 40, 56);
      const bleed = amount + 40;
      const section = el.closest('section') ?? el.parentElement ?? el;

      el.style.position = 'absolute';
      el.style.left = '0';
      el.style.right = '0';
      el.style.top = `-${bleed}px`;
      el.style.height = `calc(100% + ${bleed * 2}px)`;
      el.style.width = '100%';
      // Keep a constant scale in the transform so subpixel clip seams stay covered
      el.style.transformOrigin = 'center center';

      animations.push(
        animate(el, {
          translateY: [`-${amount}px`, `${amount}px`],
          scale: 1.06,
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: 0.12,
          }),
        })
      );
    });

    root.querySelectorAll<HTMLElement>('[data-scroll-drift]').forEach((el) => {
      const x = Number(el.dataset.driftX) || 0;
      const y = Number(el.dataset.driftY) || -60;
      const section = el.closest('section') ?? el;

      animations.push(
        animate(el, {
          translateX: [0, x],
          translateY: [0, y],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: true,
          }),
        })
      );
    });

    // Mild heading parallax: headings drift against scroll for Built-style depth.
    root.querySelectorAll<HTMLElement>('[data-heading-parallax]').forEach((el) => {
      const amount = Math.min(Math.max(Number(el.dataset.headingParallax) || 28, 12), 56);
      const section = el.closest('section') ?? el;

      el.style.willChange = 'transform';

      animations.push(
        animate(el, {
          translateY: [`${amount * 0.4}px`, `-${amount}px`],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: 0.18,
          }),
        })
      );
    });

    root.querySelectorAll<HTMLElement>('[data-scroll-scale]').forEach((el) => {
      const from = Number(el.dataset.scaleFrom) || 1.14;
      const to = Number(el.dataset.scaleTo) || 1.06;
      const section = el.closest('section') ?? el;

      animations.push(
        animate(el, {
          scale: [from, to],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: 0.12,
          }),
        })
      );
    });

    // Statement blocks: scroll-synced fade from left; subline delayed and offset.
    root.querySelectorAll<HTMLElement>('[data-statement-headline]').forEach((el) => {
      const section = el.closest('section') ?? el;
      el.style.willChange = 'opacity, transform';

      animations.push(
        animate(el, {
          opacity: [0, 1, 0],
          translateX: ['-3rem', '0rem', '3rem'],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: 0.36,
          }),
        })
      );
    });

    root.querySelectorAll<HTMLElement>('[data-statement-subline]').forEach((el) => {
      const section = el.closest('section') ?? el;
      el.style.willChange = 'opacity, transform';

      animations.push(
        animate(el, {
          opacity: [0, 1, 0],
          translateX: ['-4.5rem', '1.25rem', '4rem'],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            sync: 0.52,
          }),
        })
      );
    });

    root.querySelectorAll<HTMLElement>('[data-scroll-in]').forEach((el, index) => {
      const fadeOnly = el.dataset.scrollIn === 'fade';
      el.style.opacity = '0';
      if (!fadeOnly) el.style.translate = '0 56px';

      observers.push(
        onScroll({
          target: el,
          enter: 'bottom-=12% top',
          leave: 'top bottom',
          repeat: true,
          onEnter: () => {
            if (isVisible(el)) return;

            animate(el, {
              opacity: [0, 1],
              ...(fadeOnly ? {} : { translateY: [56, 0] }),
              duration: 1100,
              delay: (Number(el.dataset.revealDelay) || index % 4) * 90,
              ease: 'out(3)',
            });
          },
          onLeaveBackward: () => {
            animate(el, {
              opacity: 0,
              ...(fadeOnly ? {} : { translateY: 56 }),
              duration: 0,
            });
          },
        })
      );
    });

    root.querySelectorAll<HTMLElement>('[data-scroll-stagger]').forEach((container) => {
      const items = Array.from(container.querySelectorAll<HTMLElement>(':scope > *'));
      if (!items.length) return;

      const fadeOnly = container.dataset.scrollStagger === 'fade';

      items.forEach((item) => {
        item.style.opacity = '0';
        if (!fadeOnly) item.style.translate = '0 40px';
      });

      observers.push(
        onScroll({
          target: container,
          enter: 'bottom-=8% top',
          leave: 'top bottom',
          repeat: true,
          onEnter: () => {
            if (items.some(isVisible)) return;

            animate(items, {
              opacity: [0, 1],
              ...(fadeOnly ? {} : { translateY: [40, 0] }),
              duration: 900,
              delay: stagger(120),
              ease: 'out(3)',
            });
          },
          onLeaveBackward: () => {
            animate(items, {
              opacity: 0,
              ...(fadeOnly ? {} : { translateY: 40 }),
              duration: 0,
            });
          },
        })
      );
    });

    return () => {
      observers.forEach((observer) => observer.revert());
      animations.forEach((animation) => animation.revert());
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
