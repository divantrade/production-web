import { defineField, defineType } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 },
        ],
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Client Photo',
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
    }),
    defineField({
      name: 'projectReference',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Link to the project this testimonial is about',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear on the homepage',
    }),
    defineField({
      name: 'videoTestimonial',
      title: 'Video Testimonial',
      type: 'object',
      fields: [
        { name: 'videoUrl', title: 'Video URL', type: 'url' },
        { name: 'videoId', title: 'Video ID', type: 'string' },
        { name: 'thumbnail', title: 'Video Thumbnail', type: 'image' },
      ],
      description: 'Optional video testimonial',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'company',
      description: 'quote',
      media: 'avatar',
      rating: 'rating',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, description, media, rating, featured } = selection;
      const stars = '⭐'.repeat(rating || 0);
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${subtitle} • ${stars}`,
        description: description?.slice(0, 100) + (description?.length > 100 ? '...' : ''),
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
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
});