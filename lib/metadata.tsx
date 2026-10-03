import { Metadata } from 'next';
import React from 'react';
import { siteConfig } from '@/lib/site-config';

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.movie' | 'video.episode';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  author?: string;
  videoData?: {
    url: string;
    duration?: string;
    uploadDate?: string;
    thumbnail?: string;
  };
}

const defaultSEO = {
  siteName: siteConfig.name,
  siteUrl: siteConfig.url,
  description: 'Documentary production company offering research, script development, interview production, drama, and full episode delivery.',
  ogImage: '/images/og-default.jpg',
};

export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    canonical,
    ogImage = defaultSEO.ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    keywords = [],
    author,
  } = seoData;

  const fullTitle = title.includes(defaultSEO.siteName) 
    ? title 
    : `${title} | ${defaultSEO.siteName}`;

  const canonicalUrl = canonical || defaultSEO.siteUrl;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${defaultSEO.siteUrl}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: defaultSEO.siteName,
    publisher: defaultSEO.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultSEO.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: defaultSEO.siteName,
      type: ogType,
      publishedTime,
      modifiedTime,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
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