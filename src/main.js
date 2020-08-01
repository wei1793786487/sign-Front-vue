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

import moment from 'moment'//导入文件
 
import echarts from 'echarts'



Vue.prototype.$echarts = echarts


Vue.prototype.$moment = moment;//赋值使用

Vue.prototype.$qs = qs


Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
