import Image from 'next/image';
import { hireSystems } from '@/lib/site-v2';

export default function HireV3() {
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
        <div data-scroll-in className="max-w-3xl">
          <h2
            data-heading-parallax="36"
            className="max-w-[10ch] font-display text-[clamp(3rem,7vw+1rem,6.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
          >
            Ready to hire
          </h2>
        </div>

        <div data-scroll-stagger className="mt-24 grid gap-12 sm:grid-cols-3 sm:gap-14">
          {hireSystems.map((system) => (
            <div key={system.title} className="relative pt-1">
              <span className="mb-6 block h-px w-12 bg-[var(--bkh-cta)]" aria-hidden />
              <h3 className="font-display text-[clamp(1.6rem,1.8vw+1rem,2.25rem)] tracking-[-0.03em] text-white">
                {system.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
