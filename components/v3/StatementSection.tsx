import type { ReactNode } from 'react';

type StatementSectionProps = {
  id?: string;
  headline: ReactNode;
  subline?: string;
  className?: string;
};

export default function StatementSection({
  id,
  headline,
  subline,
  className = '',
}: StatementSectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden bg-black px-5 pt-[50vh] pb-[50vh] sm:px-8 lg:px-12 ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="max-w-5xl">
          <h2
            data-statement-headline
            className="font-display text-[clamp(2.75rem,6vw+1rem,6.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
          >
            {headline}
          </h2>
          {subline ? (
            <p
              data-statement-subline
              className="mt-10 max-w-[28ch] pl-6 font-display text-[clamp(1.35rem,2.2vw+0.5rem,2.25rem)] leading-[1.15] tracking-[-0.03em] text-white/70 sm:mt-12 sm:pl-10"
            >
              {subline}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
