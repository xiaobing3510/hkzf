import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Form, Field, Button, NavBar, Toast } from 'vant'

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
