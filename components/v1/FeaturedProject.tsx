import Image from 'next/image';
import Button from '../Button';
import { featuredProject } from '@/lib/site-v1';

/**
 * WordPress-portable featured band: static full-bleed image + copy.
 */
export default function FeaturedProjectV4() {
  return (
    <section className="relative min-h-[85svh] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black">
        <Image
          src={featuredProject.image}
          alt={featuredProject.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"
      />

      <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-[1440px] flex-col justify-end px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
          Featured project
        </p>
        <h2 className="mt-5 max-w-[16ch] text-white">{featuredProject.title}</h2>
        <p className="mt-4 text-sm font-light uppercase tracking-[0.18em] text-white/50">
          {featuredProject.location}
        </p>
        <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/65">
          {featuredProject.summary}
        </p>
        <div className="mt-12">
          <Button href="#projects" variant="primary" className="!px-7 !py-3">
            Explore projects
          </Button>
        </div>
      </div>
    </section>
  );
}
