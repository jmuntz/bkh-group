import { site } from '@/lib/site';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--bkh-surface)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div
        data-scroll-reveal
        className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--bkh-accent)]">
            Contact
          </p>
          <h2 className="mt-4 text-[var(--bkh-text-strong)]">Get in touch.</h2>
          <p className="mt-6 font-light leading-relaxed text-[var(--bkh-text-body)]">
            Tell us about your project and we&rsquo;ll be ready to give you all the information you
            need to work with us.
          </p>
          <div className="mt-12 space-y-5 font-light text-[var(--bkh-text-strong)]">
            <a href={site.phoneHref} className="block transition-colors hover:text-[var(--bkh-accent)]">
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block transition-colors hover:text-[var(--bkh-accent)]"
            >
              {site.email}
            </a>
            <p className="text-[var(--bkh-text-body)]">{site.address}</p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
