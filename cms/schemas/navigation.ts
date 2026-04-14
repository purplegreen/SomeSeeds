import {defineType, defineField} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Main Navigation',
      }
    },
  },
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'copyright',
          title: 'Copyright text',
          type: 'string',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'string',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'string',
        }),
        defineField({
          name: 'github',
          title: 'GitHub URL',
          type: 'string',
        }),
      ],
    }),
  ],
})
