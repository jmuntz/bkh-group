import Image from 'next/image';
import { hireSystems } from '@/lib/site-v2';

export default function HireV2() {
  return (
    <section id="hire" className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0" data-parallax="56">
          <Image
            src="/images/hire-systems.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div data-scroll-in className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
            Sales &amp; hire
          </p>
          <h2 className="mt-5 max-w-[16ch] text-white">A large stock of systems ready for hire.</h2>
          <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/55">
            Large stock holdings of proven scaffold and shoring systems, with the experienced
            workforce to install them.
          </p>
        </div>

        <div data-scroll-stagger className="mt-24 grid gap-12 sm:grid-cols-3 sm:gap-14">
          {hireSystems.map((system) => (
            <div key={system.title} className="relative pt-1">
              <span className="mb-6 block h-px w-12 bg-[var(--bkh-cta)]" aria-hidden />
              <h3 className="text-[clamp(1.4rem,1.4vw+1rem,1.9rem)] text-white">{system.title}</h3>
              <p className="mt-5 max-w-xs font-light leading-relaxed text-white/55">{system.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
