<template>
  <div
    class="item-card flex flex-col bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
  >
    <slot name="label"></slot>
    <slot name="pictures"></slot>
    <slot name="code"></slot>
    <slot name="name"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
