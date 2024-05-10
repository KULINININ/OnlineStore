<template>
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useOptionsStore } from './stores/options'

const optionsStore = useOptionsStore()
const options = ref<string[]>(JSON.parse(localStorage.getItem('options') || '{}'))

if (options.value) {
  if (options.value['paginationMode']) {
    optionsStore.setPaginationMode(options.value['paginationMode'])
  }
}
</script>
