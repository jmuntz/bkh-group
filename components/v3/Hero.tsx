'use client';

import Button from '../Button';
import { site } from '@/lib/site-v2';

export default function HeroV3() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" data-parallax="64">
          <video
            className="absolute inset-0 h-full w-full object-cover object-top"
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
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/62 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <p
        data-scroll-drift
        data-drift-x="40"
        data-drift-y="-120"
        aria-hidden
        className="pointer-events-none absolute -right-6 top-[28%] z-[1] select-none font-display text-[clamp(8rem,22vw,18rem)] leading-none tracking-[-0.06em] text-white/[0.06]"
      >
        {site.anniversaryYears}
      </p>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="animate-fade-up">
          <h1
            className="max-w-[10ch] font-display text-[clamp(3.5rem,8vw+1rem,7.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
            data-heading-parallax="22"
          >
            BKH Group
          </h1>
        </div>
        <div className="animate-fade-up mt-8" style={{ animationDelay: '100ms' }}>
          <p
            className="max-w-[16ch] font-display text-[clamp(1.75rem,3.2vw+0.5rem,3rem)] leading-[1.08] tracking-[-0.04em] text-white"
            data-heading-parallax="32"
          >
            {site.tagline}
          </p>
        </div>
        <div className="animate-fade-up mt-14 flex flex-wrap gap-4" style={{ animationDelay: '200ms' }}>
          <Button href="#projects" variant="primary" className="!px-7 !py-3">
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
