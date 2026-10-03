import AboutIntro from '@/components/about/AboutIntro';
import ServicesSection from '@/components/services/ServicesSection';
import HowWeWork from '@/components/how-we-work/HowWeWork';
import CTASection from '@/components/cta/CTASection';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'about');
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutIntro />
      <ServicesSection />
      <HowWeWork />
      <CTASection />
    </div>
  );
}
