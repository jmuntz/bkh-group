import type { ReactNode } from 'react';

type BulletTone = 'cta' | 'muted' | 'accent';

export function DesignNotesSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8 border-b border-white/8 pb-8 last:mb-0 last:border-b-0 last:pb-0">
      <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">{title}</h3>
      {children}
    </section>
  );
}

export function DesignNotesBullets({
  items,
  tone = 'cta',
}: {
  items: string[];
  tone?: BulletTone;
}) {
  const dotClass =
    tone === 'muted'
      ? 'bg-white/35'
      : tone === 'accent'
        ? 'bg-[var(--bkh-accent-soft)]'
        : 'bg-[var(--bkh-cta)]';

  return (
    <ul className="space-y-3 text-sm font-light leading-relaxed text-white/65">
      {items.map((point) => (
        <li key={point} className="flex gap-3">
          <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dotClass}`} aria-hidden />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

export function DesignNotesVersionBlock({
  title,
  intro,
  changes,
  outcomes,
}: {
  title: string;
  intro: string;
  changes: string[];
  outcomes: string[];
}) {
  return (
    <>
      <p className="text-sm font-light leading-relaxed text-white/65">{intro}</p>
      <DesignNotesBullets items={changes} />
      <p className="mt-6 text-sm font-light italic text-white/50">In practice, that means:</p>
      <div className="mt-4">
        <DesignNotesBullets items={outcomes} />
      </div>
    </>
  );
}
