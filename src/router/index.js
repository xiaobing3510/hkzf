import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/storage'
import { Toast } from 'vant'

Vue.use(Toast)
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/LoginHome')
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterHome')
  },
  {
    path: '/favorate',
    component: () => import('@/views/FavorateHome')
  },
  {
    path: '/rent',
    component: () => import('@/views/RentHome')
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/DetailHome')
  },
  {
    path: '/add',
    component: () => import('@/views/AddHome')
  },
  {
    path: '/city',
    component: () => import('@/views/CityHome')
  },
  {
    path: '/map',
    component: () => import('@/views/MapHome')
  },
  {
    path: '/',
    component: () => import('@/views/Layout/LayoutHome'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/Layout/LayoutIndex')
      },
      {
        path: '/search',
        component: () => import('@/views/Layout/LayoutSearch')
      },
      {
        path: '/consult',
        component: () => import('@/views/Layout/LayoutConsult')
      },
      {
        path: '/my',
        component: () => import('@/views/Layout/LayoutMy')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register', '/index', '/my', '/search', '/consult']
router.beforeEach((to, from, next) => {
  // to去哪里,  from从哪里来,  next是一个函数
  // 只有调用next, 才会正常放行, next(path)
  const token = getToken()
  // 如果有 token 或者要去的页面在白名单, 就直接放行
  if (token || whiteList.includes(to.path)) {
    next()
  } else {
    // 否则就去登录页面
    Toast.fail('请先登录')
    next('/login')
  }
})

export default router
