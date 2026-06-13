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

    // ── Form config ───────────────────────────────────────
    defineField({
      name: 'destinationEmail',
      title: 'Destination Email',
      description: 'Form submissions will be sent to this address.',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'formFields',
      title: 'Form Fields',
      description: 'Define the fields that appear in the contact form.',
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
              name: 'fieldKey',
              title: 'Field Key',
              description: 'Unique identifier used in the email (e.g. "name", "email"). No spaces.',
              type: 'slug',
              options: {source: 'label'},
            }),
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Email', value: 'email'},
                  {title: 'Textarea', value: 'textarea'},
                ],
                layout: 'radio',
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'fieldType'},
          },
        },
      ],
    }),

    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send message',
    }),

    defineField({
      name: 'successMessage',
      title: 'Success Message',
      description: 'Shown to the user after a successful submission.',
      type: 'string',
      initialValue: 'Thank you — we\'ll be in touch soon.',
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
