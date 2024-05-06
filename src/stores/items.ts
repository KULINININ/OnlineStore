import { defineStore } from 'pinia'

import type { ItemData } from '../types/item-data'
import { ApiEmulator } from '../apiEmulator'

const apiEmulator = new ApiEmulator()

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as ItemData[],
    loading: true
  }),
  actions: {
    async loadItems() {
      this.loading = true
      this.items = await apiEmulator.getItems()
      this.loading = false
      console.log(this.items)
    },
    async filterItems(filterBy: String) {
      this.loading = true
      this.items = await apiEmulator.filterItems(filterBy)
      this.loading = false
    }
  }
})
