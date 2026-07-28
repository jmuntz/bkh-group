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
  jurisdiction: 'New South Wales',
  lastUpdated: 'July 2026',
};

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-neutral-200/60 px-1 py-0.5">{children}</span>;
}

export const metadata: Metadata = {
  title: 'Terms of Service | BKH Group',
  description:
    'Terms and conditions governing the use of the BKH Group website and services.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[var(--bkh-page)] pt-20">
      <Nav />

      <article className="mx-auto max-w-[820px] px-6 py-16 sm:px-8 lg:py-24">
        <header className="mb-12">
          <h1 className="text-4xl tracking-[-0.04em] text-[var(--bkh-text-strong)] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[var(--bkh-text-muted)]">
            Last updated: {COMPANY.lastUpdated}
          </p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed text-[var(--bkh-text-body)] [&_h2]:mb-4 [&_h2]:mt-2 [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-[var(--bkh-text-strong)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the {COMPANY.shortName} website at{' '}
              <Placeholder>{COMPANY.website}</Placeholder> (&ldquo;the Website&rdquo;), you agree to be
              bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
              you must not use the Website.
            </p>
            <p className="mt-4">
              Your continued use of the Website following the posting of any changes to these Terms
              constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2>2. About Us</h2>
            <p>
              The Website is operated by <Placeholder>{COMPANY.legalName}</Placeholder> (ACN{' '}
              <Placeholder>{COMPANY.acn}</Placeholder>) (&ldquo;
              <Placeholder>{COMPANY.shortName}</Placeholder>&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              or &ldquo;our&rdquo;), a structural construction solutions company operating in Australia.
            </p>
            <p className="mt-4">
              Our headquarters address is <Placeholder>{COMPANY.address}</Placeholder>.
            </p>
          </section>

          <section>
            <h2>3. Use of Website</h2>
            <p>
              The Website is provided for general informational purposes only. You agree to use the
              Website only for lawful purposes and in a manner that does not infringe the rights of, or
              restrict or inhibit the use and enjoyment of the Website by, any third party.
            </p>
            <p className="mt-4">
              You must be at least 18 years of age to use this Website or any of our services. By using
              the Website, you represent and warrant that you are at least 18 years old.
            </p>
            <p className="mt-4">You agree not to:</p>
            <ul className="mt-4">
              <li>
                Use the Website in any way that could damage, disable, overburden or impair the Website
                or interfere with any other party&rsquo;s use of the Website
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Website, accounts, computer
                systems or networks connected to the Website
              </li>
              <li>
                Use any automated means, including robots, crawlers or scrapers, to access or collect
                data from the Website without our express written permission
              </li>
              <li>Introduce any viruses, malware or other harmful code to the Website</li>
              <li>
                Reproduce, duplicate, copy, sell, resell or otherwise exploit any portion of the Website
                without our express written permission
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Service Information</h2>
            <p>
              The content on this Website is general information only. It is not intended to be, and
              should not be construed as, a formal quotation, tender submission or offer to contract for
              construction or hire services.
            </p>
            <p className="mt-4">
              Project scopes, programmes, system capacities and availability described on this Website
              may change. Formal engagement is subject to written agreement, site conditions, design
              certification and our standard terms of trade.
            </p>
            <p className="mt-4">
              Any indicative timeframes, capacities or hire availability presented on this Website are
              estimates only and are subject to change. They do not constitute a binding offer.
            </p>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              All content on this Website, including but not limited to text, graphics, logos, images,
              icons, photographs, audio and video clips, digital downloads, data compilations and
              software, is the property of <Placeholder>{COMPANY.legalName}</Placeholder> or its content
              suppliers and is protected by Australian and international copyright, trademark and other
              intellectual property laws.
            </p>
            <p className="mt-4">
              The {COMPANY.shortName} name, logo and all related names, logos, product and service names,
              designs and slogans are trademarks of <Placeholder>{COMPANY.legalName}</Placeholder>. You
              must not use such marks without our prior written permission.
            </p>
            <p className="mt-4">
              You may view, download and print content from the Website for your own personal,
              non-commercial use, provided that you do not modify the content and that you retain all
              copyright and other proprietary notices.
            </p>
          </section>

          <section>
            <h2>6. Privacy</h2>
            <p>
              Your use of the Website is also governed by our{' '}
              <a
                href="/privacy-policy"
                className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
              >
                Privacy Policy
              </a>
              , which sets out how we collect, use and protect your personal information. By using the
              Website, you consent to the collection and use of your information as described in our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2>7. Third Party Links</h2>
            <p>
              The Website may contain links to third-party websites, services or resources that are not
              owned or controlled by {COMPANY.shortName}. We provide these links for your convenience
              only and do not endorse or assume any responsibility for the content, privacy policies or
              practices of any third-party websites.
            </p>
            <p className="mt-4">
              You acknowledge and agree that {COMPANY.shortName} shall not be responsible or liable,
              directly or indirectly, for any damage or loss caused or alleged to be caused by or in
              connection with the use of or reliance on any content, goods or services available on or
              through any third-party websites.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Australian law, including the Australian Consumer Law
              set out in Schedule 2 of the Competition and Consumer Act 2010 (Cth), {COMPANY.shortName},
              its directors, employees, agents and affiliates shall not be liable for any:
            </p>
            <ul className="mt-4">
              <li>
                Direct, indirect, incidental, special, consequential or punitive damages arising from
                your use of, or inability to use, the Website
              </li>
              <li>Errors, inaccuracies or omissions in the content on the Website</li>
              <li>
                Loss of data, profits, revenue or business opportunity arising from your use of the
                Website
              </li>
              <li>Unauthorised access to or alteration of your transmissions or data</li>
              <li>Statements or conduct of any third party on the Website</li>
            </ul>
            <p className="mt-4">
              Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or
              remedy conferred on you by the Australian Consumer Law or any other applicable law that
              cannot be excluded, restricted or modified by agreement.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend and hold harmless{' '}
              <Placeholder>{COMPANY.legalName}</Placeholder>, its directors, officers, employees, agents
              and affiliates from and against any and all claims, liabilities, damages, losses, costs
              and expenses (including reasonable legal fees) arising out of or in any way connected
              with:
            </p>
            <ul className="mt-4">
              <li>Your use of the Website or any services obtained through the Website</li>
              <li>Your breach of these Terms</li>
              <li>Your violation of any law or regulation or the rights of any third party</li>
              <li>Any content or information you submit or transmit through the Website</li>
            </ul>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of{' '}
              <Placeholder>{COMPANY.jurisdiction}</Placeholder>, Australia. You irrevocably submit to
              the exclusive jurisdiction of the courts of{' '}
              <Placeholder>{COMPANY.jurisdiction}</Placeholder> and any courts of appeal from them for
              the purpose of any proceedings arising out of or in connection with these Terms or your
              use of the Website.
            </p>
          </section>

          <section>
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify, amend or replace these Terms at any time at our sole
              discretion. Any changes will be effective immediately upon posting to the Website. It is
              your responsibility to review these Terms periodically for changes. The &ldquo;Last
              updated&rdquo; date at the top of this page indicates when these Terms were last revised.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <address className="mt-4 not-italic">
              <p className="font-semibold text-[var(--bkh-text-strong)]">
                <Placeholder>{COMPANY.legalName}</Placeholder>
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
                href="/privacy-policy"
                className="text-[var(--bkh-text-strong)] underline decoration-[var(--bkh-border-strong)] underline-offset-2 transition-colors hover:text-[var(--bkh-accent)]"
              >
                Privacy Policy
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
