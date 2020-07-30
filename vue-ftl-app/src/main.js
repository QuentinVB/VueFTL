import 'es6-promise/auto'

import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'


Vue.config.productionTip = true



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


