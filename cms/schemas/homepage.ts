// schemas/homepage.ts
import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      description: 'The main animated headline.',
      type: 'string',
    }),

    // ── Hero SVGs ─────────────────────────────────────────
    defineField({
      name: 'heroSvgOne',
      title: 'Hero SVG 1',
      type: 'image',
    }),

    defineField({
      name: 'heroSvgTwo',
      title: 'Hero SVG 2',
      type: 'image',
    }),

    // ── Sections ─────────────────────────────────────────────
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Key',
              description:
                'Unique identifier used to place this section in the page (e.g. "approach"). Do not change once set.',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'key'},
          },
        },
      ],
    }),

    // ── Slider ────────────────────────────────────
    defineField({
      name: 'slider',
      title: 'Slider',
      description:
        'Choose and order the cards shown in the homepage slider. Mix Explorations and Activations freely.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'exploration'}, {type: 'activation'}],
        },
      ],
    }),

    // ── Poster Image ──────────────────────────────────────
    defineField({
      name: 'posterImageOne',
      title: 'Poster Image 1',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Poster Image 2 ────────────────────────────────────
    defineField({
      name: 'posterImageTwo',
      title: 'Poster Image 2',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Poster Image 3 ────────────────────────────────────
    defineField({
      name: 'posterImageThree',
      title: 'Poster Image 3',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Scroll Bar SVGs ───────────────────────────────────
    defineField({
      name: 'scrollBarSvgOne',
      title: 'Scroll Bar SVG 1',
      type: 'image',
    }),

    defineField({
      name: 'scrollBarSvgTwo',
      title: 'Scroll Bar SVG 2',
      type: 'image',
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
      return {title: 'Homepage'}
    },
  },
})
