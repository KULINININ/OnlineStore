<template>
  <div class="item-footer mt-2 flex inline justify-between items-center">
    <div class="item-price flex inline text-sm">
      <div
        class="item-price-old text-gray-500 line-through mr-2"
        v-if="props.old_price"
      >
        {{ Math.floor(props.old_price) + '₽' }}
      </div>
      <div class="item-price-current">
        {{ Math.floor(props.current_price) + '₽' }}
      </div>
    </div>
    <div class="item-actions flex items-center">
      <button class="item-actions-in-cart__button" v-if="false">
        <IconCheckCircle />
      </button>
      <button
        class="item-actions-to-cart__button transition duration-300 hover:scale-150"
        v-if="true"
      >
        <IconShoppingCart />
      </button>
      <button
        class="item-actions-like__button ml-2 transition duration-300 hover:scale-150"
      >
        <IconHeart />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import IconCheckCircle from '../../assets/icons/IconCheckCircle.vue'
import IconShoppingCart from '../../assets/icons/IconShoppingCart.vue'
import IconHeart from '../../assets/icons/IconHeart.vue'

const props = defineProps({
  old_price: { type: Number },
  current_price: { type: Number }
})
</script>
