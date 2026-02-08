import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'not-configured';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Standard client for published content
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Client for preview mode (includes drafts)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
});

// Get client based on preview mode
export const getClient = (preview?: boolean) => (preview ? previewClient : sanityClient);

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// Helper function to get optimized image URL
export const getImageUrl = (
  source: any,
  width?: number,
  height?: number,
  quality: number = 80
) => {
  if (!source) return '';
  
  let imageBuilder = urlFor(source).quality(quality);
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  
  return imageBuilder.url();
};