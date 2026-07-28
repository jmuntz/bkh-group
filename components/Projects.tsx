import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { projects } from '@/lib/site';

function projectHref(title: string) {
  return `/projects/${title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

export default function Projects() {
  return (
    <section id="projects" className="bg-[var(--bkh-page)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div
          data-scroll-reveal
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent)]">
              Projects
            </p>
            <h2 className="mt-4 max-w-[18ch] text-[var(--bkh-text-strong)]">
              A preferred contractor for many of Australia&rsquo;s leading builders.
            </h2>
          </div>
          <p className="max-w-md font-light leading-relaxed text-[var(--bkh-text-body)]">
            From towers and stadiums to hospitals and major infrastructure across NSW.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[280px] gap-5 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={projectHref(project.title)}
              aria-label={`View ${project.title}`}
              data-scroll-reveal
              data-reveal-delay={String(index % 3)}
              className={`group relative overflow-hidden bg-[var(--bkh-ink)] ${
                index === 0 ? 'min-h-[420px] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0' : ''
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={index === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.25rem,1.2vw+1rem,1.85rem)] font-light tracking-[-0.02em] text-white">
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
