<template>
  <div
    class="items-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center m-auto"
  >
    <div v-if="isLoading" v-for="id in 10" :key="id" class="items-grid__item-wrapper">
      <ItemCardSkeleton />
    </div>
    <div v-else v-for="item in items" :key="item.id" class="items-grid__item-wrapper flex grow">
      <ItemCard :item="item">
        <template v-slot:label>
          <ItemCardLabel :labelText="'Скидка'" />
        </template>
        <template v-slot:pictures>
          <ItemCardPictures :src="item?.image?.url" :alt="item?.name" />
        </template>
        <template v-slot:code>
          <ItemCardCode :code="item?.code || undefined" />
        </template>
        <template v-slot:name>
          <ItemCardName :name="item?.name" />
        </template>
        <template v-slot:footer>
          <ItemCardFooter
            :old_price="item?.price?.old_price || undefined"
            :current_price="item?.price?.current_price"
          />
        </template>
      </ItemCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import ItemCard from '../ItemCard/ItemCard.vue'
import ItemCardLabel from '../ItemCard/ItemCardLabel.vue'
import ItemCardPictures from '../ItemCard/ItemCardPictures.vue'
import ItemCardCode from '../ItemCard/ItemCardCode.vue'
import ItemCardName from '../ItemCard/ItemCardName.vue'
import ItemCardFooter from '../ItemCard/ItemCardFooter.vue'

import ItemCardSkeleton from '../Skeletons/ItemCardSkeleton.vue'

import { useItemsStore } from '../../stores/items'

const itemsStore = useItemsStore()
const items = computed(() => itemsStore.items)

let isLoading = computed(() => {
  return itemsStore.loading
})

onMounted(() => {})
</script>
