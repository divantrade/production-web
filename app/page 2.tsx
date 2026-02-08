import HeroSection from "@/components/HeroSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedWorks />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      
      {/* About and Contact sections placeholder */}
      <section id="about" className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">About Us</h2>
          <p className="text-gray-600">About section coming soon...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-300">Contact section coming soon...</p>
        </div>
      </section>
    </div>
  );
}
