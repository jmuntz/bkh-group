import SectorStrip from '../../SectorStrip';
import { sectors, site } from '@/lib/site-v2';

export default function AboutV2() {
  return (
    <section id="about" className="relative overflow-hidden bg-black px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <p
        data-scroll-drift
        data-drift-x="-80"
        data-drift-y="40"
        aria-hidden
        className="pointer-events-none absolute -left-4 top-16 select-none font-display text-[clamp(7rem,18vw,14rem)] leading-none tracking-[-0.06em] text-white/[0.05] lg:top-24"
      >
        BKH
      </p>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div data-scroll-in className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
            About BKH
          </p>
          <h2 className="mt-5 text-white">
            {site.anniversaryYears} years as a vertically integrated structural partner.
          </h2>
        </div>

        <div className="mt-14 [&_p.mt-2]:!text-white/45 [&_p.mt-4]:!text-white [&_svg]:!text-[var(--bkh-cta)]">
          <SectorStrip items={sectors} className="!mt-0 border-white/10" />
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-24">
          <p
            data-scroll-in
            className="text-[var(--fs-lead)] font-light leading-relaxed text-white/65"
          >
            BKH Group is a leading structural construction solutions partner with strong in-house
            capability across formwork, steel fixing, concrete and scaffold. We operate Australia-wide,
            with headquarters in NSW and QLD.
          </p>
          <p data-scroll-in data-reveal-delay="1" className="font-light leading-relaxed text-white/55">
            Our services can be tailored and packaged around client requirements for tier one
            commercial, residential and infrastructure developments. Safety and quality remain at the
            centre of every programme we deliver.
          </p>
        </div>
      </div>
    </section>
  );
}
