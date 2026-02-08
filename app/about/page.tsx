import { client } from '@/lib/sanity';
import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import MissionVision from '@/components/about/MissionVision';
import TeamSection from '@/components/about/TeamSection';
import AwardsSection from '@/components/about/AwardsSection';
import CompanyValues from '@/components/about/CompanyValues';
import OfficeGallery from '@/components/about/OfficeGallery';
import Breadcrumb from '@/components/ui/Breadcrumb';

// ISR: Revalidate every 2 hours
export const revalidate = 7200;

import { generateMetadata as genMeta, generateStructuredData, generateJsonLd } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'About Us - Luxe Films',
  description: 'Learn about Luxe Films\' story, mission, and the talented team behind our award-winning documentary and commercial productions.',
  keywords: ['about luxe films', 'film production team', 'company story', 'video production company', 'documentary filmmakers', 'commercial production'],
  ogType: 'website',
});

async function getAboutPageData() {
  // Check if Sanity is properly configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === 'your-project-id') {
    console.warn('Sanity not configured. Using fallback data.');
    return {
      siteSettings: null,
      teamMembers: [],
      awards: [],
      companyValues: []
    };
  }

  try {
    const [siteSettings, teamMembers] = await Promise.all([
      // Site settings with company info
      client.fetch(`
        *[_type == "siteSettings"][0] {
          companyInfo,
          heroVideo,
          siteTitle,
          siteDescription
        }
      `),
      // Team members
      client.fetch(`
        *[_type == "teamMember"] | order(order asc) {
          _id,
          name,
          role,
          department,
          bio,
          avatar,
          email,
          phone,
          socialLinks,
          featured,
          order,
          skills,
          experience,
          education
        }
      `)
    ]);

    // Mock data for awards and values until we have schemas
    const awards = [
      {
        title: "Best Documentary Feature",
        organization: "International Film Festival",
        year: "2023",
        description: "Awarded for 'Voices of Tomorrow' documentary"
      },
      {
        title: "Excellence in Commercial Production",
        organization: "Advertising Awards",
        year: "2023",
        description: "Recognition for innovative commercial campaigns"
      },
      {
        title: "Cinematography Excellence",
        organization: "Film Society Awards",
        year: "2022",
        description: "Outstanding visual storytelling achievement"
      }
    ];

    const companyValues = [
      {
        title: "Creative Excellence",
        description: "We push creative boundaries to deliver exceptional visual narratives that captivate and inspire.",
        icon: "🎨"
      },
      {
        title: "Technical Innovation",
        description: "Leveraging cutting-edge technology and techniques to bring visions to life with precision.",
        icon: "⚡"
      },
      {
        title: "Collaborative Spirit",
        description: "Building lasting partnerships with clients through transparent communication and shared vision.",
        icon: "🤝"
      },
      {
        title: "Quality Commitment",
        description: "Every project receives meticulous attention to detail, ensuring the highest production standards.",
        icon: "✨"
      }
    ];

    return {
      siteSettings,
      teamMembers: teamMembers || [],
      awards,
      companyValues
    };
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return {
      siteSettings: null,
      teamMembers: [],
      awards: [],
      companyValues: []
    };
  }
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumb items={breadcrumbItems} />
      <AboutHero siteSettings={data.siteSettings} />
      <CompanyStory siteSettings={data.siteSettings} />
      <MissionVision siteSettings={data.siteSettings} />
      <TeamSection teamMembers={data.teamMembers} />
      <AwardsSection awards={data.awards} />
      <CompanyValues values={data.companyValues} />
      <OfficeGallery />
    </div>
  );
}