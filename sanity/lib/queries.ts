import { groq } from 'next-sanity';

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    fullDescription,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name,
      logo
    },
    year,
    duration,
    videoUrl,
    videoId,
    thumbnail,
    images,
    industry,
    tags,
    viewCount,
    featured,
    awards,
    credits,
    technicalSpecs,
    behindTheScenes,
    publishedAt,
    _updatedAt,
    "slug": slug.current
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name,
      logo
    },
    thumbnail,
    videoUrl,
    videoId,
    featured,
    "slug": slug.current
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name,
      logo,
      website
    },
    year,
    duration,
    videoUrl,
    videoId,
    thumbnail,
    images,
    industry,
    tags,
    viewCount,
    featured,
    awards,
    credits,
    technicalSpecs,
    behindTheScenes,
    publishedAt,
    _updatedAt,
    "slug": slug.current
  }
`;

export const relatedProjectsQuery = groq`
  *[_type == "project" && _id != $excludeId && (
    category._ref == $categoryId || 
    count(industry[@ in $industries]) > 0
  )] | order(featured desc, publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name
    },
    thumbnail,
    videoUrl,
    "slug": slug.current
  }
`;

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    bio,
    photo,
    email,
    socialLinks,
    featured,
    order
  }
`;

export const featuredTeamMembersQuery = groq`
  *[_type == "teamMember" && featured == true] | order(order asc, name asc) {
    _id,
    name,
    role,
    bio,
    photo,
    featured,
    order
  }
`;

// Services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    description,
    icon,
    features,
    pricing,
    featured,
    order
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(featured desc, _createdAt desc) {
    _id,
    clientName,
    company,
    position,
    quote,
    rating,
    avatar,
    featured,
    projectReference->{
      _id,
      title,
      slug
    }
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    clientName,
    company,
    position,
    quote,
    rating,
    avatar,
    featured
  }
`;

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon,
    "slug": slug.current
  }
`;

// Clients
export const clientsQuery = groq`
  *[_type == "client"] | order(featured desc, name asc) {
    _id,
    name,
    logo,
    website,
    featured,
    industry
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    heroVideo,
    heroTitle,
    heroSubtitle,
    heroDescription,
    companyInfo,
    socialLinks,
    contactInfo,
    seo,
    analytics
  }
`;

// Search query
export const searchProjectsQuery = groq`
  *[_type == "project" && (
    title match $searchTerm ||
    description match $searchTerm ||
    fullDescription match $searchTerm ||
    client->name match $searchTerm ||
    $searchTerm in tags[]
  )] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name
    },
    thumbnail,
    videoUrl,
    featured,
    "slug": slug.current
  }
`;

// Projects by category
export const projectsByCategoryQuery = groq`
  *[_type == "project" && category._ref == $categoryId] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name
    },
    year,
    duration,
    thumbnail,
    videoUrl,
    featured,
    "slug": slug.current
  }
`;

// Projects by year
export const projectsByYearQuery = groq`
  *[_type == "project" && year == $year] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category->{
      _id,
      title,
      slug
    },
    client->{
      _id,
      name
    },
    year,
    duration,
    thumbnail,
    videoUrl,
    featured,
    "slug": slug.current
  }
`;

// Get all years from projects
export const projectYearsQuery = groq`
  *[_type == "project" && defined(year)] | order(year desc) {
    year
  }
`;

// Get all industries from projects
export const projectIndustriesQuery = groq`
  *[_type == "project" && defined(industry)] {
    industry
  }
`;