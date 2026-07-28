'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { onScroll, type ScrollObserver } from 'animejs';
import { workShowcase } from '@/lib/mockups/site-v3';

const items = workShowcase;
const count = items.length;
/** Scroll progress spent bringing the first slide up from the bottom */
const INTRO = 0.12;
/** Ease the frame (and last copy) out before sticky releases */
const OUTRO = 0.22;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

/**
 * Wipe i → i+1 starts when label i hits the image top,
 * and finishes when label i+1 hits the image bottom.
 */
function imageSlideFromLabels(media: HTMLElement, labels: HTMLElement[]) {
  const box = media.getBoundingClientRect();
  const tops = labels.map((label) => label.getBoundingClientRect().top);

  if (tops[0] > box.top) return 0;

  for (let i = 0; i < count - 1; i++) {
    const curTop = tops[i];
    const nextTop = tops[i + 1];

    // Current label still below image top - stay on this image
    if (curTop > box.top) return i;

    // Next label still below image bottom - wipe in progress
    if (nextTop > box.bottom) {
      const pastStart = box.top - curTop;
      const untilEnd = nextTop - box.bottom;
      const t = clamp(pastStart / Math.max(pastStart + untilEnd, 1));
      return i + easeOutCubic(t);
    }

    // Next label has reached image bottom - this wipe is done; check further
  }

  return count - 1;
}

export default function WorkStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageStripRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const media = mediaRef.current;
    const imageStrip = imageStripRef.current;
    const frame = frameRef.current;
    if (!track || !media || !imageStrip || !frame) return;

    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
    const labels = texts
      .map((el) => el.querySelector<HTMLElement>('[data-work-label]'))
      .filter(Boolean) as HTMLElement[];

    const setFrame = (opacity: number, y: number, scale = 1) => {
      frame.style.opacity = String(opacity);
      frame.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    };

    const setImageSlide = (slide: number) => {
      imageStrip.style.transform = `translate3d(0, ${(-(slide / count) * 100).toFixed(4)}%, 0)`;
    };

    const apply = (progress: number) => {
      const p = clamp(progress);
      const vh = window.innerHeight;
      const activeEnd = 1 - OUTRO;

      // Enter: frame rises in with the first text - hold first image
      if (p <= INTRO) {
        const t = p / INTRO;
        const ease = easeOutCubic(t);

        setFrame(ease, (1 - ease) * vh * 0.28, 0.94 + ease * 0.06);
        setImageSlide(0);

        texts.forEach((el, i) => {
          if (i === 0) {
            el.style.opacity = String(ease);
            el.style.transform = `translate3d(0, ${(1 - ease) * vh}px, 0)`;
          } else {
            el.style.opacity = '0';
            el.style.transform = `translate3d(0, ${vh}px, 0)`;
          }
        });
        return;
      }

      // Exit: frame + last copy float up and out before sticky unpins
      if (p >= activeEnd) {
        const exit = clamp((p - activeEnd) / OUTRO);
        const ease = easeInCubic(exit);

        setFrame(1 - ease, -ease * vh * 0.42, 1 - ease * 0.04);
        setImageSlide(count - 1);

        texts.forEach((el, i) => {
          if (i === count - 1) {
            el.style.opacity = String(1 - ease);
            el.style.transform = `translate3d(0, ${(-ease * vh).toFixed(2)}px, 0)`;
          } else {
            el.style.opacity = '0';
            el.style.transform = `translate3d(0, ${-vh}px, 0)`;
          }
        });
        return;
      }

      // Middle: position copy first, then sync image wipe to label vs image edges
      const local = clamp((p - INTRO) / (activeEnd - INTRO));
      const textSlide = local * (count - 1);
      const driftY = -local * 36;

      setFrame(1, driftY, 1);

      texts.forEach((el, i) => {
        const offset = i - textSlide;
        const y = offset * vh + driftY;
        const opacity = clamp(1.2 - Math.abs(offset));
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });

      setImageSlide(imageSlideFromLabels(media, labels));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(INTRO);
      return;
    }

    apply(0);

    const observer: ScrollObserver = onScroll({
      target: track,
      sync: true,
      onUpdate: (self) => {
        apply(self.progress);
      },
    });

    return () => {
      observer.revert();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative mt-24 lg:mt-32"
      style={{ height: `${count * 130 + 50}vh` }}
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <div className="grid h-full items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              ref={frameRef}
              className="origin-center will-change-transform overflow-hidden bg-black"
              style={{ opacity: 0, transform: 'translate3d(0, 28vh, 0) scale(0.94)' }}
            >
              <div
                ref={mediaRef}
                className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6]"
              >
                <div
                  ref={imageStripRef}
                  className="absolute inset-x-0 top-0 w-full will-change-transform"
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-[4/5] w-full sm:aspect-[5/6]"
                    >
                      <Image
                        src={item.image}
                        alt={item.project}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none invisible hidden lg:col-span-7 lg:block" aria-hidden>
            <p className="text-xs font-medium uppercase tracking-[0.28em]">{items[0].title}</p>
            <h3 className="mt-5 max-w-[14ch] text-[clamp(2rem,3.4vw+1rem,3.75rem)] font-light leading-[1.05] tracking-[-0.04em]">
              {items[0].project}
            </h3>
            <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed">
              {items[0].summary}
            </p>
          </div>
        </div>

        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(node) => {
              textRefs.current[index] = node;
            }}
            className="pointer-events-none absolute inset-0 flex items-end pb-16 will-change-transform lg:items-center lg:pb-0"
            style={{
              opacity: 0,
              transform: 'translate3d(0, 100vh, 0)',
            }}
          >
            <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="hidden lg:col-span-5 lg:block" aria-hidden />
              <div className="lg:col-span-7">
                <p
                  data-work-label
                  className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]"
                >
                  {item.title}
                </p>
                <h3 className="mt-5 max-w-[14ch] text-[clamp(2rem,3.4vw+1rem,3.75rem)] font-light leading-[1.05] tracking-[-0.04em] text-white">
                  {item.project}
                </h3>
                <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/70">
                  {item.summary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
