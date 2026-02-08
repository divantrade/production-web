import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/services/ServicesSection";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
}
