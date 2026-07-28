import Link from 'next/link';
import {
  BRIEF_POINTS,
  COMMERCIAL_NOTES,
  CONTENT_POINTS,
  ENGAGEMENT_NOTES,
  LIVE_SITE_NOTES,
  THEME_STYLE_INTRO,
  THEME_STYLE_POINTS,
  VERSION_COMPARISON,
  VERSION_NOTES,
} from '@/lib/design-notes';
import {
  DesignNotesBullets,
  DesignNotesSection,
  DesignNotesVersionBlock,
} from './DesignNotesBlocks';

export default function DesignNotesFull() {
  return (
    <div className="space-y-0">
      <DesignNotesSection title="About this mockup">
        <DesignNotesBullets items={ENGAGEMENT_NOTES} />
      </DesignNotesSection>

      <DesignNotesSection title="Brief requirements">
        <DesignNotesBullets items={BRIEF_POINTS} />
      </DesignNotesSection>

      <DesignNotesSection title="Compared to the live site">
        <DesignNotesBullets items={LIVE_SITE_NOTES} tone="muted" />
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
      </DesignNotesSection>

      <DesignNotesSection title="Theme and style">
        <p className="text-sm font-light leading-relaxed text-white/65">{THEME_STYLE_INTRO}</p>
        <div className="mt-4">
          <DesignNotesBullets items={THEME_STYLE_POINTS} tone="accent" />
        </div>
      </DesignNotesSection>

      <DesignNotesSection title="Content structure">
        <DesignNotesBullets items={CONTENT_POINTS} />
      </DesignNotesSection>

      <DesignNotesSection title="Concept comparison">
        <div className="space-y-4">
          {VERSION_COMPARISON.map((item) => (
            <div
              key={item.version}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--bkh-cta)]">
                {item.name} · {item.tier}
              </p>
              <p className="mt-1 text-xs font-light uppercase tracking-[0.12em] text-white/40">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/65">{item.summary}</p>
              <Link
                href={item.href}
                className="mt-3 inline-block text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-white"
              >
                View {item.name}
              </Link>
            </div>
          ))}
        </div>
      </DesignNotesSection>

      <DesignNotesSection title="Next steps and commercial">
        <DesignNotesBullets items={COMMERCIAL_NOTES} tone="muted" />
      </DesignNotesSection>

      {(Object.keys(VERSION_NOTES) as Array<keyof typeof VERSION_NOTES>).map((id) => (
        <DesignNotesSection key={id} title={VERSION_NOTES[id].title}>
          <DesignNotesVersionBlock {...VERSION_NOTES[id]} />
        </DesignNotesSection>
      ))}
    </div>
  );
}
