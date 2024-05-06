<template>
  <div class="selector space-y-2">
    <div class="selector-label text-sm text-gray-500">{{ props.label }}</div>
    <select
      class="selector-select text-sm bg-gray-100 p-2 rounded-lg"
      v-model="selectedOption"
      @change="handleFilterChange($event.target.value)"
    >
      <option
        class="selector-select__option"
        v-for="option in props.options"
        :key="option.id"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const emit = defineEmits(['selectChange'])

const props = defineProps({
  options: { type: Array },
  label: { type: String }
})

// Set default value
const selectedOption = ref(props.options[0].value)

const handleFilterChange = (value: String) => {
  emit('selectChange', value)
}
</script>
