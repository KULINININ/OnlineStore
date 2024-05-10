<template>
  <div class="catalog container m-auto space-y-4">
    <div class="catalog-breadcrumbs text-sm text-gray-500">
      <BaseBreadcrumbs :path="routePath" />
    </div>
    <div class="catalog-page-title text-3xl">
      {{ EnumRouteName[routePath[routePath.length - 1]] }}
    </div>
    <div class="catalog-items-filters flex inline space-x-4">
      <BaseSelector
        class="items-filters__selector-order"
        label="Сортировка:"
        :options="orderOptions"
        v-model:selectedOption="selectedOrder"
      />
      <BaseSelector
        class="items-filters__selector-material"
        label="Материал:"
        :options="materialOptions"
        v-model:selectedOption="selectedMaterial"
      />
    </div>
    <div class="catalog-items-grid__wrapper">
      <ItemsGrid />
    </div>
    <div class="catalog-pagination">
      <BasePagination
        :class="{ 'pointer-events-none opacity-50': isLoading }"
        v-model:currentPage="currentPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import ItemsGrid from '../components/ItemsGrid/ItemsGrid.vue'
import BaseSelector from '../components/Base/BaseSelector.vue'
import BaseBreadcrumbs from '../components/Base/BaseBreadcrumbs.vue'
import { EnumRouteName } from '../enums/EnumRouteName.ts'
import BasePagination from '../components/Base/BasePagination/BasePagination.vue'

import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()
const router = useRouter()

let selectedMaterial = ref()
let selectedOrder = ref()
let currentPage = ref(1)

const routePath = router.currentRoute.value.path.split('/').slice(1)

const orderOptions = [
  {
    id: 1,
    value: 'popular',
    label: 'Популярные'
  },
  {
    id: 2,
    value: 'new',
    label: 'Новые'
  },
  {
    id: 3,
    value: 'cheapest',
    label: 'Цена по возрастанию'
  },
  {
    id: 4,
    value: 'expensive',
    label: 'Цена по убыванию'
  }
]

const materialOptions = [
  {
    id: 1,
    value: 'all',
    label: 'Все'
  },
  {
    id: 2,
    value: 'wood',
    label: 'Дерево'
  },
  {
    id: 3,
    value: 'metal',
    label: 'Металл'
  }
]

const handleOrderChange = (order: string) => {
  const newQuery = { ...router.currentRoute.value.query, order: order }
  router.replace({ query: newQuery })
  itemsStore.orderItems(order)
}
const handleMaterialChange = (material: string) => {
  const newQuery = { ...router.currentRoute.value.query, material: material }
  router.replace({ query: newQuery })
  itemsStore.filterItems(material)
}

const handlePageChange = (page: number) => {
  itemsStore.loadItemsByPage(page).then(() => {})
  const newQuery = { ...router.currentRoute.value.query, page: page }
  router.replace({ query: newQuery })
}

const applyQueryFilters = () => {
  const { order, material, page } = router.currentRoute.value.query

  if (material) {
    itemsStore.filterItems(material)
    selectedMaterial.value = material
  }
  if (order) {
    itemsStore.orderItems(order)
    selectedOrder.value = order
  }
  if (page) {
    itemsStore.loadItemsByPage(page)
  }
}

watch(selectedOrder, (newValue, oldValue) => {
  handleOrderChange(newValue)
})

watch(selectedMaterial, (newValue, oldValue) => {
  handleMaterialChange(newValue)
})

watch(currentPage, (newValue, oldValue) => {
  handlePageChange(newValue)
})

// Load items from API
itemsStore.loadItems().then(() => {
  // console.log(itemsStore.items)
  applyQueryFilters()
})

const isLoading = computed(() => itemsStore.loading)
</script>
