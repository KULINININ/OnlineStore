<template>
  <div class="pagination__wrapper flex inline" :class="{ 'pointer-events-none opacity-50': false }">
    <BasePaginationButtonList
      class="pagination-button-list__wrapper-left"
      v-if="leftSideButtonsCount > 0"
      :buttonsCount="leftSideButtonsCount"
      :startPage="leftSideStartPage"
      :currentPage="currentPage"
      @click="goToPage"
    />
    <span
      class="pagination-button-devider-left rounded-full w-10 h-10 text-center"
      v-if="needLeftDevider"
      >...</span
    >
    <BasePaginationButtonList
      class="pagination-button-list__wrapper-middle"
      v-if="middleButtonsCount > 0"
      :buttonsCount="middleButtonsCount"
      :startPage="middleStartPage"
      :currentPage="currentPage"
      @click="goToPage"
    />
    <span
      class="pagination-button-devider-right rounded-full w-10 h-10 text-center"
      v-if="needRightDevider"
      >...</span
    >
    <BasePaginationButtonList
      class="pagination-button-list__wrapper-right"
      v-if="rightSideButtonsCount > 0"
      :buttonsCount="rightSideButtonsCount"
      :startPage="rightSideStartPage"
      :currentPage="currentPage"
      @click="goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import BasePaginationButtonList from './BasePaginationButtonList.vue'

const pageCount = 40
const leftSideButtonsCount = ref(0)
const leftSideStartPage = ref(0)
const middleButtonsCount = ref(0)
const middleStartPage = ref(0)
const rightSideButtonsCount = ref(0)
const rightSideStartPage = ref(0)
const needLeftDevider = ref(false)
const needRightDevider = ref(false)
const currentPage = ref(0)

const goToPage = (page: number) => {
  currentPage.value = page
  updatePagination()
}

const updatePagination = () => {
  if (pageCount >= 9) {
    if (currentPage.value <= 5) {
      console.log('left')
      leftSideButtonsCount.value = 6
      leftSideStartPage.value = 1
      needLeftDevider.value = false

      middleButtonsCount.value = 0
      middleStartPage.value = 0

      rightSideButtonsCount.value = 1
      rightSideStartPage.value = pageCount
      needRightDevider.value = true
    } else if (currentPage.value > 5 && currentPage.value < pageCount - 4) {
      console.log('middle')
      leftSideButtonsCount.value = 1
      leftSideStartPage.value = 1
      needLeftDevider.value = true

      middleButtonsCount.value = 5
      middleStartPage.value = currentPage.value - 2

      rightSideButtonsCount.value = 1
      rightSideStartPage.value = pageCount
      needRightDevider.value = true
    }

    if (currentPage.value >= pageCount - 4) {
      console.log('right')
      leftSideButtonsCount.value = 1
      leftSideStartPage.value = 1
      needLeftDevider.value = true

      middleButtonsCount.value = 0
      middleStartPage.value = 0

      rightSideButtonsCount.value = 6
      rightSideStartPage.value = pageCount - 5
      needRightDevider.value = false
    }
  } else {
    leftSideButtonsCount.value = pageCount
    leftSideStartPage.value = 1
  }
}

const handleScroll = () => {
  const scrolledToBottom: boolean =
    Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop) +
      window.innerHeight >=
    document.documentElement.offsetHeight

  if (scrolledToBottom) {
    console.log('User scrolled to the end of the page')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

updatePagination()
</script>
