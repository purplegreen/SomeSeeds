// schemas/activation.ts
// An Activation is a lived event — workshop, session, gathering —
// that enacts one or more Explorations in the world.
// Structured around the three-phase arc: Research → Documentation → Outcomes

import {defineField, defineType} from 'sanity'

export const activation = defineType({
  name: 'activation',
  title: 'Activation',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Event', value: 'event'},
          {title: 'Session', value: 'session'},
          {title: 'Field Work', value: 'field-work'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
    }),

    // ── Taxonomy ──────────────────────────────────────────────
    defineField({
      name: 'explorations',
      title: 'Explorations',
      description: 'Which Exploration(s) does this Activation belong to?',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'exploration'}]}],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),

    // ── When & Where ──────────────────────────────────────────
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      description: 'Only needed for multi-day activations.',
      type: 'date',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({name: 'venue', title: 'Venue', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
      ],
    }),

    // ── Hosting Institutions ──────────────────────────────────
    defineField({
      name: 'hostingInstitutions',
      title: 'Hosting Institutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'logo', title: 'Logo', type: 'image'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {title: 'name', media: 'logo'},
          },
        },
      ],
    }),

    // ── Cover ─────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── BEFORE — Research ─────────────────────────────────────
    // Material gathered and prepared in order to run the activation.
    defineField({
      name: 'research',
      title: 'Research',
      description: 'The input — material that informed and prepared this activation.',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'caption', title: 'Caption', type: 'string'})],
            },
          ],
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({name: 'url', title: 'URL', type: 'url'}),
              ],
              preview: {
                select: {title: 'label', subtitle: 'url'},
              },
            },
          ],
        }),
      ],
    }),

    // ── DURING — Documentation ────────────────────────────────
    // The record — what happened during the activation.
    defineField({
      name: 'documentation',
      title: 'Documentation',
      description: 'The record — what happened during this activation.',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'caption', title: 'Caption', type: 'string'})],
            },
          ],
        }),
      ],
    }),

    // ── AFTER — Outcomes ──────────────────────────────────────
    // What emerged as a result — connections, new threads, references.
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      description: 'The output — what this activation set in motion.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'Describe this outcome.',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'External URL',
              description: 'Link to an external resource or result.',
              type: 'url',
            }),
            defineField({
              name: 'internalRef',
              title: 'Internal Reference',
              description: 'Or link to another Activation or Exploration on the site.',
              type: 'reference',
              to: [{type: 'activation'}, {type: 'exploration'}],
            }),
          ],
          preview: {
            select: {title: 'label'},
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status',
      startDate: 'startDate',
      media: 'coverImage',
    },
    prepare({title, status, startDate, media}) {
      const parts = [status, startDate].filter(Boolean)
      return {
        title,
        subtitle: parts.join(' · ') || 'No status or date yet',
        media,
      }
    },
  },
})
