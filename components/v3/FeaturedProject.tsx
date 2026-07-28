import Image from 'next/image';
import Button from '../Button';
import { featuredProject } from '@/lib/site-v2';

export default function FeaturedProjectV3() {
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
        <div data-scroll-in>
          <h2
            data-heading-parallax="40"
            className="max-w-[12ch] font-display text-[clamp(2.75rem,6vw+1rem,5.25rem)] leading-[0.95] tracking-[-0.05em] text-white"
          >
            {featuredProject.title}
          </h2>
        </div>
        <p
          data-scroll-in
          data-reveal-delay="1"
          className="mt-5 text-sm font-light uppercase tracking-[0.18em] text-white/50"
        >
          {featuredProject.location}
        </p>
        <div data-scroll-in data-reveal-delay="2" className="mt-12">
          <Button href={featuredProject.href} variant="primary" className="!px-7 !py-3">
            Explore projects
          </Button>
        </div>
      </div>
    </section>
  );
}
