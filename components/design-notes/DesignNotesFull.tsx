import {
  BRIEF_POINTS,
  COMMERCIAL_NOTES,
  CONTENT_POINTS,
  ENGAGEMENT_NOTES,
  FUTURE_PHASE_NOTES,
  LIVE_SITE_NOTES,
  THEME_STYLE_INTRO,
  THEME_STYLE_POINTS,
} from '@/lib/design-notes';
import { DesignNotesBullets, DesignNotesSection } from './DesignNotesBlocks';

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

      <DesignNotesSection title="Next steps and commercial">
        <DesignNotesBullets items={COMMERCIAL_NOTES} tone="muted" />
      </DesignNotesSection>

      <DesignNotesSection title="Optional future phase">
        <p className="mb-4 text-sm font-light leading-relaxed text-white/65">
          Motion and interaction can follow as a later enhancement on the same look and feel -
          after Base is approved and live.
        </p>
        <DesignNotesBullets items={FUTURE_PHASE_NOTES} />
      </DesignNotesSection>
    </div>
  );
}
