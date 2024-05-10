<template>
  <div
    class="w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer"
    :class="{ 'bg-green-500': props.checked }"
    :aria-checked="props.checked"
    @click="toggleSwitcher"
  >
    <div
      class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300"
      :class="{ 'translate-x-6': props.checked }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  checked: { type: Boolean, required: true }
})

const emit = defineEmits(['update:checked'])

const toggleSwitcher = () => {
  emit('update:checked', !props.checked)
}
</script>
