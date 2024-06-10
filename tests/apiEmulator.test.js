import { describe, expect, test } from 'vitest'

import { ApiEmulator } from '../src/components/api/apiEmulator'

describe('ApiEmulator', () => {
  test('getItems', async () => {
    const apiEmulator = new ApiEmulator()

    const items = await apiEmulator.getItems()

    expect(items.length).toBeGreaterThan(0)
  })
})
