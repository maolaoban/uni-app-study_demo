import Vue from 'vue'
import App from './App'
import api from './common/api/index.js'
//挂载到vue实例
Vue.prototype.$api = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
