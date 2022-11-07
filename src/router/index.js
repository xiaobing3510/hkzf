import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/LoginHome'
import Register from '@/views/RegisterHome'
import Layout from '@/views/Layout/LayoutHome'
import LayoutIndex from '@/views/Layout/LayoutIndex'
import LayoutSearch from '@/views/Layout/LayoutSearch'
import LayoutConsult from '@/views/Layout/LayoutConsult'
import LayoutMy from '@/views/Layout/LayoutMy'

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
    component: Layout,
    children: [
      {
        path: '/',
        component: LayoutIndex
      },
      {
        path: '/search',
        component: LayoutSearch
      },
      {
        path: '/comsult',
        component: LayoutConsult
      },
      {
        path: '/my',
        component: LayoutMy
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
