<template>
  <div class="pagination-button-list">
    <button
      class="pagination-button bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-full w-10 h-10 cursor-pointer border"
      :class="{ '-translate-y-2 border-black': buttonNumber(n) === props.currentPage }"
      v-for="n in props.buttonsCount"
      :key="buttonNumber(n)"
      @click="emit('click', buttonNumber(n))"
    >
      {{ buttonNumber(n) }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, defineEmits } from 'vue'

const emit = defineEmits(['click'])

const buttonNumber = computed(() => {
  return (n: number) => {
    return n + props.startPage - 1
  }
})

const props = defineProps({
  buttonsCount: { type: Number },
  startPage: { type: Number, default: 1 },
  currentPage: { type: Number, default: 1 }
})
</script>
