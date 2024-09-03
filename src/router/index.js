import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Inicio
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
