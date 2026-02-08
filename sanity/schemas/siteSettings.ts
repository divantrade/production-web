import { defineField, defineType } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Luxe Films',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      initialValue: 'Premium Documentary & Commercial Production',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video Settings',
      type: 'object',
      fields: [
        { 
          name: 'videoUrl', 
          title: 'Hero Video URL', 
          type: 'url',
          description: 'YouTube, Vimeo, or direct video URL'
        },
        { 
          name: 'videoId', 
          title: 'Video ID', 
          type: 'string',
          description: 'Auto-extracted from URL'
        },
        { 
          name: 'posterImage', 
          title: 'Poster Image', 
          type: 'image',
          description: 'Fallback image if video fails to load'
        },
        { 
          name: 'autoPlay', 
          title: 'Auto Play', 
          type: 'boolean', 
          initialValue: true 
        },
        { 
          name: 'loop', 
          title: 'Loop Video', 
          type: 'boolean', 
          initialValue: true 
        },
        { 
          name: 'muted', 
          title: 'Muted by Default', 
          type: 'boolean', 
          initialValue: true 
        },
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Multiple titles for typewriter effect',
      initialValue: ['Crafting Visual Stories', 'Creating Cinematic Magic', 'Bringing Dreams to Life'],
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Premium Documentary & Commercial Production',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        { name: 'name', title: 'Company Name', type: 'string', initialValue: 'Luxe Films' },
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'foundedYear', title: 'Founded Year', type: 'number' },
        { name: 'description', title: 'Company Description', type: 'text', rows: 4 },
        { name: 'mission', title: 'Mission Statement', type: 'text', rows: 3 },
        { name: 'vision', title: 'Vision Statement', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'email' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'address', title: 'Address', type: 'text', rows: 3 },
        { name: 'officeHours', title: 'Office Hours', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'vimeo', title: 'Vimeo', type: 'url' },
        { name: 'behance', title: 'Behance', type: 'url' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
        { name: 'twitterCard', title: 'Twitter Card Type', type: 'string', 
          options: {
            list: [
              { title: 'Summary', value: 'summary' },
              { title: 'Summary Large Image', value: 'summary_large_image' },
              { title: 'App', value: 'app' },
              { title: 'Player', value: 'player' },
            ],
          },
          initialValue: 'summary_large_image',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string' },
        { name: 'googleTagManagerId', title: 'Google Tag Manager ID', type: 'string' },
        { name: 'facebookPixelId', title: 'Facebook Pixel ID', type: 'string' },
        { name: 'hotjarId', title: 'Hotjar ID', type: 'string' },
      ],
    }),
    defineField({
      name: 'notifications',
      title: 'Site Notifications',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Show Notification', type: 'boolean', initialValue: false },
        { name: 'message', title: 'Notification Message', type: 'string' },
        { name: 'type', title: 'Notification Type', type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Success', value: 'success' },
              { title: 'Warning', value: 'warning' },
              { title: 'Error', value: 'error' },
            ],
          },
          initialValue: 'info',
        },
        { name: 'link', title: 'Notification Link', type: 'url' },
        { name: 'linkText', title: 'Link Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Maintenance Mode', type: 'boolean', initialValue: false },
        { name: 'message', title: 'Maintenance Message', type: 'text', rows: 3 },
        { name: 'estimatedTime', title: 'Estimated Completion Time', type: 'datetime' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      };
    },
  },
});