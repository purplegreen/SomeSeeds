import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {simple_page} from './schemas/simple_page'
import {category} from './schemas/category'
import {tag} from './schemas/tag'
import {navigation} from './schemas/navigation'
import {exploration} from './schemas/exploration'
import {activation} from './schemas/activation'

export default defineConfig({
  name: 'default',
  title: 'SomeSeeds Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Studio')
          .items([
            // ── Content ─────────────────────────────────────
            S.listItem()
              .title('Content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.documentTypeListItem('exploration').title('Explorations'),
                    S.documentTypeListItem('activation').title('Activations'),
                  ]),
              ),

            S.divider(),

            // ── Pages ────────────────────────────────────────
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([S.documentTypeListItem('simple_page').title('Simple Pages')]),
              ),

            S.divider(),

            // ── Settings ─────────────────────────────────────
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.documentTypeListItem('navigation').title('Navigation'),
                    S.documentTypeListItem('category').title('Categories'),
                    S.documentTypeListItem('tag').title('Tags'),
                  ]),
              ),
          ]),
    }),
  ],

  schema: {
    types: [simple_page, category, tag, navigation, exploration, activation],
  },
})
