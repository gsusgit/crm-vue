<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="bg-gray-950">
      <div class="mx-auto max-w-6xl py-10">
        <h1 class="text-3xl font-extrabold text-emerald-600">
          Vue CRM
        </h1>
      </div>
    </div>
  </header>
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>

