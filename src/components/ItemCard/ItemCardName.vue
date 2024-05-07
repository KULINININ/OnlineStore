<template>
  <div class="item-title text-left text-sm font-semibold">
    {{ props.name }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String }
})
</script>
