import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { iconPicker } from 'sanity-plugin-icon-picker';

// Import schemas
import { projectSchema } from './sanity/schemas/project';
import { teamMemberSchema } from './sanity/schemas/teamMember';
import { serviceSchema } from './sanity/schemas/service';
import { testimonialSchema } from './sanity/schemas/testimonial';
import { siteSettingsSchema } from './sanity/schemas/siteSettings';
import { categorySchema } from './sanity/schemas/category';
import { clientSchema } from './sanity/schemas/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'luxe-films-studio',
  title: 'Luxe Films Content Studio',
  
  projectId,
  dataset,
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Singleton for site settings
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            S.divider(),
            
            // Content sections
            S.listItem()
              .title('Projects')
              .icon(() => '🎬')
              .child(
                S.documentTypeList('project')
                  .title('All Projects')
                  .filter('_type == "project"')
              ),
            
            S.listItem()
              .title('Team Members')
              .icon(() => '👥')
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
              ),
            
            S.listItem()
              .title('Services')
              .icon(() => '💼')
              .child(
                S.documentTypeList('service')
                  .title('Our Services')
              ),
            
            S.listItem()
              .title('Testimonials')
              .icon(() => '💬')
              .child(
                S.documentTypeList('testimonial')
                  .title('Client Testimonials')
              ),
            
            S.divider(),
            
            // Reference data
            S.listItem()
              .title('Categories')
              .icon(() => '📁')
              .child(
                S.documentTypeList('category')
                  .title('Project Categories')
              ),
            
            S.listItem()
              .title('Clients')
              .icon(() => '🏢')
              .child(
                S.documentTypeList('client')
                  .title('Our Clients')
              ),
          ])
    }),
    visionTool(),
    colorInput(),
    iconPicker(),
  ],
  
  schema: {
    types: [
      projectSchema,
      teamMemberSchema,
      serviceSchema,
      testimonialSchema,
      siteSettingsSchema,
      categorySchema,
      clientSchema,
    ],
  },
  
  tools: (prev) => {
    // Show vision tool only in development
    if (process.env.NODE_ENV === 'development') {
      return prev;
    }
    return prev.filter((tool) => tool.name !== 'vision');
  },
});