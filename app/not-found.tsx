import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Page unavailable | BKH Group',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bkh-ink)] px-5 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col py-8">
        <a href="/" className="inline-flex w-fit items-center" aria-label="BKH Group home">
          <Image
            src="/bkh-logo.png"
            alt="BKH Group"
            width={200}
            height={84}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </a>

        <div className="flex flex-1 flex-col justify-center py-24">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
            BKH Group
          </p>
          <h1 className="mt-5 max-w-[12ch] text-white">Page unavailable</h1>
          <p className="mt-6 max-w-md text-[var(--fs-lead)] font-light leading-relaxed text-white/60">
            This page isn&rsquo;t available right now. Head back to the homepage to keep browsing.
          </p>
          <div className="mt-10">
            <Button href="/" variant="primary" className="!px-7 !py-3">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
