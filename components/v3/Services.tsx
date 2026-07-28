import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { services } from '@/lib/site-v2';

export default function ServicesV3() {
  return (
    <section id="services" className="overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div data-scroll-in className="max-w-4xl">
          <h2
            data-heading-parallax="36"
            className="max-w-[12ch] font-display text-[clamp(3rem,7vw+1rem,6.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
          >
            Capabilities
          </h2>
        </div>

        <div data-scroll-stagger="fade" className="mt-24 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="group relative isolate min-h-[420px] overflow-hidden bg-black lg:min-h-[520px]"
            >
              <div className="absolute inset-0 overflow-hidden bg-black [transform:translateZ(0)]">
                <div className="absolute inset-0" data-parallax="40">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 transition-opacity duration-500 group-hover:from-black"
              />
              <div className="relative z-10 flex h-full min-h-[420px] items-end justify-between gap-4 p-8 sm:p-10 lg:min-h-[520px]">
                <h3 className="font-display text-[clamp(1.75rem,2vw+1rem,2.5rem)] tracking-[-0.03em] text-white">
                  {service.title}
                </h3>
                <span className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-all duration-300 ease-out group-hover:border-[var(--bkh-cta)] group-hover:bg-[var(--bkh-cta)] group-hover:text-[var(--bkh-cta-ink)]">
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
