import { Context } from '@nuxt/types'
import { User } from '../model/User'

export const state = () => ({
  user: {
    id: 0,
    name: '',
    password: '',
  } as User,
})

export const mutations = {
  updateUser(state: { user: User }, user: User) {
    state.user = user
  },
  updateName(state: { user: User }, name: string) {
    state.user.name = name
  },
  updatePassword(state: { user: User }, password: string) {
    state.user.password = password
  },
  resetUser(state: { user: User }) {
    state.user.id = 0
    state.user.name = ''
    state.user.password = ''
  },
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nuxtServerInit(vueContext: any, context: Context) {
    if (context.req.url === '/') {
      context.redirect('/login')
    }
  },
}

// classic mode
// export default () =>
//   new Store({
//     state: () => ({
//       user: new User(0, '', ''),
//     }),
//     mutations: {
//       updateUser(state, payload) {
//         state.user = payload
//       },
//       resetUser(state) {
//         state.user.setId(0)
//         state.user.setName('')
//         state.user.setPassword('')
//       },
//     },
//     actions: {
//       nuxtServerInit(vuexContext, context) {
//         if (context.req.url === '/') {
//           context.redirect('/login')
//         }
//       },
//     },
//   })
