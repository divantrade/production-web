import { client } from '@/lib/sanity';
import HeroSection from "@/components/HeroSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import ServicesSection from "@/components/services/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";

// ISR: Revalidate every hour
export const revalidate = 3600;

async function getHomePageData() {
  // Check if Sanity is properly configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === 'your-project-id') {
    console.warn('Sanity not configured. Using fallback data.');
    return {
      siteSettings: null,
      featuredProjects: [],
      services: [],
      testimonials: [],
      clients: []
    };
  }

  try {
    const [siteSettings, featuredProjects, services, testimonials, clients] = await Promise.all([
      // Site settings (singleton)
      client.fetch(`
        *[_type == "siteSettings"][0] {
          siteTitle,
          siteDescription,
          heroVideo,
          heroTitle,
          heroSubtitle,
          heroDescription,
          companyInfo,
          contactInfo,
          socialLinks
        }
      `),
      // Featured projects
      client.fetch(`
        *[_type == "project" && featured == true] | order(_createdAt desc) [0...6] {
          _id,
          title,
          slug,
          description,
          category->{title, slug},
          featuredImage,
          videoUrl,
          tags,
          featured,
          completionDate
        }
      `),
      // Featured services
      client.fetch(`
        *[_type == "service" && featured == true] | order(order asc) [0...6] {
          _id,
          title,
          description,
          icon,
          features,
          pricing,
          featured
        }
      `),
      // Featured testimonials
      client.fetch(`
        *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
          _id,
          clientName,
          company,
          position,
          quote,
          rating,
          avatar,
          featured
        }
      `),
      // Featured clients
      client.fetch(`
        *[_type == "client" && featured == true] | order(_createdAt desc) [0...12] {
          _id,
          name,
          logo,
          website,
          industry,
          featured
        }
      `)
    ]);

    return {
      siteSettings,
      featuredProjects,
      services,
      testimonials,
      clients
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      siteSettings: null,
      featuredProjects: [],
      services: [],
      testimonials: [],
      clients: []
    };
  }
}

export default async function Home() {
  const data = await getHomePageData();
  return (
    <div className="min-h-screen">
      <HeroSection />
      <section id="work">
        <FeaturedWorks />
      </section>

      <section id="services" className="relative py-20 lg:py-28 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-yellow-500/80" />
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Services</h2>
          </div>
          <p className="mt-3 max-w-3xl text-zinc-300">From concept to completion, we deliver exceptional visual content.</p>
          <div className="mt-10"><ServicesSection /></div>
        </div>
      </section>
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      
      {/* About and Contact sections */}
      <section id="about" className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8">About Us</h2>
          {data.siteSettings?.companyInfo ? (
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                {data.siteSettings.companyInfo.description}
              </p>
              {data.siteSettings.companyInfo.mission && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">Our Mission</h3>
                  <p className="text-lg text-gray-600">
                    {data.siteSettings.companyInfo.mission}
                  </p>
                </div>
              )}
              {data.siteSettings.companyInfo.vision && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">Our Vision</h3>
                  <p className="text-lg text-gray-600">
                    {data.siteSettings.companyInfo.vision}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">About section coming soon...</p>
          )}
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Contact Us</h2>
          {data.siteSettings?.contactInfo ? (
            <div className="space-y-6 text-white">
              {data.siteSettings.contactInfo.email && (
                <p className="text-xl">
                  <span className="text-accent">Email:</span> {data.siteSettings.contactInfo.email}
                </p>
              )}
              {data.siteSettings.contactInfo.phone && (
                <p className="text-xl">
                  <span className="text-accent">Phone:</span> {data.siteSettings.contactInfo.phone}
                </p>
              )}
              {data.siteSettings.contactInfo.address && (
                <p className="text-lg">
                  <span className="text-accent">Address:</span><br />
                  {data.siteSettings.contactInfo.address}
                </p>
              )}
              {data.siteSettings.contactInfo.officeHours && (
                <p className="text-lg">
                  <span className="text-accent">Office Hours:</span> {data.siteSettings.contactInfo.officeHours}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-300">Contact section coming soon...</p>
          )}
        </div>
      </section>
    </div>
  );
}
