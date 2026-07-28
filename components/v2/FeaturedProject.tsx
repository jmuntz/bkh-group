import Image from 'next/image';
import Button from '../Button';
import { featuredProject } from '@/lib/site-v2';

export default function FeaturedProjectV2() {
  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-black">
      <div
        className="absolute inset-0 overflow-hidden bg-black [transform:translateZ(0)]"
        data-scroll-scale
        data-scale-from="1.12"
      >
        <div className="absolute inset-0" data-parallax="40">
          <Image
            src={featuredProject.image}
            alt={featuredProject.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25"
      />

      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-[1440px] flex-col justify-end px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
        <p
          data-scroll-in
          className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]"
        >
          Featured project
        </p>
        <h2 data-scroll-in data-reveal-delay="1" className="mt-5 max-w-[16ch] text-white">
          {featuredProject.title}
        </h2>
        <p
          data-scroll-in
          data-reveal-delay="2"
          className="mt-4 text-sm font-light uppercase tracking-[0.18em] text-white/50"
        >
          {featuredProject.location}
        </p>
        <p
          data-scroll-in
          data-reveal-delay="2"
          className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/65"
        >
          {featuredProject.summary}
        </p>
        <div data-scroll-in data-reveal-delay="3" className="mt-12">
          <Button href={featuredProject.href} variant="primary" className="!px-7 !py-3">
            Explore projects
          </Button>
        </div>
      </div>
    </section>
  );
}
