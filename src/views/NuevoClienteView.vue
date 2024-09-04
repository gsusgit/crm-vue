<script setup>
  import { FormKit } from '@formkit/vue'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import ClienteService from '../services/ClienteService.js'
  import RouterLink from '../components/ui/RouterLink.vue'
  import Heading from '../components/ui/Heading.vue'
  import Alert from '../components/ui/Alert.vue'

  defineProps({
    title: {
      type: String
    }
  })

  const clientes = ref([])

  const alert = ref({
    message: '',
    type: '',
    link: '',
    page: ''
  })
  const showAlert = ref(false)

  const formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: ''
  }

  const router = useRouter()

  const loading = ref(false)

  const handleSubmit = async (form) => {
    showAlert.value = false
    loading.value = true
    try {
      const { data } = await ClienteService.obtenerClientes()
      if (data.length > 0) {
        clientes.value = data
        const emailExists = clientes.value.find(cliente => cliente.email === form.email)
        if (emailExists) {
          alert.value = {
            type: 'warning',
            title: 'Datos no válidos',
            message: 'Ya existe un cliente con ese email.',
            link: '',
            page: ''
          }
          setTimeout(() => {
            loading.value = false
            showAlert.value = true
          }, 3000)
          return
        }
      }
      await ClienteService.nuevoCliente({
        ...form,
        estado: true
      })
      alert.value = {
        type: 'success',
        title: 'Cliente añadido',
        message: 'Cliente registrado con éxito en la plataforma.',
        link: '/',
        page: 'listado de clientes'
      }
      setTimeout(() => {
        showAlert.value = true
      }, 3000)
      setTimeout(() => {
        router.push({ name: 'inicio' })
      }, 6000)
    } catch (error) {
      alert.value = {
        type: 'error',
        title: 'Oops!',
        message: 'Ocurrió un error al procesar la solicitud, inténtelo de nuevo más tarde.',
        link: '',
        page: ''
      }
      setTimeout(() => {
        loading.value = false
        showAlert.value = true
      }, 3000)
    }
  }

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
  <div class="mx-auto mt-10 bg-white shadow rounded">
    <div class="mx-auto md:w-2/3 py-20 px-6">
      <div class="mb-4">
        <Alert
            v-if="showAlert"
            :alert="alert"
        />
      </div>
      <FormKit
          type="form"
          submit-label="Añadir cliente"
          incomplete-message="No se pudo enviar, revisa los errores"
          @submit="handleSubmit"
          :actions="!loading"
      >
        <FormKit
            type="text"
            label="Nombre"
            placeholder="Nombre"
            validation="required"
            :validation-messages="{ required: 'El nombre es obligatorio' }"
            name="nombre"
            :value="formData.nombre"
            :disabled="loading"
        />
        <FormKit
            type="text"
            label="Apellido"
            placeholder="Apellido"
            validation="required"
            :validation-messages="{ required: 'El apellido es obligatorio' }"
            name="apellido"
            :value="formData.apellido"
            :disabled="loading"
        />
        <FormKit
            type="email"
            label="Email"
            placeholder="Email"
            validation="required|email"
            :validation-messages="{ required: 'El email es obligatorio', email: 'Escribe un email válido' }"
            name="email"
            :value="formData.email"
            :disabled="loading"
        />
        <FormKit
            type="text"
            label="Teléfono"
            placeholder="Teléfono: XXXXXXXXX"
            validation="?matches:/^[6-9]\d{8}$/"
            :validation-messages="{ matches: 'Escribe un teléfono correcto' }"
            name="telefono"
            :value="formData.telefono"
            :disabled="loading"
        />
        <FormKit
            type="text"
            label="Empresa"
            placeholder="Empresa"
            name="empresa"
            :value="formData.empresa"
            :disabled="loading"
        />
        <FormKit
            type="text"
            label="Puesto"
            placeholder="Puesto"
            name="puesto"
            :value="formData.puesto"
            :disabled="loading"
        />
      </FormKit>
    </div>
  </div>
</template>

<style>
  .formkit-wrapper {
    max-width: 100%;
    width: 100%;
  }
  [data-type="submit"] .formkit-input {
    margin-top: 1rem;
    font-weight: bold;
    background: #059669;
  }
  [data-type="submit"] .formkit-input:hover {
    background: #066044;
  }
  .formkit-label, .formkit-input {
    font-family: 'Poppins', sans-serif;
  }
</style>
