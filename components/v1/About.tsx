import Image from 'next/image';
import { site, workShowcase } from '@/lib/site-v1';

/**
 * WordPress-portable About: static stacked work rows with alternating image sides.
 */
export default function AboutV4() {
  return (
    <section id="about" className="relative bg-black px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
            About BKH
          </p>
          <h2 className="mt-5 text-white">
            {site.anniversaryYears} years as a vertically integrated structural partner.
          </h2>
          <p className="mt-8 max-w-2xl text-[var(--fs-lead)] font-light leading-relaxed text-white/55">
            Strong in-house capability across formwork, concrete and scaffold - delivered on tier one
            commercial, residential and infrastructure programmes Australia-wide.
          </p>
        </div>

        <div className="mt-20 border-t border-white/10 lg:mt-28">
          {workShowcase.map((item, index) => {
            const imageOnRight = index % 2 === 1;

            return (
              <article
                key={item.id}
                className="grid items-center gap-10 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div
                  className={`lg:col-span-5 ${imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black sm:aspect-[5/6]">
                    <Image
                      src={item.image}
                      alt={item.project}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-7 ${imageOnRight ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
                    <span className="mr-3 text-white/35">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </p>
                  <h3 className="mt-5 max-w-[14ch] text-[clamp(2rem,3.4vw+1rem,3.75rem)] font-light leading-[1.05] tracking-[-0.04em] text-white">
                    {item.project}
                  </h3>
                  <p className="mt-8 max-w-xl text-[var(--fs-lead)] font-light leading-relaxed text-white/70">
                    {item.summary}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-24">
          <p className="text-[var(--fs-lead)] font-light leading-relaxed text-white/65">
            BKH Group is a leading structural construction solutions partner with headquarters in NSW
            and QLD. Services can be tailored and packaged around client requirements.
          </p>
          <p className="font-light leading-relaxed text-white/55">
            Safety and quality remain at the centre of every programme we deliver - from stadiums and
            towers to commercial precincts and major civil packages.
          </p>
        </div>
      </div>
    </section>
  );
}
