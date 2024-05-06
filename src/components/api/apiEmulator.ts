import type { ItemData } from '../../types/item-data'
import type { Material } from '../../types/material'

import { items } from '../../components/api/apiData/items'
import { materials } from '../../components/api/apiData/materials'

export class ApiEmulator {
  private items: ItemData[] = []

  async getItems(): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.items = items
        resolve(items)
      }, 500)
    })
  }

  async orderItems(orderBy: String): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (orderBy === 'cheapest') {
          console.log('cheapest', this.items)
          this.items = this.items.sort((a, b) => a.price.current_price - b.price.current_price)
        } else if (orderBy === 'expensive') {
          this.items = this.items.sort((a, b) => b.price.current_price - a.price.current_price)
        }
        resolve(this.items)
      }, 500)
    })
  }

  async filterItems(filterBy: String): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (filterBy === 'all') {
          this.items = items
          resolve(this.items)
        } else {
          const material = materials.find((item) => item.value === filterBy)
          this.items = items.filter((item) => item.material === material?.id)
          resolve(this.items)
        }
      }, 500)
    })
  }
}
