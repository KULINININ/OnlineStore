<template>
  <div
    class="item-label absolute rounded-lg text-white bg-[#eb5757] text-sm px-2 py-1 left-2 top-2 hover:animate-pulse"
  >
    {{ props.labelText }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  labelText: { type: String }
})
</script>
