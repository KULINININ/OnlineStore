import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import ItemsGrid from '../src/components/ItemsGrid/ItemsGrid.vue'
import { useItemsStore } from '../src/stores/items'

describe('ItemsGrid', () => {
  let wrapper
  let itemsStore

  beforeEach(() => {
    const pinia = createPinia()
    wrapper = mount(ItemsGrid, {
      global: {
        plugins: [pinia]
      }
    })
    itemsStore = useItemsStore()
  })

  it('renders ItemGrid', async () => {
    expect(wrapper.find('.items-grid').exists()).toBe(true)
  })

  it('renders items in ItemGrid', async () => {
    await itemsStore.loadItems()

    const itemsCount = wrapper.findAll('.items-grid__item-wrapper')
    expect(itemsCount.length).toBeGreaterThan(0)
  })
})
