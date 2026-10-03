import { client } from '@/lib/sanity';
import WorkPageClient from '@/components/work/WorkPageClient';
import { pageMetadata } from '@/lib/metadata';

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, 'work');
}

async function getWorkPageData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === 'your-project-id' || projectId === 'not-configured') {
    console.warn('Sanity not configured. Using fallback data for work page.');
    return {
      projects: [],
      categories: [],
      clients: []
    };
  }

  try {
    const [projects, categories, clients] = await Promise.all([
      client.fetch(`
        *[_type == "project"] | order(year desc, _createdAt desc) {
          _id,
          _createdAt,
          _updatedAt,
          title,
          slug,
          description,
          fullDescription,
          category->{
            _id,
            title
          },
          client->{
            _id,
            name,
            industry
          },
          year,
          duration,
          videoUrl,
          videoId,
          "thumbnail": thumbnail.asset->url,
          industry,
          tags,
          viewCount,
          featured,
          awards,
          credits,
          technicalSpecs
        }
      `),
      client.fetch(`
        *[_type == "category"] | order(order asc) {
          _id,
          title,
          slug,
          color,
          icon
        }
      `),
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
