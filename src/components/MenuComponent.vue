<template>
  <div class="flex justify-center text-white">
    <div
      class="min-w-[50%] flex flex-col md:flex-row justify-center align-baseline mt-6 mb-8 font-bold text-c"
    >
      <button
        v-for="(option, index) in props.options"
        :key="index"
        :class="[
          'border border-cyan-500 hover:bg-cyan-500 px-6 py-2 min-w-32',
          {},
          {
            'md:rounded-s-md': index === 0,
            'md:rounded-e-md': index === props.options.length - 1,
            'bg-cyan-500': activeBtn === option,
          },
        ]"
        @click="handleClick(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true,
  },
})

const activeBtn = ref<string>('All')
const emit = defineEmits(['optionsSelected'])

const handleClick = (option: string) => {
  activeBtn.value = option
  emit('optionsSelected', activeBtn.value)
}
</script>
