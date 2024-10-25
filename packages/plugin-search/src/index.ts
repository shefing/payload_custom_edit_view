import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Config } from 'payload'

import type { SearchPluginConfig } from './types.js'

import { deleteFromSearch } from './Search/hooks/deleteFromSearch.js'
import { syncWithSearch } from './Search/hooks/syncWithSearch.js'
import { generateSearchCollection } from './Search/index.js'

type CollectionAfterChangeHookArgs = Parameters<CollectionAfterChangeHook>[0]
type CollectionAfterDeleteHookArgs = Parameters<CollectionAfterDeleteHook>[0]

export const searchPlugin =
  (incomingPluginConfig: SearchPluginConfig) =>
  (config: Config): Config => {
    const { collections } = config

    if (collections) {
      const pluginConfig: SearchPluginConfig = {
        // write any config defaults here
        deleteDrafts: true,
        syncDrafts: false,
        ...incomingPluginConfig,
      }

      // add afterChange and afterDelete hooks to every search-enabled collection
      const collectionsWithSearchHooks = config?.collections
        ?.map((collection) => {
          const { hooks: existingHooks } = collection

          const enabledCollections = pluginConfig.collections || []
          const isEnabled = enabledCollections.indexOf(collection.slug) > -1
          if (isEnabled) {
            return {
              ...collection,
              hooks: {
                ...collection.hooks,
                afterChange: [
                  ...(existingHooks?.afterChange || []),
                  async (args: CollectionAfterChangeHookArgs) => {
                    await syncWithSearch({
                      ...args,
                      collection: collection.slug,
                      pluginConfig,
                    })
                  },
                ],
                afterDelete: [
                  ...(existingHooks?.afterDelete || []),
                  async (args: CollectionAfterDeleteHookArgs) => {
                    await deleteFromSearch({
                      ...args,
                      pluginConfig,
                    })
                  },
                ],
              },
            }
          }

          return collection
        })
        .filter(Boolean)

      return {
        ...config,
        collections: [
          ...(collectionsWithSearchHooks || []),
          generateSearchCollection(pluginConfig),
        ],
      }
    }

    return config
  }
