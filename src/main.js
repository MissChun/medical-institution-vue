// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/indexStore'
import * as pbFunc from './assets/utils'
import {
  httpServer
} from './api/index'
import * as filters from '@/assets/js/filter'
import App from './App'

/* 全局注册公用filter */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.pbFunc = pbFunc
Vue.prototype.$$http = httpServer

// console.log('http', http);

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vuex)

Vue.directive('has', {
  bind: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
