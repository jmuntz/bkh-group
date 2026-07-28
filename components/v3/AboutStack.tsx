import WorkStack from '../v2/WorkStack';

export default function AboutStackV3() {
  return (
    <section id="about" className="relative overflow-x-clip bg-black py-28 lg:py-40">
      <p
        data-scroll-drift
        data-drift-x="-80"
        data-drift-y="40"
        aria-hidden
        className="pointer-events-none absolute -left-4 top-16 select-none font-display text-[clamp(7rem,18vw,14rem)] leading-none tracking-[-0.06em] text-white/[0.05] lg:top-24"
      >
        BKH
      </p>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div data-scroll-in className="max-w-4xl">
          <h2
            data-heading-parallax="36"
            className="font-display text-[clamp(3rem,7vw+1rem,6.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
          >
            Stadiums
            <br />
            to towers
          </h2>
        </div>
      </div>

      <div className="relative z-10">
        <WorkStack compact />
      </div>
    </section>
  );
}
