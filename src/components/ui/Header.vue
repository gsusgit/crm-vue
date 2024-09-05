<script setup>
  const navigateToGithubUrlRepo = () => {
    window.open('https://github.com/gsusgit/crm-vue', '_blank')
  }
</script>

<template>
  <nav class="bg-gray-800 border-gray-200 dark:bg-gray-800">
    <div class="max-w-6xl flex flex-wrap items-center justify-between mx-auto py-4">
      <a href="#" @click="event.preventDefault();" class="cursor-default flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../../assets/vue.svg" class="h-8" alt="Vue Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vue CRM</span>
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
        @click="navigateToGithubUrlRepo">
          <img src="../../assets/github-mark.svg" class="h-4 mr-2" alt="Vue Logo" />
          Check on Github
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <router-link :to="'/'">
              <a href="#" class="block py-2 px-3
              text-white rounded md:bg-transparent
              md:p-0">Clientes</a>
            </router-link>
          </li>
          <li>
            <router-link :to="'agregar-cliente'">
              <a href="#" class="block py-2 px-3
              text-white md:p-0">Nuevo cliente</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
