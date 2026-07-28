import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { services } from '@/lib/site-v1';

/**
 * WordPress-portable Capabilities: no scroll fade-ins.
 * Hover only changes the arrow - no image scale / parallax.
 */
export default function ServicesV4() {
  return (
    <section id="services" className="bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-24">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
              Capabilities
            </p>
            <h2 className="mt-5 max-w-[16ch] text-white">Packages tailored to the programme.</h2>
          </div>
          <p className="max-w-md text-[var(--fs-lead)] font-light leading-relaxed text-white/55">
            A comprehensive range of structural services that can be packaged around client
            requirements - from formwork and concrete to scaffold, jumpform and system design.
          </p>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="group relative isolate min-h-[460px] overflow-hidden bg-black lg:min-h-[560px]"
            >
              <div className="absolute inset-0 overflow-hidden bg-black">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15"
              />
              <div className="relative z-10 flex h-full min-h-[460px] items-end justify-between gap-4 p-8 sm:p-10 lg:min-h-[560px]">
                <div>
                  <h3 className="text-white">{service.title}</h3>
                  <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/60 sm:text-base">
                    {service.summary}
                  </p>
                </div>
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
