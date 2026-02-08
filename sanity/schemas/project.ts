import { defineField, defineType } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Production Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: MM:SS or HH:MM:SS (e.g., 2:30 or 1:45:30)',
      validation: (Rule) => Rule.required().regex(/^\d{1,2}:\d{2}(:\d{2})?$/, {
        name: 'duration',
        invert: false,
      }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'YouTube or Vimeo video ID (auto-extracted from URL)',
      readOnly: true,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'industry',
      title: 'Industry Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'Number of views (can be synced from YouTube API)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'object',
      fields: [
        { name: 'director', title: 'Director', type: 'string' },
        { name: 'producer', title: 'Producer', type: 'string' },
        { name: 'cinematographer', title: 'Cinematographer', type: 'string' },
        { name: 'editor', title: 'Editor', type: 'string' },
        { name: 'composer', title: 'Composer', type: 'string' },
        { name: 'colorist', title: 'Colorist', type: 'string' },
        { name: 'soundDesigner', title: 'Sound Designer', type: 'string' },
        { name: 'vfxSupervisor', title: 'VFX Supervisor', type: 'string' },
        { name: 'choreographer', title: 'Choreographer', type: 'string' },
      ],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        { name: 'camera', title: 'Camera', type: 'string' },
        { name: 'resolution', title: 'Resolution', type: 'string' },
        { name: 'frameRate', title: 'Frame Rate', type: 'string' },
        { name: 'aspect', title: 'Aspect Ratio', type: 'string' },
        { name: 'lenses', title: 'Lenses', type: 'string' },
        { name: 'sound', title: 'Sound Format', type: 'string' },
        { name: 'vfx', title: 'VFX Software', type: 'string' },
        { name: 'drone', title: 'Drone Equipment', type: 'string' },
      ],
    }),
    defineField({
      name: 'behindTheScenes',
      title: 'Behind the Scenes Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client.name',
      media: 'thumbnail',
      category: 'category.title',
      year: 'year',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, category, year, featured } = selection;
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${subtitle} • ${category} • ${year}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Alphabetical A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});