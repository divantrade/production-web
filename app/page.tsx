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

      {/* Services */}
      <section id="services" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="max-w-2xl text-zinc-400 text-lg">
              Specialized documentary production services — from research and scriptwriting to full episode delivery.
            </p>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* Stats / Our Journey */}
      <StatsSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
