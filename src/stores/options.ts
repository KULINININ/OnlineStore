import { defineStore } from 'pinia'

export const useOptionsStore = defineStore('options', {
  state: () => ({
    paginationMode: 'page' as string
  }),
  actions: {
    setPaginationMode(mode: string) {
      this.paginationMode = mode
    }
  }
})
