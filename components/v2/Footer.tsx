import Image from 'next/image';
import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { site, services, hireSystems } from '@/lib/site-v2';

export default function FooterV2({ homeHref = '/v2' }: { homeHref?: string }) {
  return (
    <footer className="border-t border-white/10 bg-black px-5 pb-10 pt-24 text-white sm:px-8 lg:px-12 lg:pt-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <a href={homeHref} className="inline-flex items-center" aria-label="BKH Group home">
            <Image
              src="/bkh-logo.png"
              alt="BKH Group"
              width={200}
              height={84}
              className="h-12 w-auto object-contain"
            />
          </a>
          <p className="mt-8 max-w-sm font-light leading-relaxed text-white/50">
            {site.positioning} Celebrating {site.anniversaryYears} years across Australia&rsquo;s
            biggest construction environments.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/55 transition-colors hover:text-[var(--bkh-cta)]"
            >
              <FacebookLogo size={22} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/55 transition-colors hover:text-[var(--bkh-cta)]"
            >
              <LinkedinLogo size={22} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/55 transition-colors hover:text-[var(--bkh-cta)]"
            >
              <InstagramLogo size={22} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">Links</p>
          <ul className="mt-6 space-y-4">
            {['Home', 'About', 'Projects', 'Contact'].map((label) => (
              <li key={label}>
                <a
                  href={label === 'Home' ? '#' : `#${label.toLowerCase()}`}
                  className="font-light text-white/65 transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">Services</p>
          <ul className="mt-6 space-y-4">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="font-light text-white/65 transition-colors hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">Sales &amp; hire</p>
          <ul className="mt-6 space-y-4">
            {hireSystems.map((system) => (
              <li key={system.title}>
                <a href="#hire" className="font-light text-white/65 transition-colors hover:text-white">
                  {system.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-white/35">Offices</p>
          <p className="mt-4 font-light leading-relaxed text-white/65">
            {site.headquarters}
            <br />
            {site.address}
          </p>
          <a
            href={site.phoneHref}
            className="mt-3 block font-light text-white/65 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1440px] flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            <a href="/privacy-policy" className="text-xs text-white/40 transition-colors hover:text-white/75">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-xs text-white/40 transition-colors hover:text-white/75">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
