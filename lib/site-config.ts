// Single source of truth for company details shown on the site and in structured data.
// Leave a field empty to hide it everywhere; fill it in to show it.
export const siteConfig = {
  name: 'Luxor Film',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://luxorfilm.net',
  contact: {
    email: '',
    phone: '', // international format, e.g. '+20 100 123 4567'
    whatsapp: '', // digits only, e.g. '201001234567'
    city: '',
  },
  // Official social profile URLs, e.g. 'https://instagram.com/luxorfilm'
  social: [] as string[],
};

export const hasContactInfo = Boolean(
  siteConfig.contact.email || siteConfig.contact.phone || siteConfig.contact.whatsapp
);
