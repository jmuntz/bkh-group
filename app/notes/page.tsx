import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import DesignNotesFull from '../../components/design-notes/DesignNotesFull';
import { VERSION_CATALOG } from '@/lib/design-notes';

export const metadata: Metadata = {
  title: 'Design notes | BKH Group concepts',
  description:
    'Brief, rationale, version comparison and next steps for the BKH Group homepage concept mockups.',
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <div className="bkh-theme-v2 min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[820px] items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link
            href="/v1"
            className="inline-flex items-center gap-2 text-sm font-light text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to concepts
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {(Object.keys(VERSION_CATALOG) as Array<keyof typeof VERSION_CATALOG>).map((id, index, arr) => (
              <span key={id} className="inline-flex items-center gap-2">
                <Link href={VERSION_CATALOG[id].href} className="transition-colors hover:text-[var(--bkh-cta)]">
                  {VERSION_CATALOG[id].name}
                </Link>
                {index < arr.length - 1 ? <span aria-hidden>/</span> : null}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-6 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 border-b border-white/10 pb-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--bkh-cta)]">
            Homepage concepts
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">
            Design notes
          </h1>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/55">
            Full brief, rationale, version comparison and next steps for the BKH Group homepage
            mockups.
          </p>
        </header>

        <DesignNotesFull />
      </main>
    </div>
  );
}
