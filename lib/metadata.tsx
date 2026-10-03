import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site-config';
import { routing } from '@/i18n/routing';

const defaultSEO = {
  siteName: siteConfig.name,
  siteUrl: siteConfig.url,
  description: 'Documentary production company offering research, script development, interview production, drama, and full episode delivery.',
  // Bump ?v= after regenerating the image: WhatsApp and others cache previews by URL
  ogImage: '/images/og-default.jpg?v=2',
};

export type PageKey = 'home' | 'about' | 'work';

const pagePaths: Record<PageKey, string> = { home: '', about: '/about', work: '/work' };
const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_EG' };

// Localized title/description, canonical + hreflang URLs, and the share card
// (Open Graph / Twitter) for a page, from the `meta` namespace in messages/*.json.
export async function pageMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const path = pagePaths[page];
  const urlFor = (l: string) => `${defaultSEO.siteUrl}/${l}${path}`;
  const url = urlFor(locale);
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const image = { url: defaultSEO.ogImage, width: 1200, height: 630, alt: t('imageAlt'), type: 'image/jpeg' };

  return {
    metadataBase: new URL(defaultSEO.siteUrl),
    title,
    description,
    applicationName: t('siteName'),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, urlFor(l)])),
        'x-default': urlFor(routing.defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: t('siteName'),
      title,
      description,
      locale: ogLocales[locale] ?? 'en_US',
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateStructuredData(type: string, data: any) {
  const baseUrl = defaultSEO.siteUrl;
  
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: defaultSEO.siteName,
        description: defaultSEO.description,
        url: baseUrl,
        ...(siteConfig.social.length > 0 && { sameAs: siteConfig.social }),
        ...((data.email || data.phone) && {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            ...(data.phone && { telephone: data.phone }),
            ...(data.email && { email: data.email }),
          },
        }),
        ...(data.city && {
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.city,
          },
        }),
      };

    case 'video':
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnail,
        uploadDate: data.uploadDate,
        duration: data.duration,
        contentUrl: data.url,
        embedUrl: data.embedUrl,
        publisher: {
          '@type': 'Organization',
          name: defaultSEO.siteName,
        },
      };

    case 'breadcrumbs':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
        })),
      };

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: defaultSEO.siteName,
        description: defaultSEO.description,
        url: baseUrl,
      };

    case 'service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: defaultSEO.siteName,
        },
        serviceType: data.serviceType,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: data.currency || 'USD',
        },
      };

    default:
      return null;
  }
}

export function generateJsonLd(structuredData: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}