import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { site } from '@/lib/site-v2';
import ContactForm from '../ContactForm';

export default function ContactV2() {
  return (
    <section id="contact" className="bg-black px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto grid w-full max-w-[1440px] gap-20 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] xl:items-start xl:gap-16 2xl:gap-24">
        <div data-scroll-in className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-cta)]">
            Contact
          </p>
          <h2 className="mt-5 text-white">Get in touch.</h2>
          <p className="mt-8 font-light leading-relaxed text-white/55">
            Tell us about your project and we&rsquo;ll be ready to give you all the information you
            need to work with us.
          </p>
          <div className="mt-14 space-y-5 font-light text-white">
            <a
              href={site.phoneHref}
              className="block break-words transition-colors hover:text-[var(--bkh-cta)]"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block break-words transition-colors hover:text-[var(--bkh-cta)]"
            >
              {site.email}
            </a>
            <p className="break-words text-white/55">
              {site.headquarters}
              <br />
              {site.address}
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BKH Group on Facebook"
              className="text-[var(--bkh-cta)] transition-opacity hover:opacity-70"
            >
              <FacebookLogo size={24} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BKH Group on LinkedIn"
              className="text-[var(--bkh-cta)] transition-opacity hover:opacity-70"
            >
              <LinkedinLogo size={24} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BKH Group on Instagram"
              className="text-[var(--bkh-cta)] transition-opacity hover:opacity-70"
            >
              <InstagramLogo size={24} />
            </a>
          </div>
        </div>

        <div data-scroll-in data-reveal-delay="1" className="min-w-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
