import Image from 'next/image';
import Button from './Button';
import { featuredProject } from '@/lib/site';

export default function FeaturedProject() {
  return (
    <section className="relative min-h-[85svh] overflow-hidden bg-[var(--bkh-ink)]">
      <Image
        src={featuredProject.image}
        alt={featuredProject.title}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

      <div
        data-scroll-reveal
        className="relative z-10 mx-auto flex min-h-[85svh] max-w-[1440px] flex-col justify-end px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent-soft)]">
          Featured project
        </p>
        <h2 className="mt-4 max-w-[16ch] text-white">{featuredProject.title}</h2>
        <p className="mt-3 text-sm font-light uppercase tracking-[0.18em] text-white/55">
          {featuredProject.location}
        </p>
        <p className="mt-6 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/70">
          {featuredProject.summary}
        </p>
        <div className="mt-8">
          <Button
            href={featuredProject.href}
            variant="primary"
            className="!px-7 !py-3"
          >
            Explore projects
          </Button>
        </div>
      </div>
    </section>
  );
}
