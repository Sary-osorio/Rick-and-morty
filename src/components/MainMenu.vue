<template>
  <div class="flex justify-center text-white">
    <div
      class="min-w-[50%] flex justify-center align-baseline mt-6 mb-8 font-bold text-c"
    >
      <button
        :class="[
          activeBtn == 'All'
            ? 'border border-cyan-500  px-6 py-2 min-w-32 rounded-s-md bg-cyan-500'
            : 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32 rounded-s-md',
        ]"
        @click="handleClick('All')"
      >
        All
      </button>
      <button
        :class="[
          activeBtn === 'Alive'
            ? 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32 bg-cyan-500'
            : 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32',
        ]"
        @click="handleClick('Alive')"
      >
        Alive
      </button>
      <button
        :class="[
          activeBtn === 'Dead'
            ? 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32 bg-cyan-500'
            : 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32',
        ]"
        @click="handleClick('Dead')"
      >
        Dead
      </button>
      <button
        :class="[
          activeBtn === 'Unknown'
            ? 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32 rounded-e-md bg-cyan-500'
            : 'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32 rounded-e-md',
        ]"
        @click="handleClick('Unknown')"
      >
        Unknown
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeBtn = ref<string>('All')

const handleClick = (option: string) => {
  activeBtn.value = option
}
</script>
