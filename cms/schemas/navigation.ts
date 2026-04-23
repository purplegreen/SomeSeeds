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
      name: 'ctaLink',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
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
      name: 'footerSocialLinks',
      title: 'Footer Social Links',
      type: 'object',
      fields: [
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
