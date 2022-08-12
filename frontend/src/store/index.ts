import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { User } from '../model/User'

Vue.use(Vuex)

export default () =>
  new Store({
    state: () => ({
      user: new User(0, '', ''),
    }),
    mutations: {
      updateUser(state, payload) {
        state.user = payload
      },
      resetUser(state) {
        state.user.setId(0)
        state.user.setName('')
        state.user.setPassword('')
      },
    },
  })
