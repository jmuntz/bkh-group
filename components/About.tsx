import SectorStrip from './SectorStrip';

export default function About() {
  return (
    <section
      id="about"
      className="bg-[var(--bkh-surface)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <div data-scroll-reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent)]">
            About BKH
          </p>
          <h2 className="mt-4 text-[var(--bkh-text-strong)]">
            Our vision is to innovate in order to grow.
          </h2>
        </div>

        <SectorStrip />

        <div data-scroll-reveal className="mt-12 grid gap-10 lg:grid-cols-2">
          <p className="text-[var(--fs-lead)] font-light leading-relaxed text-[var(--bkh-text-body)]">
            Started in 1996, BKH Group is a specialist in formwork, concrete placements and scaffolding
            for the commercial, industrial, civil engineering, mining and residential sectors.
          </p>
          <p className="font-light leading-relaxed text-[var(--bkh-text-body)]">
            Our one stop shop approach means we can provide all the necessary trade expertise in-house,
            covering formwork, steel fixing, concrete and scaffold. Success must always be underpinned
            by safety.
          </p>
        </div>
      </div>
    </section>
  );
}
