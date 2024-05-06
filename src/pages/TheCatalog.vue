<template>
  <div class="catalog container mx-auto m-auto space-y-4">
    <div class="items-filters flex inline space-x-4">
      <BaseSelector
        class="items-filters__selector-order"
        label="Order by:"
        :options="orderOptions"
        @selectChange="handleOrderChange"
      />
      <BaseSelector
        class="items-filters__selector-material"
        label="Material:"
        :options="materialOptions"
        @selectChange="handleMaterialChange"
      />
    </div>
    <div class="items-grid__wrapper">
      <ItemsGrid />
    </div>
  </div>
</template>
<script setup lang="ts">
import ItemsGrid from '../components/ItemsGrid/ItemsGrid.vue'
import BaseSelector from '../components/Base/BaseSelector.vue'

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
</script>
