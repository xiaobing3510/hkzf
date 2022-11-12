import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/common.css'
import './assets/fonts/iconfont/iconfont.css'
import { Form, Field, Button, NavBar, Toast, Tabbar, TabbarItem, Grid, GridItem, Dialog, List, Cell, Swipe, SwipeItem, Search, Icon, IndexBar, IndexAnchor, Popup, Picker, Uploader, DropdownMenu, DropdownItem, Area } from 'vant'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YG6FWvUCFD9OHxnqDe5swjUo1pLsP25u'
})
Vue.use(Area)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Uploader)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Form)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Cell)
Vue.use(List)
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
