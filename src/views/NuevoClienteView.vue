<script setup>
  import RouterLink from '../components/ui/RouterLink.vue'
  import Heading from '../components/ui/Heading.vue'

  defineProps({
    title: {
      type: String
    }
  })
</script>

<template>
  <div class="flex justify-between">
    <Heading>
      {{ title }}
    </Heading>
    <RouterLink :to="'inicio'">
      Volver
    </RouterLink>
  </div>
</template>
