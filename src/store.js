import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userToken: '',
        userName: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.userToken = token
            sessionStorage.userToken = token
        },
        SET_NAME: (state, name) => {
            state.userName = name
            sessionStorage.userName = name
        },
        LOGOUT: (state) => {
            state.userName = ''
            state.userToken = ''
            sessionStorage.clear()
        }
    },
    actions: {

    }
})