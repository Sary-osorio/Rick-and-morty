<template>
  <div class="flex justify-center text-white">
    <div
      class="min-w-[50%] flex flex-row justify-center align-baseline mt-6 font-bold text-center"
    >
      <button
        :class="[
          'border border-cyan-500 hover:bg-cyan-500 py-2 min-w-10 md:min-w-16 md:rounded-s-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
        ]"
        :disabled="activeBtn === 1"
        @click="
          () => {
            if (activeBtn > 1) handleClick(activeBtn - 1)
          }
        "
      >
        prev
      </button>
      <button
        v-for="n in visiblePages"
        :key="n"
        :class="[
          'border border-cyan-500 hover:bg-cyan-500  py-2 min-w-10 md:min-w-16 ',
          {},
          {
            'bg-cyan-500': activeBtn === n,
          },
        ]"
        @click="handleClick(n)"
      >
        {{ n }}
      </button>
      <button
        class="border border-cyan-500 hover:bg-cyan-500 py-2 min-w-10 md:min-w-16 md:rounded-e-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        :disabled="activeBtn === props.info.pages"
        @click="
          () => {
            if (activeBtn < props.info.pages) handleClick(activeBtn + 1)
          }
        "
      >
        next
      </button>
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row justify-between px-11 w-full text-gray-400 my-4"
  >
    <p class="md:max-w-max text-center">
      Mostrando {{ activeBtn }} de {{ props.info.pages }} páginas
    </p>
    <p class="md:max-w-max text-center">
      Total: {{ props.info.count }} resultados
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, onMounted, watch } from 'vue'
import type { Count } from '@/interfaces'

const props = defineProps({
  // options: {
  //   type: Array as () => number[],
  //   required: true,
  // },
  // pages: {
  //   type: Number,
  //   required: true,
  // },
  info: {
    type: Object as () => Count,
    required: true,
  },
})

const activeBtn = ref<number>(1)

const emit = defineEmits(['optionsSelected', 'prev', 'next'])
const visiblePages = ref<number[]>([])
let startPage = 1
let endPage = startPage + 4

const handleClick = (option: number) => {
  activeBtn.value = option
  if (activeBtn.value >= 1) emit('optionsSelected', activeBtn.value)
}

const updateVisiblePages = () => {
  visiblePages.value = []
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.value.push(i)
  }
}

// const nextPage = () => {
//   if (endPage <= props.pages) {
//     startPage += 1
//     endPage += 1
//     updateVisiblePages()
//   }
// }

// const prevPage = () => {
//   if (startPage > 1) {
//     startPage -= 1
//     endPage -= 1
//     updateVisiblePages()
//   }
// }

onMounted(() => {
  updateVisiblePages()
})

watch(activeBtn, () => {
  if (endPage < props.info.pages && activeBtn.value === endPage) {
    startPage += 1
    endPage += 1
    updateVisiblePages()
  }
  if (startPage > 1 && activeBtn.value === startPage) {
    startPage -= 1
    endPage -= 1
    updateVisiblePages()
  }
})
</script>
