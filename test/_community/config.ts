import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { postsSlug } from './collections/Posts/index.js'
import { MenuGlobal } from './globals/Menu/index.js'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [
    {
      slug: 'simple',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'point',
          type: 'point',
        },
      ],
    },
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: {
      Component: '/collections/Posts/MyAvatar.js#MyAvatar',
    },
  },
  editor: null,
  cors: ['http://localhost:3000', 'http://localhost:3001'],
  onInit: async (payload) => {
    // // Create image
    // const imageFilePath = path.resolve(dirname, '../uploads/image.png')
    // const imageFile = await getFileByPath(imageFilePath)
    // await payload.create({
    //   collection: 'media',
    //   data: {},
    //   file: imageFile,
    // })
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
