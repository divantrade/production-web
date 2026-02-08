import { client } from '@/lib/sanity';
import WorkPageClient from '@/components/work/WorkPageClient';

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: 'Our Work - Luxe Films',
  description: 'Explore our portfolio of premium documentaries, commercials, and music videos. See the quality and creativity that defines Luxe Films.',
};

async function getWorkPageData() {
  try {
    const [projects, categories, clients] = await Promise.all([
      // All projects with full details
      client.fetch(`
        *[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          description,
          longDescription,
          category->{
            _id,
            title,
            slug,
            color
          },
          client->{
            _id,
            name,
            industry,
            logo
          },
          featuredImage,
          gallery,
          videoUrl,
          videoSource,
          tags,
          featured,
          completionDate,
          projectType,
          duration,
          location,
          awards,
          budget,
          technicalSpecs,
          teamMembers[]->{
            _id,
            name,
            role,
            avatar
          },
          testimonial->{
            _id,
            clientName,
            company,
            quote,
            rating
          }
        }
      `),
      // Categories for filtering
      client.fetch(`
        *[_type == "category"] | order(order asc) {
          _id,
          title,
          slug,
          color,
          icon
        }
      `),
      // Clients for filtering
      client.fetch(`
        *[_type == "client"] | order(name asc) {
          _id,
          name,
          industry,
          logo
        }
      `)
    ]);

    return {
      projects: projects || [],
      categories: categories || [],
      clients: clients || []
    };
  } catch (error) {
    console.error('Error fetching work page data:', error);
    return {
      projects: [],
      categories: [],
      clients: []
    };
  }
}

export default async function WorkPage() {
  const data = await getWorkPageData();

  return (
    <WorkPageClient 
      initialProjects={data.projects}
      categories={data.categories}
      clients={data.clients}
    />
  );
}