import type { Metadata } from 'next';
import { Outfit, Syne } from 'next/font/google';
import './globals.css';
import FastAnchorScroll from '../components/fast-anchor-scroll';
import ScrollReveal from '../components/ScrollReveal';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bkhgroup.com.au';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'BKH Group | Setting the Future in Concrete',
  description:
    'Formwork, concreting, scaffold and jumpform systems for the tier one construction market across NSW and Australia.',
  icons: {
    icon: {
      url: '/images/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning data-scheme="yellow">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('bkh-scheme');if(s==='yellow'||s==='purple')document.documentElement.dataset.scheme=s;else document.documentElement.dataset.scheme='yellow';}catch(e){document.documentElement.dataset.scheme='yellow';}})();`,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${syne.variable}`}>
        <FastAnchorScroll />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
