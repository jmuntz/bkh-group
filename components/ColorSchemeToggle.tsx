'use client';

import { useEffect, useState } from 'react';

export type ColorScheme = 'yellow' | 'purple';

const STORAGE_KEY = 'bkh-scheme';
const DEFAULT_SCHEME: ColorScheme = 'yellow';

function applyScheme(scheme: ColorScheme) {
  document.documentElement.dataset.scheme = scheme;
}

function readStoredScheme(): ColorScheme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'yellow' || value === 'purple') return value;
  } catch {
    /* ignore */
  }
  return DEFAULT_SCHEME;
}

type ColorSchemeToggleProps = {
  embedded?: boolean;
};

export default function ColorSchemeToggle({ embedded = false }: ColorSchemeToggleProps) {
  const [scheme, setScheme] = useState<ColorScheme>(DEFAULT_SCHEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readStoredScheme();
    setScheme(next);
    applyScheme(next);
    setReady(true);
  }, []);

  const select = (next: ColorScheme) => {
    setScheme(next);
    applyScheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const buttons = (
    <>
      <SchemeButton
        scheme="yellow"
        label="Switch to yellow scheme"
        active={scheme === 'yellow'}
        className="bg-[#ffd300]"
        onSelect={select}
      />
      <SchemeButton
        scheme="purple"
        label="Switch to purple scheme"
        active={scheme === 'purple'}
        className="bg-[#5c4468]"
        onSelect={select}
      />
    </>
  );

  if (embedded) {
    return (
      <div
        className={`flex items-center gap-3 transition-opacity duration-300 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        role="group"
        aria-label="Colour scheme"
      >
        {buttons}
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 sm:bottom-6 sm:right-6 ${
        ready ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      role="group"
      aria-label="Colour scheme"
    >
      {buttons}
    </div>
  );
}

function SchemeButton({
  scheme,
  label,
  active,
  className,
  onSelect,
}: {
  scheme: ColorScheme;
  label: string;
  active: boolean;
  className: string;
  onSelect: (scheme: ColorScheme) => void;
}) {
  return (
    <div className="group/tip relative">
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        onClick={() => onSelect(scheme)}
        className={`h-11 w-11 rounded-full border-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:scale-105 ${className} ${
          active
            ? 'border-white scale-105 ring-2 ring-white/40'
            : 'border-white/25 hover:border-white/60'
        }`}
      />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}
