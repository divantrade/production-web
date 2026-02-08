import { defineField, defineType } from 'sanity';

export const clientSchema = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: () => '🏢',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
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
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Finance', value: 'finance' },
          { title: 'Education', value: 'education' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Fashion', value: 'fashion' },
          { title: 'Food & Beverage', value: 'food-beverage' },
          { title: 'Automotive', value: 'automotive' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Non-Profit', value: 'non-profit' },
          { title: 'Government', value: 'government' },
          { title: 'Sports', value: 'sports' },
          { title: 'Travel & Tourism', value: 'travel-tourism' },
          { title: 'Retail', value: 'retail' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Client Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'position', title: 'Position', type: 'string' },
        { name: 'email', title: 'Email', type: 'email' },
        { name: 'phone', title: 'Phone', type: 'string' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Client',
      type: 'boolean',
      initialValue: false,
      description: 'Featured clients appear prominently in client showcases',
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      description: 'Link to testimonial from this client',
    }),
    defineField({
      name: 'projectsCount',
      title: 'Number of Projects',
      type: 'number',
      description: 'Total number of projects completed for this client',
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on-hold' },
          { title: 'Potential', value: 'potential' },
        ],
      },
      initialValue: 'active',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'industry',
      media: 'logo',
      featured: 'featured',
      projectsCount: 'projectsCount',
    },
    prepare(selection) {
      const { title, subtitle, media, featured, projectsCount } = selection;
      const projectsText = projectsCount ? ` • ${projectsCount} projects` : '';
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${subtitle || 'Unknown Industry'}${projectsText}`,
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
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Alphabetical A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Most Projects',
      name: 'projectsDesc',
      by: [{ field: 'projectsCount', direction: 'desc' }],
    },
  ],
});