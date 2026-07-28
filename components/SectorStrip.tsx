'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export type SectorIconType =
  | 'highrise'
  | 'health'
  | 'stadium'
  | 'infra'
  | 'residential'
  | 'safety';

export type Sector = {
  title: string;
  label: string;
  icon: SectorIconType;
};

const defaultSectors: Sector[] = [
  {
    title: 'High rise',
    label: 'Towers and commercial structures',
    icon: 'highrise',
  },
  {
    title: 'Health',
    label: 'Hospital and precinct works',
    icon: 'health',
  },
  {
    title: 'Stadiums',
    label: 'Major sporting venues',
    icon: 'stadium',
  },
  {
    title: 'Infrastructure',
    label: 'Roads, interchanges and civil packages',
    icon: 'infra',
  },
];

function SectorIcon({ type, active }: { type: SectorIconType; active: boolean }) {
  const common = {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const pathClass = clsx(
    'origin-center transition-[stroke-dashoffset] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    active ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:120]'
  );

  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 text-[var(--bkh-accent)]"
      aria-hidden
    >
      {type === 'highrise' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M8 28V10l8-5 8 5v18"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '120ms' }}
            d="M12 14h2M18 14h2M12 19h2M18 19h2M12 24h2M18 24h2M14 28v-4h4v4"
          />
        </>
      ) : null}
      {type === 'health' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M8 10h16v14H8z"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '140ms' }}
            d="M16 13v8M12 17h8"
          />
        </>
      ) : null}
      {type === 'stadium' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M5 22c3-6 7-9 11-9s8 3 11 9"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '120ms' }}
            d="M7 22h18M9 18h14M11 14.5h10"
          />
        </>
      ) : null}
      {type === 'infra' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M4 20h24M8 20v5M24 20v5"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '120ms' }}
            d="M6 16c4-5 8-7 10-7s6 2 10 7"
          />
        </>
      ) : null}
      {type === 'residential' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M5 15l11-8 11 8v11H5z"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '120ms' }}
            d="M13 26v-7h6v7"
          />
        </>
      ) : null}
      {type === 'safety' ? (
        <>
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120 }}
            d="M16 5l10 4v7c0 6.5-4.4 11.2-10 13-5.6-1.8-10-6.5-10-13V9z"
          />
          <path
            {...common}
            className={pathClass}
            style={{ strokeDasharray: 120, transitionDelay: '140ms' }}
            d="M11.5 16.5l3 3 6-6.5"
          />
        </>
      ) : null}
    </svg>
  );
}

export default function SectorStrip({
  items = defaultSectors,
  className,
}: {
  items?: Sector[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        'mt-12 grid gap-8 border-y border-[var(--bkh-border)] py-10 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((sector, index) => (
        <div
          key={sector.title}
          className={clsx(
            'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          )}
          style={{ transitionDelay: active ? `${index * 110}ms` : '0ms' }}
        >
          <SectorIcon type={sector.icon} active={active} />
          <p className="mt-4 text-sm font-medium tracking-[0.04em] text-[var(--bkh-text-strong)]">
            {sector.title}
          </p>
          <p className="mt-2 text-sm font-light leading-snug text-[var(--bkh-text-muted)]">
            {sector.label}
          </p>
        </div>
      ))}
    </div>
  );
}
