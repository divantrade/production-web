import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import PWAInstallPrompt, { NetworkStatus } from "@/components/ui/PWAInstallPrompt";
import PWAProvider from "@/components/PWAProvider";
import { generateMetadata, generateStructuredData, generateJsonLd } from "@/lib/metadata";
import { client } from "@/lib/sanity";

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

export const metadata: Metadata = generateMetadata({
  title: "Luxe Films - Documentary Production Company",
  description: "Specialized documentary production company offering research, script development, interview production, drama, and full episode delivery worldwide.",
  keywords: ["documentary production", "film production", "interview production", "docudrama", "script development", "research", "episode production", "corporate video"],
  ogType: "website",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

async function getOrganizationData() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your-project-id' || projectId === 'not-configured') {
      return {
        phone: '+20-100-000-0000',
        email: 'info@luxefilms.com',
        city: 'Cairo',
        state: '',
        country: 'EG',
      };
    }

    const siteSettings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        contactInfo
      }
    `);

    return {
      phone: siteSettings?.contactInfo?.phone || '+20-100-000-0000',
      email: siteSettings?.contactInfo?.email || 'info@luxefilms.com',
      city: 'Cairo',
      state: '',
      country: 'EG',
    };
  } catch (error) {
    return {
      phone: '+20-100-000-0000',
      email: 'info@luxefilms.com',
      city: 'Cairo',
      state: '',
      country: 'EG',
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = await getOrganizationData();
  const organizationSchema = generateStructuredData('organization', organizationData);
  const websiteSchema = generateStructuredData('website', {});

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {generateJsonLd(organizationSchema)}
        {generateJsonLd(websiteSchema)}
      </head>
      <body className={`${inter.variable} ${cairo.variable} antialiased bg-background text-foreground`}>
        <PWAProvider>
          <LoadingAnimation />
          <NetworkStatus />
          <Navigation />
          <main>{children}</main>
          <PWAInstallPrompt />
        </PWAProvider>
      </body>
    </html>
  );
}
