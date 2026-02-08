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
  title: "Luxe Films - Premium Film Production Company",
  description: "Professional documentary, commercial, and music video production company specializing in luxury visual storytelling and cinematic excellence.",
  keywords: ["film production", "documentary", "commercial", "music video", "luxury", "cinematic", "video production", "film company", "visual storytelling"],
  ogType: "website",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

async function getOrganizationData() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === 'your-project-id') {
      return {
        phone: '+1-555-0123',
        email: 'info@luxefilms.com',
        city: 'Los Angeles',
        state: 'CA',
        country: 'US',
      };
    }

    const siteSettings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        contactInfo
      }
    `);

    return {
      phone: siteSettings?.contactInfo?.phone || '+1-555-0123',
      email: siteSettings?.contactInfo?.email || 'info@luxefilms.com',
      city: 'Los Angeles',
      state: 'CA',
      country: 'US',
    };
  } catch (error) {
    return {
      phone: '+1-555-0123',
      email: 'info@luxefilms.com',
      city: 'Los Angeles',
      state: 'CA',
      country: 'US',
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
      <body className={`${inter.variable} ${cairo.variable} antialiased`}>
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
