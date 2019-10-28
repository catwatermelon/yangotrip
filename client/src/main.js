import Vue from 'vue'
import App from './App'
import axios from './http.js'
import router from './router'

import store from './store'


import '../static/adjust.css'
// Vue.use(store)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

import mandMobile from 'mand-mobile'

import 'mand-mobile/lib/mand-mobile.css'

Vue.use(mandMobile)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
