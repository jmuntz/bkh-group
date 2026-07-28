import Image from 'next/image';
import { hireSystems } from '@/lib/site';

export default function Hire() {
  return (
    <section id="hire" className="relative overflow-hidden bg-[var(--bkh-ink)] text-white">
      <div className="absolute inset-0 opacity-35">
        <Image
          src="/images/hire-systems.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div data-scroll-reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent-soft)]">
            Sales &amp; hire
          </p>
          <h2 className="mt-4 max-w-[16ch] text-white">A large stock of systems ready for hire.</h2>
          <p className="mt-6 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/65">
            We own and work with key suppliers on proven scaffold and shoring systems, with the
            experienced workforce to install them and keep your programme moving.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {hireSystems.map((system, index) => (
            <div
              key={system.title}
              data-scroll-reveal
              data-reveal-delay={String(index)}
              className="relative pt-1"
            >
              <span
                className="mb-5 block h-px w-10 bg-[var(--bkh-accent)]"
                aria-hidden
              />
              <h3 className="text-[clamp(1.4rem,1.4vw+1rem,1.9rem)] text-white">
                {system.title}
              </h3>
              <p className="mt-4 max-w-xs font-light leading-relaxed text-white/60">
                {system.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
