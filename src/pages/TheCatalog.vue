<template>
  <div class="catalog container mx-auto m-auto space-y-4">
    <div class="items-filters flex inline space-x-4">
      <BaseSelector
        class="items-filters__selector-order"
        label="Order by:"
        :options="orderOptions"
        :selectedOption="selectedOrder"
        @selectChange="handleOrderChange"
      />
      <BaseSelector
        class="items-filters__selector-material"
        label="Material:"
        :options="materialOptions"
        :selectedOption="selectedMaterial"
        @selectChange="handleMaterialChange"
      />
    </div>
    <div class="items-grid__wrapper">
      <ItemsGrid />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ItemsGrid from '../components/ItemsGrid/ItemsGrid.vue'
import BaseSelector from '../components/Base/BaseSelector.vue'

import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()
const router = useRouter()

let selectedMaterial = ref()
let selectedOrder = ref()

const orderOptions = [
  {
    id: 1,
    value: 'popular',
    label: 'Popular'
  },
  {
    id: 2,
    value: 'new',
    label: 'New'
  },
  {
    id: 3,
    value: 'cheapest',
    label: 'Cheapest'
  },
  {
    id: 4,
    value: 'expensive',
    label: 'Expensive'
  }
]

const materialOptions = [
  {
    id: 1,
    value: 'all',
    label: 'All'
  },
  {
    id: 2,
    value: 'wood',
    label: 'Wood'
  },
  {
    id: 3,
    value: 'metal',
    label: 'Metal'
  }
]

const handleOrderChange = (order: String) => {
  const newQuery = { ...router.currentRoute.value.query, order: order }
  router.replace({ query: newQuery })
  itemsStore.sortItems(order)
}
const handleMaterialChange = (material: String) => {
  const newQuery = { ...router.currentRoute.value.query, material: material }
  router.replace({ query: newQuery })
  itemsStore.filterItems(material)
}

const applyQueryFilters = () => {
  const { order, material } = router.currentRoute.value.query

  if (material) {
    itemsStore.filterItems(material)
    selectedMaterial.value = material
  }
  if (order) {
    itemsStore.sortItems(order)
    selectedOrder.value = order
  }
}

// Load items from API
itemsStore.loadItems().then(() => {
  applyQueryFilters()
})

onMounted(() => {})
</script>
