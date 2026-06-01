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
      name: 'heroSvg',
      title: 'Hero SVG',
      type: 'image',
    }),

    // ── Intro ─────────────────────────────────────────────
    defineField({
      name: 'introText',
      title: 'Intro Text',
      description: 'Short description below the hero.',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // ── Poster Image ──────────────────────────────────────
    defineField({
      name: 'posterImageOne',
      title: 'Poster Image 1',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'posterImageOneOverlay',
      title: 'Poster Image 1 Overlay',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Featured Cards ────────────────────────────────────
    defineField({
      name: 'featuredCards',
      title: 'Featured Cards',
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

    // ── Poster Image 2 ────────────────────────────────────
    defineField({
      name: 'posterImageTwo',
      title: 'Poster Image 2',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'posterImageTwoOverlay',
      title: 'Poster Image 2 Overlay',
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

    // ── Get Involved ──────────────────────────────────────
    defineField({
      name: 'getInvolvedText',
      title: 'Get Involved Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
