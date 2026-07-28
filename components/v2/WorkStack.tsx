'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { onScroll, type ScrollObserver } from 'animejs';
import { workShowcase } from '@/lib/mockups/site-v3';

const items = workShowcase;
const count = items.length;

type LayoutConfig = {
  introStart: number;
  outro: number;
  slideVh: number;
  padVh: number;
};

/** Desktop keeps a full enter/exit beat; mobile trims the empty sticky gaps. */
const LAYOUT_DESKTOP: LayoutConfig = {
  introStart: -1,
  outro: 0.12,
  slideVh: 145,
  padVh: 40,
};

const LAYOUT_MOBILE: LayoutConfig = {
  introStart: -0.28,
  outro: 0.045,
  slideVh: 108,
  padVh: 6,
};

function getLayout(): LayoutConfig {
  if (typeof window === 'undefined') return LAYOUT_DESKTOP;
  return window.matchMedia('(min-width: 1024px)').matches
    ? LAYOUT_DESKTOP
    : LAYOUT_MOBILE;
}

type Point = { x: number; y: number };

/**
 * Image path from latest plotted samples.
 * Off-screen pads keep enter/exit smooth; Catmull-Rom + arc-length sampling
 * avoids the straight-segment look from sparse cubics.
 */
const IMAGE_PATH: Point[] = [
  { x: -4.9, y: 87.5 },
  { x: 2.6, y: 91.1 },
  { x: 6.9, y: 92.3 },
  { x: 12.2, y: 92.8 },
  { x: 16.8, y: 92.5 },
  { x: 23.7, y: 89.9 },
  { x: 29.1, y: 82.4 },
  { x: 32.9, y: 73.7 },
  { x: 35.2, y: 61.6 },
  { x: 36.1, y: 48.7 }, // settle
  { x: 36.6, y: 37.2 },
  { x: 36.9, y: 8.3 },
  { x: 37.1, y: -6.0 },
  { x: 37.1, y: -20.1 },
];

const IMAGE_SETTLE_INDEX = 9;

/**
 * Text path from latest plotted samples.
 * Settle sits mid-path; final point carries exit off the top.
 */
const TEXT_PATH: Point[] = [
  { x: 83.4, y: 83.1 },
  { x: 78.6, y: 82.4 },
  { x: 74.4, y: 80.7 },
  { x: 71.1, y: 76.6 },
  { x: 68.2, y: 71.3 },
  { x: 66.0, y: 65.7 },
  { x: 65.1, y: 58.0 }, // settle
  { x: 65.3, y: -3.4 },
];

const TEXT_SETTLE_INDEX = 6;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function dist(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function buildArcLengths(points: Point[]) {
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    lengths.push(lengths[i - 1] + dist(points[i - 1], points[i]));
  }
  return lengths;
}

const IMAGE_LENGTHS = buildArcLengths(IMAGE_PATH);
const IMAGE_TOTAL_LENGTH = IMAGE_LENGTHS[IMAGE_LENGTHS.length - 1] || 1;
const IMAGE_SETTLE_T = IMAGE_LENGTHS[IMAGE_SETTLE_INDEX] / IMAGE_TOTAL_LENGTH;

const TEXT_LENGTHS = buildArcLengths(TEXT_PATH);
const TEXT_TOTAL_LENGTH = TEXT_LENGTHS[TEXT_LENGTHS.length - 1] || 1;
const TEXT_SETTLE_T = TEXT_LENGTHS[TEXT_SETTLE_INDEX] / TEXT_TOTAL_LENGTH;

