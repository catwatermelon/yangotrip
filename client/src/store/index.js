import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
const state = {
    
}
  
const getters = {
//
}

const mutations = {
}

const actions = {
//
}

export default new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
    state,
    getters,
    mutations,
    actions,
    modules,
})
  