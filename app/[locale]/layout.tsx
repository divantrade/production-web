import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer/Footer";
import { siteConfig } from "@/lib/site-config";
import LoadingAnimation from "@/components/LoadingAnimation";
import PWAInstallPrompt, { NetworkStatus } from "@/components/ui/PWAInstallPrompt";
import PWAProvider from "@/components/PWAProvider";
import { generateMetadata as genMeta, generateStructuredData, generateJsonLd } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: 'swap',
});

export const metadata: Metadata = genMeta({
  title: "Luxor Film - Documentary Production Company",
  description: "Specialized documentary production company offering research, script development, interview production, drama, and full episode delivery worldwide.",
  keywords: ["documentary production", "film production", "interview production", "docudrama", "script development", "research", "episode production", "corporate video"],
  ogType: "website",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';
  const organizationSchema = generateStructuredData('organization', siteConfig.contact);
  const websiteSchema = generateStructuredData('website', {});

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        {generateJsonLd(organizationSchema)}
        {generateJsonLd(websiteSchema)}
      </head>
      <body className={`${inter.variable} ${cairo.variable} antialiased bg-background text-foreground ${isRTL ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages}>
          <PWAProvider>
            <LoadingAnimation />
            <NetworkStatus />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <PWAInstallPrompt />
          </PWAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
