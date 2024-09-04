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

  defineEmits(['actualizar-estado'])

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
          to="/"
          class="text-teal-600 hover:text-teal-900 mr-5"
      >Editar</RouterLink>
      <button
        class="text-red-600 hover:text-red-900"
      >Eliminar</button>
    </td>
  </tr>
</template>
