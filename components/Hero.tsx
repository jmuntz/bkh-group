'use client';

import Button from './Button';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--bkh-ink)]">
      <div className="absolute inset-0">
        <video
          className="absolute inset-x-0 -top-[50px] h-[calc(100%+100px)] w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-construction.jpg"
          aria-hidden="true"
        >
          <source src="/videos/crown-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <h1 className="animate-fade-up max-w-[10ch] text-white">
          BKH Group
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-[18ch] font-display-thin text-[clamp(1.6rem,3.2vw+0.6rem,3rem)] leading-[1.15] tracking-[-0.03em] text-white/90"
          style={{ animationDelay: '120ms' }}
        >
          {site.tagline}
        </p>
        <p
          className="animate-fade-up mt-7 max-w-lg text-[var(--fs-lead)] font-light leading-relaxed text-white/70"
          style={{ animationDelay: '220ms' }}
        >
          A comprehensive range of structural services including formwork, concreting, scaffold and
          jumpform systems to the tier one construction market.
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: '320ms' }}>
          <Button
            href="#projects"
            variant="primary"
            className="!px-7 !py-3"
          >
            View projects
          </Button>
          <Button
            href="#contact"
            variant="outline"
            className="!border-white/40 !px-7 !py-3 !text-white hover:!border-white hover:!bg-white/10"
          >
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
