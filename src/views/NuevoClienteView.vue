<script setup>
  import { FormKit } from '@formkit/vue'
  import RouterLink from '../components/ui/RouterLink.vue'
  import Heading from '../components/ui/Heading.vue'

  defineProps({
    title: {
      type: String
    }
  })

  const formData = {
    nombre: 'Jesús',
    apellido: 'Fernández',
    email: 'jesus.fernandez@gesthispania.com',
    telefono: '615810191',
    empresa: 'Gesthispania',
    puesto: 'Frontend Developer'
  }

  const handleSubmit = (data) => {
    console.log(data)
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
      <FormKit
          type="form"
          submit-label="Añadir cliente"
          incomplete-message="No se pudo enviar, revisa los errores"
          @submit="handleSubmit"
      >
        <FormKit
            type="text"
            label="Nombre"
            placeholder="Nombre"
            validation="required"
            :validation-messages="{ required: 'El nombre es obligatorio' }"
            name="nombre"
            :value="formData.nombre"
        />
        <FormKit
            type="text"
            label="Apellido"
            placeholder="Apellido"
            validation="required"
            :validation-messages="{ required: 'El apellido es obligatorio' }"
            name="apellido"
            :value="formData.apellido"
        />
        <FormKit
            type="email"
            label="Email"
            placeholder="Email"
            validation="required|email"
            :validation-messages="{ required: 'El email es obligatorio', email: 'Escribe un email válido' }"
            name="email"
            :value="formData.email"
        />
        <FormKit
            type="text"
            label="Teléfono"
            placeholder="Teléfono: XXXXXXXXX"
            validation="+matches:/^[6-9]{3}[0-9]{3}[0-9]{3}/"
            :validation-messages="{ matches: 'Escribe un teléfono correcto' }"
            name="telefono"
            :value="formData.telefono"
        />
        <FormKit
            type="text"
            label="Empresa"
            placeholder="Empresa"
            name="empresa"
            :value="formData.empresa"
        />
        <FormKit
            type="text"
            label="Puesto"
            placeholder="Puesto"
            name="puesto"
            :value="formData.puesto"
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
