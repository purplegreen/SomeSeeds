import {defineField, defineType} from 'sanity'

export const contact_page = defineType({
  name: 'contact_page',
  title: 'Contact Page',
  type: 'document',
  fields: [
    // ── Page content ──────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Short summary — used for SEO and previews.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({name: 'href', type: 'url', title: 'URL'}),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),

    // ── Contact ───────────────────────────────────────────
    defineField({
      name: 'destinationEmail',
      title: 'Destination Email',
      description: 'The address the contact button emails.',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    // ── SEO ───────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
