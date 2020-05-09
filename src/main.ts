import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { MdApp, MdToolbar, MdButton, MdIcon, MdCard, MdList, MdProgress, MdDivider, MdDialog, MdContent, MdBottomBar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import './config'

Vue.config.productionTip = false

Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdCard)
Vue.use(MdList)
Vue.use(MdProgress)
Vue.use(MdDivider)
Vue.use(MdDialog)
Vue.use(MdContent)
Vue.use(MdBottomBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
