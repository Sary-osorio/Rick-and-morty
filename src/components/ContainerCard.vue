<template>
  <div class="w-4/5">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5"
    >
      <div
        class="col-span-1 w-full rounded-2xl shadow-md shadow-gray-600 sm:h-[470px] cursor-pointer max-w-80"
        v-for="item in data.results"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <div>
          <img
            :src="item.image"
            alt="character"
            class="w-full object-cover rounded-t-2xl"
          />
        </div>
        <div v-if="item.status !== ''" class="mx-3">
          <div v-if="item.status === 'Alive'" class="mt-2">
            <span class="bg-green-200 rounded-md px-3 text-green-500">{{
              item.status
            }}</span>
          </div>
          <div v-else-if="item.status === 'Dead'" class="pt-2">
            <span class="text-red-500 bg-red-200 rounded-md px-3">{{
              item.status
            }}</span>
          </div>
          <div v-else-if="item.status === 'unknown'" class="pt-2">
            <span class="text-gray-500 bg-gray-200 rounded-md px-3">{{
              item.status
            }}</span>
          </div>
        </div>
        <p class="text-orange-600 text-2xl mx-3">{{ item.name }}</p>
        <p v-if="item.type" class="mx-3 mt-1">
          <span class="text-yellow-400">Type: </span>{{ item.type }}
        </p>
        <div
          class="flex flex-col xl:flex-row justify-around mx-3 my-1 pb-4 gap-1"
        >
          <p class="w-full flex flex-column md:flex-row">
            <span class="text-yellow-400 block">Species: </span>
            {{ item.species }}
          </p>
          <p class="w-full flex flex-column md:flex-row">
            <span class="text-yellow-400 block">Gender: </span>
            {{ item.gender }}
          </p>
        </div>
      </div>
    </div>

    <div class="border-t-2 border-gray-600 w-full mt-12">
      <Pagination :info="data.info" @optionsSelected="n => (paginated = n)" />
    </div>
  </div>

  <ModalCard :open="open" :data="itemSelected" @isOpen="open = $event" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRequestStore } from '@/stores/requestApi'
import type { Character, ResponseRequest } from '@/interfaces'
import ModalCard from './ModalCard.vue'
import Pagination from './PaginationComponent.vue'

//definir las props
const props = defineProps({
  status: {
    type: String,
    required: false,
    default: 'All',
  },
})

//declarar constantes
const useRequest = useRequestStore()
const paginated = ref<number>(1)
const open = ref(false)
const itemSelected = ref<Character>()

const data = ref<ResponseRequest>({
  info: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
  results: [],
})

const fetchRequest = async () => {
  try {
    if (props.status && props.status !== 'All') {
      const response = await useRequest.getCharachtersByStatusPages(
        props.status,
        paginated.value,
      )
      data.value = response
      return
    }
    if (paginated.value > 0) {
      const response = await useRequest.getCharactersPage(paginated.value)
      data.value = response
      return
    }
    const response = await useRequest.getCharactersPage(paginated.value)
    data.value = response
  } catch (error) {
    console.log(error)
  }
}

//Modal
const handleClick = (id: number) => {
  open.value = true
  itemSelected.value = data.value.results.find(item => item.id === id)
}

//Cuando se monte el componente
onMounted(() => {
  fetchRequest()
})

//Cuando cambie la paginacion o el status
watch(
  [() => paginated.value, () => props.status],
  ([newPaginated, newStatus], [oldPaginated, oldStatus]) => {
    if (newPaginated !== oldPaginated || newStatus !== oldStatus) {
      fetchRequest()
    }
  },
)
</script>
