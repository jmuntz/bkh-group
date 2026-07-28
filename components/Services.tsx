import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { services } from '@/lib/site';

export default function Services() {
  return (
    <section id="services" className="bg-[var(--bkh-ink)] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div
          data-scroll-reveal
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent-soft)]">
              What we do
            </p>
            <h2 className="mt-4 max-w-[16ch] text-white">
              One point of contact for the whole structure.
            </h2>
          </div>
          <p className="max-w-md text-[var(--fs-lead)] font-light leading-relaxed text-white/60">
            Our large workforce across many trades lets us provide complete structural packages,
            covering all the system design works required for jumpforms, screens, formwork, concrete
            placement and scaffolding.
          </p>
        </div>
      </div>

      <div className="grid border-t border-white/10 lg:grid-cols-3">
        {services.map((service) => (
          <a
            key={service.id}
            href={service.href}
            data-scroll-reveal
            className="group relative isolate min-h-[420px] overflow-hidden border-b border-white/10 lg:min-h-[560px] lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 transition-opacity duration-500 group-hover:from-black/95" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
              <div>
                <h3 className="text-white">{service.title}</h3>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/65 opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
                  {service.summary}
                </p>
              </div>
              <span className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-[var(--bkh-accent)] group-hover:bg-[var(--bkh-accent)] group-hover:text-white">
                <ArrowUpRight size={18} aria-hidden />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
