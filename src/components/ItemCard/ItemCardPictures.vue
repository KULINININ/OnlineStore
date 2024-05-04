<template>
  <div class="item-pictures">
    <img :src="'src/assets/pictures/' + props.src" :alt="props.alt" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  src: { type: String },
  alt: { type: String }
})
</script>
