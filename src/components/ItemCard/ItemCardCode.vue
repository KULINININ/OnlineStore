<template>
  <div class="item-code text-left text-xs text-gray-500 flex-1">
    {{ props.code }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: { type: String }
})
</script>
