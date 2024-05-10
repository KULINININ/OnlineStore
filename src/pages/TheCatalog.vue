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
    <div class="catalog-items-pagination-selector flex inline space-x-4 items-center">
      <BaseSwitcher v-model:checked="paginationModeSwitcher" />
      <div class="catalog-items-pagination-selector__text align-center">Бесконечная пагинация</div>
    </div>
    <div class="catalog-items-grid__wrapper">
      <ItemsGrid />
    </div>
    <div class="catalog-pagination">
      <BasePagination
        :class="{ 'pointer-events-none opacity-50': isLoading }"
        :paginationMode="paginationMode"
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
import BaseSwitcher from '../components/Base/BaseSwitcher.vue'

import { useItemsStore } from '../stores/items'
import { useOptionsStore } from '../stores/options.ts'

const itemsStore = useItemsStore()
const optionsStore = useOptionsStore()
const router = useRouter()

const selectedMaterial = ref()
const selectedOrder = ref()
const currentPage = ref(1)
const paginationMode = ref('page')
const paginationModeSwitcher = ref(false)

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
  const newQuery = { ...router.currentRoute.value.query, page: page }
  router.replace({ query: newQuery })
  if (paginationMode.value === 'scroll') {
    itemsStore.loadMoreItems(page)
  } else if (paginationMode.value === 'page') {
    itemsStore.loadItemsByPage(page)
  }
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
    currentPage.value = Number(page)
    itemsStore.loadItemsByPage(Number(page))
  }
}

const switchPaginationMode = () => {
  if (paginationModeSwitcher.value === true) {
    paginationMode.value = 'scroll'
  } else if (paginationModeSwitcher.value === false) {
    paginationMode.value = 'page'
  }

  localStorage.setItem('options', JSON.stringify({ paginationMode: paginationMode.value }))
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

watch(paginationModeSwitcher, (newValue, oldValue) => {
  switchPaginationMode()
})

// Load items from API
itemsStore.loadItems().then(() => {
  applyQueryFilters()
})

const isLoading = computed(() => itemsStore.loading)

// Restore pagination mode from localStorage
paginationMode.value = optionsStore.paginationMode
paginationModeSwitcher.value = optionsStore.paginationMode === 'scroll'
</script>
