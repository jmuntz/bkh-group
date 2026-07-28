'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { ArrowSquareOut, Note, X } from '@phosphor-icons/react';
import { PANEL_SCOPE, VERSION_NOTES, versionName, type DesignNotesVariant } from '@/lib/design-notes';
import {
  DesignNotesBullets,
  DesignNotesSection,
  DesignNotesVersionBlock,
} from './design-notes/DesignNotesBlocks';

export default function DesignNotes({ variant }: { variant: DesignNotesVariant }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const version = VERSION_NOTES[variant];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <div className="group/tip relative">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="design-notes-panel"
          aria-labelledby={titleId}
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-white/25 bg-black/80 px-4 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[transform,border-color,background-color] duration-300 hover:scale-105 hover:border-white/60 hover:bg-black"
        >
          <Note size={16} aria-hidden />
          Design notes
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-xs font-medium tracking-wide text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
        >
          What&apos;s different in {versionName(variant)}
        </span>
      </div>

      <div
        className={`fixed inset-0 z-[110] transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close design notes"
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />

        <aside
          id="design-notes-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`absolute right-0 top-0 flex h-full w-full max-w-[min(100vw,480px)] flex-col border-l border-white/10 bg-[#0a0a0a] text-white shadow-[-24px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--bkh-cta)]">
                {versionName(variant)} · Homepage concepts
              </p>
              <h2 id={titleId} className="mt-2 text-xl font-light tracking-[-0.02em] text-white">
                Design notes
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close panel"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <DesignNotesSection title="Scope">
              <DesignNotesBullets items={PANEL_SCOPE} />
            </DesignNotesSection>

            <DesignNotesSection title={version.title}>
              <DesignNotesVersionBlock {...version} />
            </DesignNotesSection>
          </div>

          <div className="border-t border-white/10 px-6 py-5">
            <Link
              href="/notes"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-light text-[var(--bkh-cta)] underline underline-offset-4 transition-colors hover:text-white"
            >
              Full brief and rationale
              <ArrowSquareOut size={14} aria-hidden />
            </Link>
            <p className="mt-2 text-xs font-light text-white/40">
              Brief, live site comparison, theme, content structure and commercial notes.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
