// schemas/exploration.ts
// The research frame — each Exploration is a living container
// that holds Activations, research context, and evolving findings.
// Explorations have no status — they are always open to new Activations.

import {defineField, defineType} from 'sanity'

export const exploration = defineType({
  name: 'exploration',
  title: 'Exploration',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      description: 'The primary theme category for this Exploration.',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),

    // ── Summary ───────────────────────────────────────────────
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'A short description for cards and previews.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Body ─────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body',
      description: 'The full research frame — context, objectives, methodology.',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // ── Activations Section ───────────────────────────────────
    defineField({
      name: 'activationsTitle',
      title: 'Activations Section Title',
      description: 'Heading displayed above the list of Activations on this Exploration page.',
      type: 'string',
    }),

    defineField({
      name: 'activationsDescription',
      title: 'Activations Section Description',
      description: 'Short text displayed below the Activations section title.',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'emptyActivationsMessage',
      title: 'Empty Activations Message',
      description: 'Shown on this Exploration page when it has no Activations yet.',
      type: 'string',
    }),

    // ── Collaborators ─────────────────────────────────────────
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      description: 'Institutions, collectives, or individuals involved in this Exploration.',
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
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
    prepare({title, media}) {
      return {
        title,
        subtitle: 'Exploration',
        media,
      }
    },
  },
})
