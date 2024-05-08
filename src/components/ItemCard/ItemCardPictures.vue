<template>
  <div class="item-pictures">
    <img :src="'/OnlineStore/pictures/' + props.src" :alt="props.alt" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String },
  alt: { type: String }
})
</script>
