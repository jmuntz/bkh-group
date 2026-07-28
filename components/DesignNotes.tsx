'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { Note, X } from '@phosphor-icons/react';

type DesignNotesVariant = 'v1' | 'v2';

const BRIEF_POINTS = [
  'Position BKH as a leading vertically integrated structural construction solutions partner.',
  'Speak to tier one commercial, residential and infrastructure work.',
  'Emphasise safety, quality and long-standing experience on major construction programmes.',
  'Show strong in-house capability and Australia-wide delivery from NSW and QLD headquarters.',
  'Present services as tailored packages rather than long text blocks.',
  'Lead with projects and capabilities, bold imagery and skim-able copy.',
];

const LIVE_SITE_NOTES = [
  'The current site at bkhgroup.com.au is service-led with deep navigation into Formwork, Concrete, Scaffold and Sales & Hire.',
  'Copy is informative but text-heavy compared to the brief direction toward imagery and skim-able sections.',
  'Project presentation is functional; the brief asks for a stronger portfolio focus similar to references like Built.',
  'Social links, contact details and tier one positioning are present but could be surfaced more confidently on the homepage.',
];

const THEME_STYLE_POINTS = [
  'Dark base with brand purple (#5C4468) and accent yellow (#FFD300) - stakeholders did not want excessive white space.',
  'Large-format photography and video to lead each section rather than dense paragraphs.',
  'Light, confident typography with short headlines and supporting copy kept to a skim-able length.',
  'Portfolio-first layout rhythm: hero, capabilities, featured project, work types, project gallery, hire systems, contact.',
  'CTA yellow used sparingly for buttons, labels and key highlights so it stays impactful.',
  'Reference direction aligns with Built-style presentation: bold visuals, minimal clutter, strong project credibility.',
];

const CONTENT_POINTS = [
  'Same core messaging across both versions: vertically integrated partner, tier one sectors, safety and quality, in-house capability.',
  'Hero introduces the brand with a clear enquiry path and phone number visible early.',
  'Services/capabilities cover Formwork, Concrete and Scaffold as visual cards rather than long service pages on the homepage.',
  'Featured project anchors credibility with a flagship build (R1 Tower, One Sydney Harbour).',
  'About/work types explain sector experience across stadiums, residential towers, commercial and infrastructure.',
  'Projects gallery surfaces a wider cross-section of work beyond the featured project.',
  'Sales & Hire and contact close the page with systems, enquiry form and direct contact details.',
];

const ENGAGEMENT_NOTES = [
  'This is a look and feel mockup - not a full or final design. Layout, typography, colour and homepage rhythm are the focus.',
  'Additional pages (services, projects, Sales & Hire, contact and project templates) will be designed to match once this direction is approved.',
  'Feedback is welcome. Further refinement is part of the design milestone that follows this pre-design alignment phase.',
  'Copy and imagery are draft assets aligned to the brief. Final content, photography and approvals happen during design and build.',
  'Preview controls on this site (version switch, colour scheme, design notes) are for presentation only and will not appear on the live site.',
];

const COMMERCIAL_NOTES = [
  'v1 and v2 share the same theme and content. Use the version switch to compare a WordPress-friendly build against a custom Next.js build with richer interaction.',
  'v1 suits straightforward WordPress delivery - static sections, reusable templates and easier long-term maintenance.',
  'v2 suits a hosted custom build where motion, video and scroll behaviour are a priority.',
  'Only the homepage is in scope here. Remaining pages and templates are quoted once the direction is signed off.',
];

const V2_CHANGES = [
  'Looping hero video and scroll-triggered section reveals add energy without changing the copy.',
  'Floating navigation pill on scroll replaces the solid bar for a premium feel.',
  'Mobile menu uses animated open/close, a smooth full-screen overlay and staggered link reveals - v1 keeps instant toggling for simpler WordPress delivery.',
  'About/work types use a sticky viewport with choreographed image and copy paths instead of static alternating rows.',
  'Projects run as an autoscrolling carousel with hover pause rather than a static grid.',
  'Service cards include richer hover motion and layered imagery.',
];

const V2_OUTCOMES = [
  'Motion, transitions and scroll rhythm create a more refined experience that strengthens first impression and credibility with tier one clients - without adding more copy.',
  'Clearer differentiation from the current live site while keeping the same content and brand system.',
  'Closer alignment with the brief direction toward subtle animation and a portfolio-led reference style.',
];

export default function DesignNotes({ variant }: { variant: DesignNotesVariant }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const isV2 = variant === 'v2';

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
          Brief and rationale
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
          className={`absolute right-0 top-0 flex h-full w-full max-w-[min(100vw,640px)] flex-col border-l border-white/10 bg-[#0a0a0a] text-white shadow-[-24px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--bkh-cta)]">
                Homepage concepts
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
            <Section title="About this mockup">
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
                {ENGAGEMENT_NOTES.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-cta)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Brief requirements">
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
                {BRIEF_POINTS.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-cta)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Compared to the live site">
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
                {LIVE_SITE_NOTES.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/45">
                Reference:{' '}
                <a
                  href="https://www.bkhgroup.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--bkh-cta)] underline underline-offset-4 hover:text-white"
                >
                  bkhgroup.com.au
                </a>
              </p>
            </Section>

            <Section title="Theme and style">
              <p className="text-sm font-light leading-relaxed text-white/65">
                v1 and v2 share the same visual direction. The difference is how much motion and interaction
                is layered on top of this foundation.
              </p>
              <ul className="mt-4 space-y-3 text-sm font-light leading-relaxed text-white/65">
                {THEME_STYLE_POINTS.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-accent-soft)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Content structure">
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
                {CONTENT_POINTS.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-cta)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Next steps and commercial">
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
                {COMMERCIAL_NOTES.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {isV2 ? (
              <Section title="V2 enhancements">
                <p className="text-sm font-light leading-relaxed text-white/65">
                  v2 uses the same theme, content and section structure as v1. The enhancements below are
                  interaction and presentation upgrades on top of that shared foundation.
                </p>
                <ul className="mt-5 space-y-3 text-sm font-light leading-relaxed text-white/65">
                  {V2_CHANGES.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-cta)]"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm font-light italic text-white/50">In practice, that means:</p>
                <ul className="mt-4 space-y-3 text-sm font-light leading-relaxed text-white/65">
                  {V2_OUTCOMES.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--bkh-cta)]"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8 border-b border-white/8 pb-8 last:mb-0 last:border-b-0 last:pb-0">
      <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">{title}</h3>
      {children}
    </section>
  );
}
