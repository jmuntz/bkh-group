'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/lib/mockups/site-v3';

function projectHref(title: string) {
  return `/projects/${title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

const slides = [...projects, ...projects];

export default function ProjectsV3() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      containScroll: false,
      watchDrag: true,
    },
    [
      AutoScroll({
        speed: 0.6,
        startDelay: 800,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    emblaApi.plugins().autoScroll?.stop();
  }, [emblaApi]);

  return (
    <section id="projects" className="overflow-hidden bg-black py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div
          data-scroll-in
          className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12"
        >
          <h2
            data-heading-parallax="36"
            className="max-w-[12ch] font-display text-[clamp(3rem,7vw+1rem,6.5rem)] leading-[0.92] tracking-[-0.05em] text-white"
          >
            Biggest builds
          </h2>
          <a
            href="#"
            className="group inline-flex shrink-0 items-center gap-3 self-start text-xs font-medium uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white sm:mb-2 sm:self-auto"
          >
            View all projects
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-[border-color,color,transform] duration-300 group-hover:border-[var(--bkh-cta)] group-hover:text-[var(--bkh-cta)] group-hover:translate-x-0.5">
              <ArrowRight size={16} weight="bold" aria-hidden />
            </span>
          </a>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((project, index) => {
              const isHovered = hovered === index;
              const dimOthers = hovered !== null && !isHovered;

              return (
                <a
                  key={`${project.title}-${index}`}
                  href={projectHref(project.title)}
                  aria-label={`View ${project.title}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className={`group relative mr-4 min-w-0 flex-[0_0_85%] bg-black transition-opacity duration-500 ease-out sm:mr-5 sm:flex-[0_0_60%] lg:mr-6 lg:flex-[0_0_42%] ${
                    dimOthers ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 42vw"
                      className={`object-cover transition-[filter] duration-500 ease-out ${
                        isHovered ? 'brightness-110' : 'brightness-100'
                      }`}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                      <div>
                        <p
                          className={`text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                            isHovered ? 'text-[var(--bkh-cta)]' : 'text-white/50'
                          }`}
                        >
                          {project.category}
                        </p>
                        <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(1.35rem,1.6vw+1rem,2rem)] leading-[1.05] tracking-[-0.03em] text-white">
                          {project.title}
                        </h3>
                      </div>
                      <span
                        className={`mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                          isHovered
                            ? 'translate-y-0 border-[var(--bkh-cta)] bg-[var(--bkh-cta)] text-[var(--bkh-cta-ink)] opacity-100'
                            : 'translate-y-1 border-white/30 bg-transparent text-white opacity-0'
                        }`}
                      >
                        <ArrowUpRight size={18} weight="bold" aria-hidden />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
