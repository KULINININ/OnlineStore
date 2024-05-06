<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useItemsStore } from './stores/items'

// Load items from API
const itemsStore = useItemsStore()
itemsStore.loadItems()
</script>
