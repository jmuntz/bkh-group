import Image from 'next/image';
import Button from '../Button';
import { site } from '@/lib/site-v2';

/** WordPress-portable hero: fixed image, no video or scroll-linked motion. */
export default function HeroV1() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-construction.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/62 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute -right-6 top-[28%] z-[1] select-none font-display text-[clamp(8rem,22vw,18rem)] leading-none tracking-[-0.06em] text-white/[0.06]"
      >
        {site.anniversaryYears}
      </p>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
          Celebrating {site.anniversaryYears} years
        </p>
        <h1 className="mt-5 max-w-[12ch] text-white">BKH Group</h1>
        <p className="mt-8 max-w-[22ch] font-display-thin text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] leading-[1.15] tracking-[-0.03em] text-white/90">
          Vertically integrated structural construction solutions.
        </p>
        <p className="mt-8 max-w-lg text-[var(--fs-lead)] font-light leading-relaxed text-white/65">
          Over thirty years delivering formwork, concrete, scaffold and jumpform packages on
          Australia&rsquo;s most challenging tier one commercial, residential and infrastructure
          projects.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
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
