import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'

const routes = [
    {
        path: '/',
        name: 'inicio',
        component: Inicio,
        props: {
            title: 'Listado de clientes'
        }
    },
    {
        path: '/agregar-cliente',
        name: 'agregar-cliente',
        component: () => import('../views/NuevoClienteView.vue'),
        props: {
            title: 'Nuevo cliente'
        }
    },
    {
        path: '/editar-cliente/:id',
        name: 'editar-cliente',
        component: () => import('../views/EditarClienteView.vue'),
        props: {
            title: 'Editar cliente'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
