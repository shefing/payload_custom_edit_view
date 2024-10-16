import type { Payload } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { initPayloadInt } from '../helpers/initPayloadInt.js'

let payload: Payload

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const lngX = 36.419723
const latY = -57.555052

describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const initialized = await initPayloadInt(dirname)
    ;({ payload } = initialized)
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }
  })

  it('should save point field', async () => {
    const res = await payload.create({ collection: 'simple', data: { point: [latY, lngX] } })
    expect(res.point).toStrictEqual([latY, lngX])
  })
})