/** Uniform Catmull-Rom through four points */
function catmullRom(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

/** Sample a polyline by normalised arc length, then Catmull-Rom within the segment */
function sampleSplineArc(points: Point[], lengths: number[], t: number): Point {
  const total = lengths[lengths.length - 1] || 1;
  const target = clamp(t) * total;

  let i = 1;
  while (i < lengths.length - 1 && lengths[i] < target) i += 1;

  const segStart = lengths[i - 1];
  const segLen = Math.max(lengths[i] - segStart, 0.0001);
  const local = (target - segStart) / segLen;

  const p0 = points[Math.max(0, i - 2)];
  const p1 = points[i - 1];
  const p2 = points[i];
  const p3 = points[Math.min(points.length - 1, i + 1)];

  return catmullRom(p0, p1, p2, p3, local);
}

function sampleImage(offset: number): Point {
  let t: number;
  if (offset >= 0) {
    const enter = easeOutCubic(1 - clamp(offset));
    t = lerp(0, IMAGE_SETTLE_T, enter);
  } else {
    const exit = easeInOutCubic(Math.pow(clamp(-offset), 0.8));
    t = lerp(IMAGE_SETTLE_T, 1, exit);
  }
  return sampleSplineArc(IMAGE_PATH, IMAGE_LENGTHS, t);
}

function sampleText(offset: number): Point {
  let t: number;
  if (offset >= 0) {
    const enter = easeOutCubic(1 - clamp(offset));
    t = lerp(0, TEXT_SETTLE_T, enter);
  } else {
    const exit = easeInOutCubic(Math.pow(clamp(-offset), 0.8));
    t = lerp(TEXT_SETTLE_T, 1, exit);
  }
  return sampleSplineArc(TEXT_PATH, TEXT_LENGTHS, t);
}

function opacityFromOffset(offset: number, role: 'image' | 'text') {
  if (offset > 0.55) return clamp((1 - offset) / 0.45);

  if (offset < 0) {
    if (role === 'text') return clamp(1 + offset / 0.32);
    return clamp(1 + offset);
  }

  return 1;
}

export default function WorkStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layoutRef = useRef<LayoutConfig>(LAYOUT_DESKTOP);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const medias = mediaRefs.current.filter(Boolean) as HTMLDivElement[];
    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

    const syncTrackHeight = () => {
      layoutRef.current = getLayout();
      const { slideVh, padVh } = layoutRef.current;
      track.style.height = `${count * slideVh + padVh}vh`;
    };

    const place = (
      el: HTMLDivElement,
      sample: (offset: number) => Point,
      offset: number,
      role: 'image' | 'text'
    ) => {
      const mapped =
        offset >= 0 ? Math.pow(clamp(offset), 0.9) : -Math.pow(clamp(-offset), 0.92);

      const { x, y } = sample(mapped);
      const opacity = opacityFromOffset(mapped, role);

      el.style.opacity = String(opacity);
      el.style.left = `${x.toFixed(3)}vw`;
      el.style.top = `${y.toFixed(3)}vh`;
      el.style.transform = 'translate3d(-50%, -50%, 0)';
    };

    const apply = (progress: number) => {
      const p = clamp(progress);
      const { introStart, outro } = layoutRef.current;
      const activeEnd = 1 - outro;

      let slide: number;
      if (p >= activeEnd) {
        const exit = clamp((p - activeEnd) / Math.max(outro, 0.0001));
        slide = lerp(count - 1, count, easeOutCubic(exit));
      } else {
        const local = clamp(p / Math.max(activeEnd, 0.0001));
        slide = lerp(introStart, count - 1, local);
      }

      medias.forEach((el, i) => place(el, sampleImage, i - slide, 'image'));
      texts.forEach((el, i) => place(el, sampleText, i - slide, 'text'));
    };

    syncTrackHeight();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const { introStart, outro } = layoutRef.current;
      apply(((0 - introStart) / (count - 1 - introStart)) * (1 - outro));
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

    const mq = window.matchMedia('(min-width: 1024px)');
    const onLayoutChange = () => {
      syncTrackHeight();
      apply(observer.progress);
    };
    mq.addEventListener('change', onLayoutChange);
    window.addEventListener('resize', syncTrackHeight);

    return () => {
      observer.revert();
      mq.removeEventListener('change', onLayoutChange);
      window.removeEventListener('resize', syncTrackHeight);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative mt-10 w-full overflow-x-clip lg:mt-32"
      style={{
        height: `${LAYOUT_DESKTOP.slideVh * count + LAYOUT_DESKTOP.padVh}vh`,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {items.map((item, index) => (
          <div
            key={`media-${item.id}`}
            ref={(node) => {
              mediaRefs.current[index] = node;
            }}
            className="pointer-events-none absolute w-[min(78vw,420px)] will-change-[left,top,opacity] sm:w-[min(52vw,460px)] lg:w-[min(38vw,520px)]"
            style={{
              opacity: 0,
              left: '-4.9vw',
              top: '87.5vh',
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[5/6]">
              <Image
                src={item.image}
                alt={item.project}
                fill
                sizes="(max-width: 1024px) 78vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {items.map((item, index) => (
          <div
            key={`text-${item.id}`}
            ref={(node) => {
              textRefs.current[index] = node;
            }}
            className="pointer-events-none absolute w-[min(86vw,520px)] bg-black p-[25px] will-change-[left,top,opacity] sm:w-[min(56vw,560px)] lg:w-[min(42vw,640px)]"
            style={{
              opacity: 0,
              left: '83.4vw',
              top: '83.1vh',
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
              {item.title}
            </p>
            <h3 className="mt-5 max-w-[14ch] text-[clamp(2rem,3.4vw+1rem,3.75rem)] font-light leading-[1.05] tracking-[-0.04em] text-white">
              {item.project}
            </h3>
            <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/70">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
