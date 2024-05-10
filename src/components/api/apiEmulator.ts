import type { ItemData } from '../../types/item-data'
import type { Material } from '../../types/material'

import { items } from '../../components/api/apiData/items'
import { materials } from '../../components/api/apiData/materials'

import { shuffle } from 'lodash'

export class ApiEmulator {
  private items: ItemData[] = []
  private orderBy: string

  async getItems(): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.items = items
        resolve(items)
      }, 500)
    })
  }

  async loadItemsByPage(page: number): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clonedItems = JSON.parse(JSON.stringify(items))

        clonedItems.forEach((item, index) => {
          item.id = `${page}${index + 1}`
        })

        const shuffledItems = shuffle(clonedItems)

        resolve(shuffledItems)
      }, 500)
    })
  }

  async loadMoreItems(page: number): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clonedItems = JSON.parse(JSON.stringify(items))

        clonedItems.forEach((item, index) => {
          item.id = `${page}${index + 1}`
        })

        const shuffledItems = shuffle(clonedItems)

        resolve(shuffledItems)
      }, 500)
    })
  }

  async orderItems(orderBy: string): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (orderBy === 'cheapest') {
          this.items = this.items.sort((a, b) => a.price.current_price - b.price.current_price)
        } else if (orderBy === 'expensive') {
          this.items = this.items.sort((a, b) => b.price.current_price - a.price.current_price)
        }

        this.orderBy = orderBy
        resolve(this.items)
      }, 500)
    })
  }

  async filterItems(filterBy: string): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (filterBy === 'all') {
          this.items = items
        } else {
          const material = materials.find((item) => item.value === filterBy)
          this.items = items.filter((item) => item.material === material?.id)
        }

        this.orderItems(this.orderBy).then(() => {
          resolve(this.items)
        })
      }, 500)
    })
  }
}
