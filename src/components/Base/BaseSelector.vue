<template>
  <div class="selector space-y-2">
    <div class="selector-label text-sm text-gray-500">{{ props.label }}</div>
    <select
      class="selector-select text-sm bg-gray-100 p-2 rounded-lg"
      :value="props.selectedOption || props.options[0].value"
      @change="emit('update:selectedOption', $event.target.value)"
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
const emit = defineEmits(['update:selectedOption'])

const props = defineProps({
  options: { type: Array },
  label: { type: String },
  selectedOption: { type: String }
})
</script>
