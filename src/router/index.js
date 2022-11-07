import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/LoginHome'
import Register from '@/views/RegisterHome'
import Layout from '@/views/Layout/LayoutHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
