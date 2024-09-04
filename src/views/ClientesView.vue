<script setup>

  import { computed, onMounted, ref } from 'vue'
  import ClienteService from '../services/ClienteService.js'
  import RouterLink from '../components/ui/RouterLink.vue'
  import Heading from '../components/ui/Heading.vue'
  import Spinner from '../components/ui/Spinner.vue'
  import Alert from '../components/ui/Alert.vue'
  import Cliente from '../components/templates/Cliente.vue'
  import Modal from '../components/ui/Modal.vue'

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
  const modal = ref({
    message: 'Confirmar borrado de cliente',
    show: false,
    id: ''
  })

  const existenClientes = computed(() => {
    return clientes.value.length > 0
  })

  onMounted(() => {
    loading.value = true
    showAlert.value = false
    obtenerClientes()
  })

  const obtenerClientes = () => {
    setTimeout(async () => {
      ClienteService.obtenerClientes()
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
  }

  const actualizarEstado = ({id, estado}) => {
    ClienteService.cambiarEstado(id, {estado: !estado})
        .then(() =>  {
          const i = clientes.value.findIndex(cliente => cliente.id === id)
          clientes.value[i].estado = !estado
        })
        .catch(() => {
          alert.value ={
            type: 'error',
            message: 'Ocurrió un error al intentar actualizar el estado del cliente, inténtelo de nuevo más tarde.',
            link: '',
            page: ''
          }
          showAlert.value = true
        })
  }

  const borrarCliente = (id) => {
    modal.value.show = true
    modal.value.id = id
  }

  const confimarBorradoCliente = () => {
    modal.value.show = false
    loading.value = true
    ClienteService.borrarCliente(modal.value.id)
        .then(() => {
          obtenerClientes()
          alert.value ={
            type: 'success',
            message: 'Cliente eliminado de la plataforma con éxito.',
            link: '',
            page: ''
          }
          showAlert.value = true
        })
        .catch(() => {
          alert.value ={
            type: 'error',
            message: 'Ocurrió un error al intentar borrar el cliente, inténtelo de nuevo más tarde.',
            link: '',
            page: ''
          }
          showAlert.value = true
        })
  }

  const resetearClientes = () => {
    loading.value = true
    clientes.value.forEach(cliente => {
      ClienteService.borrarCliente(cliente.id)
          .then()
          .catch(() => {
            alert.value ={
              type: 'error',
              message: 'Ocurrió un error al intentar borrar clientes, inténtelo de nuevo más tarde.',
              link: '',
              page: ''
            }
            showAlert.value = true
          })
          .finally(() => {
            clientes.value = []
            loading.value = false
            alert.value ={
              type: 'success',
              message: 'Clientes eliminados de la plataforma con éxito.',
              link: '',
              page: ''
            }
            showAlert.value = true
          })
    });
  }

</script>

<template>
  <Modal
      :modal="modal"
      @confirmar-borrado-cliente="confimarBorradoCliente"
  />
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
        v-if="showAlert && !loading"
        :alert="alert"
    />
    <div v-if="existenClientes && !loading" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
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
              <Cliente
                  v-for="cliente in clientes"
                  :cliente="cliente"
                  :key="cliente.id"
                  @actualizar-estado="actualizarEstado"
                  @borrar-cliente="borrarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="existenClientes && !loading" class="flow-root mx-auto mt-5">
      <button
          type="button"
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
              font-medium rounded-lg text-sm inline-flex items-center px-5
              py-2.5 text-center"
          @click="resetearClientes"
      >
        Borrar clientes
      </button>
    </div>
  </div>
</template>
