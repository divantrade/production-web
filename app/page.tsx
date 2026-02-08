import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/services/ServicesSection";
import StatsSection from "@/components/stats/StatsSection";
import CTASection from "@/components/cta/CTASection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
