import AboutIntro from '@/components/about/AboutIntro';
import ServicesSection from '@/components/services/ServicesSection';
import HowWeWork from '@/components/how-we-work/HowWeWork';
import CTASection from '@/components/cta/CTASection';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'About Us - Luxor Film',
  description: 'Luxor Film is a documentary production company offering research, script development, interview production, drama, and full episode delivery.',
  keywords: ['about luxor film', 'documentary production company', 'interview production', 'docudrama', 'script development'],
  ogType: 'website',
});

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
