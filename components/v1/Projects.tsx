import Image from 'next/image';
import { projects } from '@/lib/site-v1';

function projectHref(title: string) {
  return `/projects/${title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

/**
 * WordPress-portable Projects: static responsive grid. No scroll fade-ins.
 */
export default function ProjectsV4() {
  return (
    <section id="projects" className="bg-black px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
              Projects
            </p>
            <h2 className="mt-5 max-w-[18ch] text-white">
              A preferred contractor for many of Australia&rsquo;s leading builders.
            </h2>
          </div>
          <p className="max-w-md font-light leading-relaxed text-white/55">
            From towers and stadiums to hospitals and major infrastructure across NSW.
          </p>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:mt-28 lg:gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={projectHref(project.title)}
              aria-label={`View ${project.title}`}
              className="group relative block overflow-hidden bg-black"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-[filter] duration-500 ease-out group-hover:brightness-110"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/50 transition-colors duration-500 group-hover:text-[var(--bkh-cta)]">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.25rem,1.4vw+1rem,1.85rem)] font-light tracking-[-0.02em] text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
