<template>
  <div
    v-if="props.labelData"
    class="item-label absolute rounded-lg text-white text-sm px-2 py-1 left-2 top-2 hover:animate-pulse"
    :class="LableColor[props.labelData.type]"
  >
    {{ props.labelData.labelText }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  labelData: { type: Object }
})

enum LableColor {
  sale = 'bg-[#eb5757]',
  popular = 'bg-blue-500',
  eco = 'bg-lime-500'
}
</script>
