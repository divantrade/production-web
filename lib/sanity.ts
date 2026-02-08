import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries
export const QUERIES = {
  // Site Settings
  SITE_SETTINGS: `
    *[_type == "siteSettings"][0] {
      siteTitle,
      siteDescription,
      heroVideo,
      heroTitle,
      heroSubtitle,
      heroDescription,
      companyInfo,
      contactInfo,
      socialLinks,
      seo,
      analytics,
      notifications,
      maintenance
    }
  `,
  
  // Projects
  ALL_PROJECTS: `
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
  `,
  
  FEATURED_PROJECTS: `
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
  `,
  
  PROJECT_BY_SLUG: `
    *[_type == "project" && slug.current == $slug][0] {
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
        logo,
        website
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
        avatar,
        bio
      },
      testimonial->{
        _id,
        clientName,
        company,
        position,
        quote,
        rating,
        avatar
      }
    }
  `,
  
  // Services
  ALL_SERVICES: `
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      features,
      pricing,
      portfolio[]->{
        _id,
        title,
        slug,
        featuredImage
      },
      featured,
      order
    }
  `,
  
  FEATURED_SERVICES: `
    *[_type == "service" && featured == true] | order(order asc) [0...6] {
      _id,
      title,
      description,
      icon,
      features,
      pricing,
      featured
    }
  `,
  
  // Testimonials
  ALL_TESTIMONIALS: `
    *[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      clientName,
      company,
      position,
      quote,
      rating,
      avatar,
      projectReference->{
        _id,
        title,
        slug
      },
      featured,
      videoTestimonial
    }
  `,
  
  FEATURED_TESTIMONIALS: `
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
  `,
  
  // Team Members
  ALL_TEAM_MEMBERS: `
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
      order
    }
  `,
  
  // Categories
  ALL_CATEGORIES: `
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      order
    }
  `,
  
  // Clients
  ALL_CLIENTS: `
    *[_type == "client"] | order(name asc) {
      _id,
      name,
      logo,
      website,
      industry,
      description,
      location,
      contactPerson,
      featured,
      testimonial->{
        _id,
        quote,
        rating
      },
      projectsCount,
      relationship
    }
  `,
  
  FEATURED_CLIENTS: `
    *[_type == "client" && featured == true] | order(_createdAt desc) [0...12] {
      _id,
      name,
      logo,
      website,
      industry,
      featured
    }
  `,
};

// Helper functions for common queries
export async function getSiteSettings() {
  return client.fetch(QUERIES.SITE_SETTINGS);
}

export async function getAllProjects() {
  return client.fetch(QUERIES.ALL_PROJECTS);
}

export async function getFeaturedProjects() {
  return client.fetch(QUERIES.FEATURED_PROJECTS);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(QUERIES.PROJECT_BY_SLUG, { slug });
}

export async function getAllServices() {
  return client.fetch(QUERIES.ALL_SERVICES);
}

export async function getFeaturedServices() {
  return client.fetch(QUERIES.FEATURED_SERVICES);
}

export async function getAllTestimonials() {
  return client.fetch(QUERIES.ALL_TESTIMONIALS);
}

export async function getFeaturedTestimonials() {
  return client.fetch(QUERIES.FEATURED_TESTIMONIALS);
}

export async function getAllTeamMembers() {
  return client.fetch(QUERIES.ALL_TEAM_MEMBERS);
}

export async function getAllCategories() {
  return client.fetch(QUERIES.ALL_CATEGORIES);
}

export async function getAllClients() {
  return client.fetch(QUERIES.ALL_CLIENTS);
}

export async function getFeaturedClients() {
  return client.fetch(QUERIES.FEATURED_CLIENTS);
}

// Preview mode helpers
export function isValidSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return signature === computedSignature;
}