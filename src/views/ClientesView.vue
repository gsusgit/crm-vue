<script setup>

import { computed, onMounted, ref } from 'vue'
  import axios from 'axios'
  import RouterLink from '../components/ui/RouterLink.vue'
  import Heading from '../components/ui/Heading.vue'
  import Spinner from '../components/ui/Spinner.vue'
  import Alert from '../components/ui/Alert.vue'

  defineProps({
    title: {
      type: String
    }
  })

  const clientes = ref([])
  const loading = ref(false)
  const alert = ref({
    message: '',
    type: '',
    link: '',
    page: ''
  })
  const showAlert = ref(false)

  const existenClientes = computed(() => {
    return clientes.value.length > 0
  })

  onMounted(() => {
    loading.value = true
    showAlert.value = false
    setTimeout(async () => {
      axios('http://localhost:4000/clientes')
          .then(({ data }) => {
            if (data.length === 0) {
              alert.value = {
                type: 'warning',
                message: 'Actualmente no existen clientes, prueba a añadir un cliente nuevo.',
                link: '',
                page: ''
              }
              showAlert.value = true
            } else {
              clientes.value = data
            }
          })
          .catch(() => {
            alert.value ={
              type: 'error',
              message: 'Ocurrió un error al obtener clientes, inténtelo de nuevo más tarde.',
              link: '',
              page: ''
            }
            showAlert.value = true
          })
          .finally(() => loading.value = false)
    }, 1500)
  })

</script>

<template>
  <Spinner v-if="loading"/>
  <div v-else class="flex justify-between">
    <Heading>
      {{ title }}
    </Heading>
    <RouterLink :to="'agregar-cliente'">
      Nuevo cliente
    </RouterLink>
  </div>
  <div class="mt-4">
    <Alert
        v-if="showAlert"
        :alert="alert"
    />
    <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
              <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
