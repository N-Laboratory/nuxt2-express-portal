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
      if (
        // アカウント登録完了画面から任意の画面へ遷移
        from.path === createAccountComplete.to ||
        // アカウント確認画面からアカウント登録完了・アカウント登録画面以外へ遷移
        (from.path === createAccountConfirm.to &&
          to.path !== createAccountComplete.to &&
          to.path !== createAccountInput.to) ||
        // アカウント登録画面からアカウント確認画面以外へ遷移
        (from.path === createAccountInput.to &&
          to.path !== createAccountConfirm.to) ||
        // パスワードチェック画面からパスワード登録画面以外へ遷移
        (from.path === resetPasswordCheck.to &&
          to.path !== resetPasswordInput.to) ||
        // パスワード登録画面からパスワード確認画面以外へ遷移
        (from.path === resetPasswordInput.to &&
          to.path !== resetPasswordConfirm.to) ||
        // パスワード確認画面からパスワード変更完了・パスワード登録画面以外へ遷移
        (from.path === resetPasswordConfirm.to &&
          to.path !== resetPasswordInput.to &&
          to.path !== resetPasswordComplete.to) ||
        // パスワード変更完了画面から任意の画面へ遷移
        from.path === resetPasswordComplete.to
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
