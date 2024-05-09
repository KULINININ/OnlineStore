<template>
  <RouterLink
    v-for="(pathSegments, index) in props.path"
    :key="pathSegments"
    :to="{ name: pathSegments }"
    class="catalog-breadcrumb__link"
    :class="{
      'catalog-breadcrumb__link--last font-bold': index === props.path.length - 1
    }"
    >{{ EnumRouteName[pathSegments] }}</RouterLink
  >
</template>
<script setup lang="ts">
import { EnumRouteName } from '../../enums/EnumRouteName.ts'

const props = defineProps({
  path: { type: Array, required: true }
})
</script>

<style scoped>
.catalog-breadcrumb__link::after {
  content: '/';
  margin-left: 8px;
  margin-right: 8px;
}

.catalog-breadcrumb__link--last::after {
  content: '';
}
</style>
