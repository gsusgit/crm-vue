<script setup>
import { FormKit } from '@formkit/vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import ClienteService from '../services/ClienteService.js'
import RouterLink from '../components/ui/RouterLink.vue'
import Heading from '../components/ui/Heading.vue'
import Alert from '../components/ui/Alert.vue'

const router = useRouter()
const route = useRoute()
const { id } = route.params
const loading = ref(false)
const formData = reactive({})
const alert = ref({
  message: '',
  type: '',
  link: '',
  page: ''
})
const showAlert = ref(false)

defineProps({
  title: {
    type: String
  }
})

onMounted(() => {
  ClienteService.obtenerCliente(id)
      .then(({data}) => {
        Object.assign(formData, data)
      })
      .catch(error => console.log(error))
})

const handleSubmit = async (data) => {
  showAlert.value = false
  loading.value = true
  try {
    await ClienteService.editarCliente(id, data)
    alert.value = {
      type: 'success',
      title: 'Cliente actualizado',
      message: 'Datos de cliente actualizados con éxito.',
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
          submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes"
          @submit="handleSubmit"
          :value="formData"
          :actions="!loading"
      >
        <FormKit
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Nombre del Cliente es Obligatorio' }"
            v-model="formData.nombre"
            :disabled="loading"
        />

        <FormKit
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Apellido del Cliente es Obligatorio' }"
            v-model="formData.apellido"
            :disabled="loading"
        />

        <FormKit
            type="text"
            label="Email"
            name="email"
            placeholder="Email de Cliente"
            validation="required|email"
            :validation-messages="{ required: 'El Email del Cliente es Obligatorio', email: 'Coloca un email válido' }"
            v-model="formData.email"
            :disabled="loading"
        />

        <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="?matches:/^[6-9]\d{8}$/"
            :validation-messages="{ matches: 'El Formato no es válido' }"
            v-model="formData.telefono"
            :disabled="loading"
        />

        <FormKit
            type="text"
            name="empresa"
            label="Empresa"
            placeholder="Empresa de Cliente"
            v-model="formData.empresa"
            :disabled="loading"
        />

        <FormKit
            type="text"
            name="puesto"
            label="Puesto"
            placeholder="Puesto de Cliente"
            v-model="formData.puesto"
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
