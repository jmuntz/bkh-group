import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/lib/site-v2';

function projectHref(title: string) {
  return `/projects/${title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

export default function ProjectsV2() {
  return (
    <section id="projects" className="bg-black px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-24">
          <div data-scroll-in className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
              Projects
            </p>
            <h2 className="mt-5 max-w-[18ch] text-white">
              A preferred contractor for many of Australia&rsquo;s leading builders.
            </h2>
          </div>
          <p
            data-scroll-in
            data-reveal-delay="1"
            className="max-w-md font-light leading-relaxed text-white/55"
          >
            From towers and stadiums to hospitals and major infrastructure across NSW.
          </p>
        </div>

        <div className="mt-24 grid auto-rows-[300px] gap-8 sm:grid-cols-2 lg:auto-rows-[320px] lg:grid-cols-3 lg:gap-10">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={projectHref(project.title)}
              aria-label={`View ${project.title}`}
              data-scroll-in="fade"
              data-reveal-delay={String(index % 3)}
              className={`group relative overflow-hidden bg-black ${
                index === 0 ? 'min-h-[460px] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0' : ''
              }`}
            >
              <div className="absolute inset-0 overflow-hidden bg-black [transform:translateZ(0)]">
                <div className="absolute inset-0" data-parallax="40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={
                      index === 0
                        ? '(max-width: 1024px) 100vw, 66vw'
                        : '(max-width: 1024px) 50vw, 33vw'
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"
              />
              <div className="relative z-10 flex h-full items-end justify-between gap-4 p-7 sm:p-9">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/50">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.25rem,1.2vw+1rem,1.85rem)] font-light tracking-[-0.02em] text-white">
                    {project.title}
                  </h3>
                </div>
                <span
                  className="mb-1 inline-flex h-10 w-10 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/25 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:border-white/50 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
