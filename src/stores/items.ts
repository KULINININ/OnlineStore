import { defineStore } from 'pinia'

import type { ItemData } from '../types/item-data'
import { ApiEmulator } from '../components/api/apiEmulator'

const apiEmulator = new ApiEmulator()

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as ItemData[],
    loading: true as Boolean
  }),
  actions: {
    // this.loading = true
    // this.loading = false
    // Тут бы декоратор использовать,
    // но внутри defineStore нельзя(((

    async loadItems() {
      this.loading = true
      this.items = await apiEmulator.getItems()
      this.loading = false
    },
    async loadItemsByPage(page: number) {
      this.loading = true
      this.items = await apiEmulator.loadItemsByPage(page)
      this.loading = false
    },
    async loadMoreItems(page: number) {
      this.loading = true
      this.items = this.items.concat(await apiEmulator.loadMoreItems(page))
      this.loading = false
    },
    async filterItems(filterBy: string) {
      this.loading = true
      this.items = await apiEmulator.filterItems(filterBy)
      this.loading = false
    },
    async orderItems(orderBy: string) {
      this.loading = true
      this.items = await apiEmulator.orderItems(orderBy)
      this.loading = false
    }
  }
})
