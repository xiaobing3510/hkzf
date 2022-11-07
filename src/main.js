import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Form, Field, Button, NavBar, Toast, Tabbar, TabbarItem, Grid, GridItem, Dialog } from 'vant'

Vue.use(Dialog)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
