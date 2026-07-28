import { Metadata } from 'next';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const COMPANY = {
  legalName: 'BKH Group',
  acn: 'TBC',
  shortName: 'BKH Group',
  website: 'bkhgroup.com.au',
  address: '378 Vardys Rd, Kings Park NSW 2148',
  email: 'enquiries@bkhgroup.com.au',
  phone: '(02) 9671 8700',
  lastUpdated: 'July 2026',
};

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-neutral-200/60 px-1 py-0.5">{children}</span>;
}

export const metadata: Metadata = {
  title: 'Privacy Policy | BKH Group',
  description:
    'How BKH Group collects, uses, discloses and safeguards your personal information in accordance with the Australian Privacy Principles.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--bkh-page)] pt-20">
      <Nav />

      <article className="mx-auto max-w-[820px] px-6 py-16 sm:px-8 lg:py-24">
        <header className="mb-12">
          <h1 className="text-4xl tracking-[-0.04em] text-[var(--bkh-text-strong)] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--bkh-text-muted)]">
            Last updated: {COMPANY.lastUpdated}
          </p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed text-[var(--bkh-text-body)] [&_h2]:mb-4 [&_h2]:mt-2 [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-[var(--bkh-text-strong)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          <section>
            <h2>1. Introduction</h2>
            <p>
              <Placeholder>{COMPANY.legalName}</Placeholder> (ACN{' '}
              <Placeholder>{COMPANY.acn}</Placeholder>) (&ldquo;
              <Placeholder>{COMPANY.shortName}</Placeholder>&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              or &ldquo;our&rdquo;) is committed to protecting your privacy and handling your personal
              information in accordance with the Australian Privacy Principles (&ldquo;APPs&rdquo;) set
              out in the Privacy Act 1988 (Cth).
            </p>
            <p className="mt-4">
              This Privacy Policy explains how we collect, use, disclose and safeguard your personal
              information when you interact with us, including through our website at{' '}
              <Placeholder>{COMPANY.website}</Placeholder>, our enquiry processes and any other services
              we provide.
            </p>
            <p className="mt-4">
              By using our services or providing your personal information to us, you consent to the
              collection and use of your information as described in this policy.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We may collect and hold the following types of personal information:</p>

            <p className="mt-4 font-semibold text-[var(--bkh-text-strong)]">
              Via our website enquiry form:
            </p>
            <ul className="mt-2">
              <li>
                <strong>Contact details</strong> - your name, email address and phone number
              </li>
              <li>
                <strong>Company details</strong> - the name of your organisation where provided
              </li>
              <li>
                <strong>Enquiry details</strong> - the service you are interested in and your message
              </li>
            </ul>

            <p className="mt-6 font-semibold text-[var(--bkh-text-strong)]">
              Via email, phone or project discussions:
            </p>
            <ul className="mt-2">
              <li>
                <strong>Project information</strong> - site details, programme requirements, drawings
                or specifications you choose to share
              </li>
              <li>
                <strong>Business information</strong> - ABN, ACN, company contacts and related
                commercial details where needed to respond to your enquiry
              </li>
            </ul>

            <p className="mt-6 font-semibold text-[var(--bkh-text-strong)]">Automatically collected:</p>
            <ul className="mt-2">
              <li>
                <strong>Website usage data</strong> - IP address, browser type, pages visited and other
                analytics data collected through cookies and similar technologies
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Collect Information</h2>
            <p>We collect personal information through the following means:</p>
            <ul className="mt-4">
              <li>
                <strong>Through our website</strong> - when you submit an enquiry via our online form
              </li>
              <li>
                <strong>Via email or phone</strong> - when you contact us or we respond about a project,
                hire request or capability enquiry
              </li>
              <li>
                <strong>From your representatives</strong> - such as a project manager, builder or
                consultant acting on your behalf
              </li>
              <li>
                <strong>From publicly available sources</strong> - where relevant to verifying business
                details for a commercial enquiry
              </li>
            </ul>
          </section>

          <section>
            <h2>4. How We Use Your Information</h2>
            <p>We use the personal information we collect for the following purposes:</p>
            <ul className="mt-4">
              <li>To respond to enquiries about our formwork, concrete, scaffold, jumpform and hire services</li>
              <li>To prepare quotes, proposals and project communications</li>
              <li>To manage existing commercial relationships and project delivery</li>
              <li>To comply with our legal and regulatory obligations</li>
              <li>To improve our website, products and services</li>
              <li>To manage our business operations, including internal reporting</li>
              <li>To resolve disputes or enforce our agreements</li>
            </ul>
          </section>

          <section>
            <h2>5. Disclosure of Information</h2>
            <p>We may disclose your personal information to the following types of organisations:</p>
            <ul className="mt-4">
              <li>
                <strong>Service providers</strong> - including IT, hosting, email and document storage
                providers that help us operate our business
              </li>
              <li>
                <strong>Professional advisers</strong> - such as solicitors, insurers or accountants,
                where required
              </li>
              <li>
                <strong>Project partners</strong> - where needed to respond to or deliver a scoped
                package of works, and only as appropriate to the engagement
              </li>
              <li>
                <strong>Regulatory and government bodies</strong> - where required by law
              </li>
            </ul>
            <p className="mt-4">
              We will not sell your personal information to third parties for marketing purposes. We do
              not disclose personal information to overseas recipients unless required by law or with
              your consent.
            </p>
          </section>

          <section>
            <h2>6. Security</h2>
            <p>
              We take reasonable steps to protect your personal information from misuse, interference,
              loss and unauthorised access, modification or disclosure. These measures include access
              controls, secure systems and staff awareness of privacy obligations.
            </p>
            <p className="mt-4">
              While we strive to protect your personal information, no method of transmission over the
              internet or electronic storage is completely secure. We cannot guarantee the absolute
              security of your data.
            </p>
          </section>

          <section>
            <h2>7. Access and Correction</h2>
            <p>
              You have the right to request access to the personal information we hold about you. You
              may also request that we correct any information that is inaccurate, out of date,
              incomplete, irrelevant or misleading.
            </p>
            <p className="mt-4">
              To make an access or correction request, please contact our Privacy Officer using the
              details below. We will respond within a reasonable timeframe and in any case within 30
              days as required by the APPs.
            </p>
          </section>

          <section>
            <h2>8. Complaints</h2>
            <p>
              If you believe we have breached your privacy or mishandled your personal information, you
              may lodge a complaint in writing with our Privacy Officer using the contact details below.
            </p>
            <p className="mt-4">
              We will acknowledge your complaint within 7 days and aim to resolve it within 30 days. If
              you are not satisfied with our response, you may escalate your complaint to the Office of
              the Australian Information Commissioner (OAIC):
            </p>
            <ul className="mt-4">
              <li>
                Website:{' '}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
                >
                  www.oaic.gov.au
                </a>
              </li>
              <li>Phone: 1300 363 992</li>
              <li>
                Email:{' '}
                <a
                  href="mailto:enquiries@oaic.gov.au"
                  className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
                >
                  enquiries@oaic.gov.au
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this
              policy periodically.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to make an access, correction
              or complaint request, please contact our Privacy Officer:
            </p>
            <address className="mt-4 not-italic">
              <p className="font-semibold text-[var(--bkh-text-strong)]">
                Privacy Officer, <Placeholder>{COMPANY.legalName}</Placeholder>
              </p>
              <p className="mt-1">
                <Placeholder>{COMPANY.address}</Placeholder>
              </p>
              <p className="mt-1">
                Email:{' '}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
                >
                  <Placeholder>{COMPANY.email}</Placeholder>
                </a>
              </p>
              <p className="mt-1">
                Phone: <Placeholder>{COMPANY.phone}</Placeholder>
              </p>
            </address>
            <p className="mt-6">
              You may also wish to review our{' '}
              <a
                href="/terms-of-service"
                className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
              >
                Terms of Service
              </a>
              .
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
