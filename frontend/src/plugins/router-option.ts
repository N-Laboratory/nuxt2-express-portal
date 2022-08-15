import { Route, NavigationGuardNext } from 'vue-router'
import { Context } from '@nuxt/types'
import { User } from '../model/User'

interface pathList {
  from: string[]
  to: string
}

const createAccountInput: pathList = {
  from: ['/login', '/createAccount/confirm'],
  to: '/createAccount/input',
}
const createAccountConfirm: pathList = {
  from: ['/createAccount/input'],
  to: '/createAccount/confirm',
}
const createAccountComplete: pathList = {
  from: ['/createAccount/confirm'],
  to: '/createAccount/complete',
}
const resetPasswordCheck: pathList = {
  from: ['/login'],
  to: '/resetPassword/check',
}
const resetPasswordInput: pathList = {
  from: ['/resetPassword/check', '/resetPassword/confirm'],
  to: '/resetPassword/input',
}
const resetPasswordConfirm: pathList = {
  from: ['/resetPassword/input'],
  to: '/resetPassword/confirm',
}
const resetPasswordComplete: pathList = {
  from: ['/resetPassword/confirm'],
  to: '/resetPassword/complete',
}

export default (ctx: Context) => {
  ctx.app.router!.beforeEach(
    (to: Route, from: Route, next: NavigationGuardNext) => {
      // 以下の場合はstoreのuser情報を削除
      // 1. アカウント登録完了画面から任意の画面へ遷移
      // 2. アカウント確認画面からアカウント登録完了・アカウント登録画面以外へ遷移
      // 3. アカウント登録画面からアカウント確認画面以外へ遷移
      if (
        from.path === createAccountComplete.to ||
        (from.path === createAccountConfirm.to &&
          to.path !== createAccountComplete.to &&
          to.path !== createAccountInput.to) ||
        (from.path === createAccountInput.to &&
          to.path !== createAccountConfirm.to)
      ) {
        const storeUser: User = ctx.store.state.user
        if (storeUser && storeUser.name !== '' && storeUser.password !== '') {
          console.log('resetUserInfo')
          // reset store userinfo
          ctx.store.commit('resetUser')
        }
      }
      next()
    }
  )
}
