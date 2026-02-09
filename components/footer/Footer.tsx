'use client';

import { LuMail, LuPhone, LuMapPin, LuArrowUpRight } from 'react-icons/lu';
import { useTranslations, useLocale } from 'next-intl';

const serviceKeys = ['researchScript', 'interviewProduction', 'dramaDocudrama', 'fullEpisodeProduction', 'voiceOver', 'graphics'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const locale = useLocale();

  const quickLinks = [
    { label: tNav('home'), href: `/${locale}` },
    { label: tNav('ourWork'), href: `/${locale}/work` },
    { label: tNav('services'), href: '#services' },
    { label: tNav('about'), href: `/${locale}/about` },
    { label: tNav('contact'), href: '#contact' },
  ];

  return (
    <footer className="relative bg-zinc-950 overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Main footer content */}
      <div className="relative max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-8">
        {/* Top section - Brand + Contact info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-14">
          <div className="max-w-md">
            <a href={`/${locale}`} className="inline-block text-2xl font-bold mb-4">
              <span className="text-gradient">LUXE</span><span className="text-white">FILMS</span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t('brand.description')}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <a
              href="mailto:info@luxefilms.com"
              className="group flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors duration-200"
            >
              <span className="text-sm">info@luxefilms.com</span>
              <LuArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+201000000000"
              className="group flex items-center gap-2 text-zinc-400 hover:text-accent transition-colors duration-200"
            >
              <span className="text-sm">+20 100 000 0000</span>
              <LuArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2 text-zinc-500">
              <LuMapPin className="h-3.5 w-3.5 text-accent/60" />
              <span className="text-sm">Cairo, Egypt</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-10" />

        {/* Links grid - 4 columns for full width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">{t('navigation')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">{t('servicesHeading')}</h4>
            <ul className="space-y-3">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <span className="text-zinc-500 text-sm">{t(`services.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">{t('getInTouch')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <LuMail className="h-3.5 w-3.5 text-accent" />
                </span>
                <a href="mailto:info@luxefilms.com" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  info@luxefilms.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <LuPhone className="h-3.5 w-3.5 text-accent" />
                </span>
                <a href="tel:+201000000000" className="text-zinc-500 hover:text-white text-sm transition-colors">
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <LuMapPin className="h-3.5 w-3.5 text-accent" />
                </span>
                <span className="text-zinc-500 text-sm">Cairo, Egypt</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">{t('aboutUs')}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">
              {t('aboutDescription')}
            </p>
            <a
              href={`/${locale}/about`}
              className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
            >
              {t('learnMore')}
              <LuArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/[0.06] mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">{t('privacyPolicy')}</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">{t('termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
