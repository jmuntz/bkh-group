'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Phone } from '@phosphor-icons/react';
import { navLinks, site } from '@/lib/site';
import Button from './Button';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isV1 = pathname === '/v1' || pathname === '/';
  const isHome =
    pathname === '/' ||
    pathname === '/v1' ||
    pathname === '/v2' ||
    pathname === '/mockups/v1' ||
    pathname === '/mockups/v2' ||
    pathname === '/mockups/v3';
  const homeHref =
    pathname === '/v2'
      ? '/v2'
      : pathname === '/v1' || pathname === '/'
        ? '/v1'
        : pathname === '/mockups/v3'
          ? '/mockups/v3'
          : pathname === '/mockups/v2'
            ? '/mockups/v2'
            : pathname === '/mockups/v1'
              ? '/mockups/v1'
              : '/v1';
  const hashPrefix = isHome ? '' : `${homeHref}`;

  // Fancy scroll pill on v2 etc. v1 only fills solid black for contrast.
  const pill = scrolled && !isV1;
  const barSolid = scrolled && isV1;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-[top,padding,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        pill ? 'top-[15px] px-5 sm:px-8 lg:px-12' : 'top-0 px-0'
      } ${
        barSolid
          ? 'border-b border-white/10 bg-black'
          : !isHome && !pill
            ? 'border-b border-white/10 bg-[var(--bkh-ink)]/95'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className={`relative z-50 mx-auto flex w-full items-center justify-between transition-[max-width,padding,border-radius,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          pill
            ? 'max-w-[1440px] rounded-[14px] bg-black/70 px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl supports-[backdrop-filter]:bg-black/55 sm:px-6 lg:max-w-[1080px] lg:px-8'
            : 'max-w-[1440px] px-5 py-4 sm:px-8 lg:px-12'
        } ${open && !pill && !barSolid ? 'bg-[var(--bkh-ink)]' : ''}`}
      >
        <a href={homeHref} className="relative z-50 inline-flex items-center" aria-label="BKH Group home">
          <Image
            src="/bkh-logo.png"
            alt="BKH Group"
            width={180}
            height={76}
            priority
            className={`w-auto object-contain transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pill ? 'h-8 sm:h-9' : 'h-10 sm:h-11'
            }`}
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `${hashPrefix}${link.href}`}
              className={`text-[0.92rem] font-light tracking-wide transition-colors hover:text-white ${
                barSolid ? 'text-white' : 'text-white/75'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={`hidden items-center lg:flex ${pill ? 'gap-5' : 'gap-3'}`}>
          <a
            href={site.phoneHref}
            className={`inline-flex items-center gap-2 text-sm font-light transition-colors hover:text-white ${
              barSolid ? 'text-white' : 'text-white/80'
            }`}
          >
            <Phone size={16} aria-hidden />
            {site.phone}
          </a>
          <Button
            href={isHome ? '#contact' : `${hashPrefix}#contact`}
            variant="primary"
            className={pill ? '!px-5 !py-2' : ''}
          >
            Enquire
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-[18px] w-[22px]" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-[2px] w-full origin-center rounded-full bg-current transition-transform ${
                isV1 ? 'duration-0' : 'duration-300'
              } ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-y-[8px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[8px] block h-[2px] w-full rounded-full bg-current transition-all ${
                isV1 ? 'duration-0' : 'duration-300'
              } ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-[16px] block h-[2px] w-full origin-center rounded-full bg-current transition-transform ${
                isV1 ? 'duration-0' : 'duration-300'
              } ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? '-translate-y-[8px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[var(--bkh-ink)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isV1 ? 'transition-none' : ''
        } lg:hidden ${
          open
            ? 'pointer-events-auto visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center px-8 pb-16 pt-24">
          <nav className="flex flex-col gap-6" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={isHome ? link.href : `${hashPrefix}${link.href}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{
                  transitionDelay: isV1 ? '0ms' : open ? `${120 + index * 70}ms` : '0ms',
                }}
                className={`font-display text-4xl tracking-[-0.04em] text-white transition-[opacity,transform] ${
                  isV1 ? 'duration-0' : 'duration-500'
                } ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={site.phoneHref}
            className={`mt-12 text-lg font-light text-white/70 transition-[opacity,transform] ${
              isV1 ? 'duration-0' : 'duration-500'
            } ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{
              transitionDelay: isV1 ? '0ms' : open ? `${120 + navLinks.length * 70}ms` : '0ms',
            }}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
