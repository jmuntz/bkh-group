'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DesignNotes from './DesignNotes';
import ColorSchemeToggle from './ColorSchemeToggle';

type PreviewToolbarProps = {
  variant: 'v1' | 'v2';
};

const VERSIONS = [
  { id: 'v1' as const, href: '/v1', label: 'v1', hint: 'WordPress-friendly' },
  { id: 'v2' as const, href: '/v2', label: 'v2', hint: 'Custom Next.js' },
];

export default function PreviewToolbar({ variant }: PreviewToolbarProps) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 sm:bottom-6 sm:right-6">
      <div
        className="flex items-center gap-1 rounded-full border border-white/15 bg-black/80 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
        role="group"
        aria-label="Version switcher"
      >
        {VERSIONS.map((item) => {
          const active = pathname === item.href || variant === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              title={item.hint}
              className={`rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-[background-color,color] duration-300 ${
                active
                  ? 'bg-[var(--bkh-cta)] text-[var(--bkh-cta-ink)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <DesignNotes variant={variant} />
      <ColorSchemeToggle embedded />
    </div>
  );
}
