<script setup>
  import { RouterView } from 'vue-router'
  import Header from './components/ui/Header.vue'
</script>

<template>
  <header>
    <Header />
  </header>
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>

