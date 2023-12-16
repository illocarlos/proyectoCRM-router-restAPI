import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      props: { titulo: 'clientes' }

    },
    {
      path: '/nuevo-cliente',
      name: 'nuevo-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props: { titulo: 'nuevo cliente' }
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClienteView.vue'),
      props: { titulo: 'editar cliente' }
    }
  ]
})

export default router
