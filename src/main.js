import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import qs from 'qs';
import BaiduMap from 'vue-baidu-map'


Vue.prototype.$qs = qs


Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: '0H0UoHGaGfLCRaBoXStO5DfbvDO30TOg'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
