import Image from 'next/image';
import { site, services, hireSystems } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bkh-ink)] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12 lg:pt-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <a href="/" className="inline-flex items-center" aria-label="BKH Group home">
            <Image
              src="/bkh-logo.png"
              alt="BKH Group"
              width={200}
              height={84}
              className="h-12 w-auto object-contain"
            />
          </a>
          <p className="mt-6 max-w-sm font-light leading-relaxed text-white/55">
            {site.tagline}. Structural packages for the tier one construction market.
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Links</p>
          <ul className="mt-5 space-y-3">
            {['Home', 'About', 'Projects', 'Contact'].map((label) => (
              <li key={label}>
                <a
                  href={label === 'Home' ? '#' : `#${label.toLowerCase()}`}
                  className="font-light text-white/70 transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Services</p>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="font-light text-white/70 transition-colors hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Sales &amp; hire</p>
          <ul className="mt-5 space-y-3">
            {hireSystems.map((system) => (
              <li key={system.title}>
                <a href="#hire" className="font-light text-white/70 transition-colors hover:text-white">
                  {system.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-white/40">Head office</p>
          <p className="mt-3 font-light leading-relaxed text-white/70">{site.address}</p>
          <a
            href={site.phoneHref}
            className="mt-2 block font-light text-white/70 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            <a href="/privacy-policy" className="text-xs text-white/45 transition-colors hover:text-white/80">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-xs text-white/45 transition-colors hover:text-white/80">
              Terms of Service
            </a>
          </nav>
        </div>
        {/* Proudly made credit will be restored before launch. */}
        {false && (
        <a
          className="inline-flex items-center space-x-2 text-xs text-white opacity-45 transition-opacity hover:opacity-90"
          href="https://paragonpanda.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Proudly</span>
          <svg
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 575.72 529.22"
            aria-hidden
          >
            <path
              fill="#FFF"
              stroke="#FFF"
              d="M516.22,497.4c-18.74-12.72-34.93-28.24-47.92-46.58,34.13-35.47,57.29-81.92,49.12-130.64-5.09-30.25-34.13-72.41-63.04-35.87-22.35,28.51-27.44,70.94-20.61,105.61,3.21,16.33,8.83,31.19,16.46,44.84-21.15,19.94-47.65,40.15-73.08,38.68-24.9-1.47-40.82-32.93-55.95-48.99-12.18-12.98-27.04-24.23-44.84-27.57-32.79-6.42-64.25,14.59-91.42,29.85-21.01,11.78-50.06,30.25-75.22,21.01-23.16-8.3-36.67-35.2-46.18-56.08-11.78-26.23-28.51-54.88-32.66-83.66-3.61-24.63,17.94-46.85,31.19-65.32,25.3-35.34,48.59-84.59,86.87-107.88,25.57-15.53,50.19,6.29,73.08,16.86,15.26,7.36,30.92,10.84,47.52,13.38,40.56,6.42,51.13-63.85,57.42-90.21,2.94-12.31,9.24-61.7,27.04-61.17,18.74,4.28,32.93,34.93,41.63,49.93,5.62,9.64,59.43,120.73,60.5,120.33,5.35-2.28-46.71-115.24-51.8-125.15-9.77-19.01-24.49-51.8-47.38-57.82-19.41-3.88-29.05,17.8-34.4,32.53-7.23,19.68-21.55,116.31-51.26,111.76-24.63-1.2-50.59-19.81-73.35-31.45-29.58-14.86-56.75-6.83-80.58,14.46-25.97,23.16-44.57,53.27-65.18,80.84C31.16,237.6-1.9,269.06,.64,307.34c2.54,38.15,24.36,82.05,41.89,115.38,15.79,30.25,40.15,58.36,76.56,61.03,42.3,3.08,78.17-26.5,114.04-44.17,11.24-5.89,25.03-11.78,38.01-8.97,29.18,8.43,43.63,43.63,67.33,60.77,25.3,18.47,54.74,14.59,80.04-.67,15.93-9.64,31.59-21.55,45.51-35.47,27.04,34.93,67.59,59.29,110.16,73.35,.13-.4,.27-.94,.4-1.34-.27,.27-53.14-26.37-58.36-29.85Zm-75.36-141.48c1.74-22.35,9.64-53.81,28.38-68.66,26.23-20.88,33.86,41.36,33.06,54.74-1.34,26.23-11.78,51.93-30.25,70.81-4.82,5.09-10.44,10.84-16.6,16.86-10.98-23.02-16.46-48.32-14.59-73.75Z"
            />
          </svg>
          <span>made.</span>
        </a>
        )}
      </div>
    </footer>
  );
}
