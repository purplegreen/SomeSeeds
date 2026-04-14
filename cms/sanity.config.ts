import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {simple_page} from './schemas/simple_page'
import {category} from './schemas/category'
import {tag} from './schemas/tag'
import {navigation} from './schemas/navigation'

export default defineConfig({
  name: 'default',
  title: 'My Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [simple_page, category, tag, navigation],
  },
})
