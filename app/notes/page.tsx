import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import DesignNotesFull from '../../components/design-notes/DesignNotesFull';

export const metadata: Metadata = {
  title: 'Design notes | BKH Group concept',
  description:
    'Brief, rationale and next steps for the BKH Group homepage concept mockup.',
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <div className="bkh-theme-v2 min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[820px] items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-light text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to concept
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-6 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 border-b border-white/10 pb-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--bkh-cta)]">
            Homepage concept
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">
            Design notes
          </h1>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/55">
            Full brief, rationale and next steps for the BKH Group homepage mockup.
          </p>
        </header>

        <DesignNotesFull />
      </main>
    </div>
  );
}
