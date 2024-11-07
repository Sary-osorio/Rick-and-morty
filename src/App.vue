<template>
  <header>
    <h1 class="text-4xl text-center font-bold text-sky-500 p-4">
      Rick and Morty
    </h1>
    <!-- <MainMenu /> -->
    <MenuComponent
      :options="['All', 'Alive', 'Dead', 'Unknown']"
      @options-selected="d => (option = d)"
    />
  </header>

  <main>
    <ContainerCard :status="option" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContainerCard from './components/ContainerCard.vue'
// import MainMenu from './components/MainMenu.vue'
import MenuComponent from './components/MenuComponent.vue'

const option = ref<string>('All')
</script>
<style scoped></style>
