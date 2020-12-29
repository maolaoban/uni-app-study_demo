import Vue from 'vue'
import App from './App'
import api from './common/api/index.js'
import store from './store/index.js'
//挂载到vue实例
Vue.prototype.$api = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
