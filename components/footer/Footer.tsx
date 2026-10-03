'use client';

import { LuMail, LuPhone, LuMapPin, LuArrowUpRight } from 'react-icons/lu';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig, hasContactInfo } from '@/lib/site-config';

const serviceKeys = ['researchScript', 'interviewProduction', 'dramaDocudrama', 'fullEpisodeProduction', 'voiceOver', 'graphics'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const locale = useLocale();

  const quickLinks = [
    { label: tNav('home'), href: `/${locale}` },
    { label: tNav('ourWork'), href: `/${locale}/work` },
    { label: tNav('services'), href: `/${locale}#services` },
    { label: tNav('about'), href: `/${locale}/about` },
    ...(hasContactInfo ? [{ label: tNav('contact'), href: '#contact' }] : []),
  ];

  const { email, phone, whatsapp, city } = siteConfig.contact;
  const contactItems = [
    email && { icon: LuMail, label: email, href: `mailto:${email}` },
    phone && { icon: LuPhone, label: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
    whatsapp && { icon: LuPhone, label: 'WhatsApp', href: `https://wa.me/${whatsapp}` },
    city && { icon: LuMapPin, label: city },
  ].filter(Boolean) as { icon: typeof LuMail; label: string; href?: string }[];

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
              <span className="text-gradient">LUXOR</span><span className="text-white">FILM</span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t('brand.description')}
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-10" />

        {/* Links grid - 4 columns for full width */}
        <div className={`grid grid-cols-2 ${contactItems.length ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-10 mb-14`}>
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
          {contactItems.length > 0 && (
            <div id="contact">
              <h4 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">{t('getInTouch')}</h4>
              <ul className="space-y-4">
                {contactItems.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                    </span>
                    {href ? (
                      <a href={href} dir="ltr" className="text-zinc-500 hover:text-white text-sm transition-colors">
                        {label}
                      </a>
                    ) : (
                      <span className="text-zinc-500 text-sm">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
        </div>
      </div>
    </footer>
  );
}
