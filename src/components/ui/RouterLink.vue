<script setup>
  import { RouterLink } from 'vue-router'

  defineProps({
    to: {
      type: String
    }
  })
</script>

<template>
  <RouterLink
      class="block md:inline-block rounded bg-emerald-600 px-3 text-white py-2 uppercase font-bold text-sm shadow hover:bg-emerald-700"
      :to="{ name: to }">
    <slot></slot>
  </RouterLink>
</template>
