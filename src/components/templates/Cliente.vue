<script setup>
  import { RouterLink } from 'vue-router'
  import { computed } from 'vue'

  const props = defineProps({
    cliente: {
      type: Object,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  })

  defineEmits([
      'actualizar-estado',
      'borrar-cliente'
  ])

  const estadoCliente = computed(() => {
    return props.cliente.estado
  })


</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ cliente.nombre }} {{ cliente.apellido }}</p>
      <p class="text-gray-500">{{ cliente.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
      <p class="text-gray-600">{{ cliente.puesto }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
          :class="[estadoCliente ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800']"
          class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
          @click="$emit('actualizar-estado', {id: cliente.id, estado: cliente.estado})"
      >
        {{ estadoCliente ? 'ACTIVO' : 'INACTIVO' }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
      <RouterLink
          :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
          class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 mr-5"
      >Editar</RouterLink>
      <button
        class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        @click="$emit('borrar-cliente', cliente.id)"
      >Eliminar</button>
    </td>
  </tr>
</template>
