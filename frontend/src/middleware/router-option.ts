import { Store } from 'vuex';
import { Route } from 'vue-router'
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

const prohibitAccessPathList = [
  "/createAccount/confirm",
  "/createAccount/complete",
  "/resetPassword/input",
  "/resetPassword/confirm",
  "/resetPassword/complete",
];

export default function ({ store, from, route, redirect }: {store: Store<{user: User;}>, from: Route, route: Route, redirect: Function}) {
  const isProhibitAccessPath = prohibitAccessPathList.includes(route.path);

  if (from &&
    (
      // アカウント登録完了画面から任意の画面へ遷移
      from.path === createAccountComplete.to ||
      // アカウント確認画面からアカウント登録完了・アカウント登録画面以外へ遷移
      (from.path === createAccountConfirm.to &&
        route.path !== createAccountComplete.to &&
        route.path !== createAccountInput.to) ||
      // アカウント登録画面からアカウント確認画面以外へ遷移
      (from.path === createAccountInput.to &&
        route.path !== createAccountConfirm.to) ||
      // パスワードチェック画面からパスワード登録画面以外へ遷移
      (from.path === resetPasswordCheck.to &&
        route.path !== resetPasswordInput.to) ||
      // パスワード登録画面からパスワード確認画面以外へ遷移
      (from.path === resetPasswordInput.to &&
        route.path !== resetPasswordConfirm.to) ||
      // パスワード確認画面からパスワード変更完了・パスワード登録画面以外へ遷移
      (from.path === resetPasswordConfirm.to &&
        route.path !== resetPasswordInput.to &&
        route.path !== resetPasswordComplete.to) ||
      // パスワード変更完了画面から任意の画面へ遷移
      from.path === resetPasswordComplete.to
    )
  ) {
      const storeUser: User = store.state.user
      if (storeUser && storeUser.name !== '' && storeUser.password !== '') {
        console.log('resetUserInfo')
        // reset store userinfo
        store.commit('resetUser')
      }
    }

  if ((!from || (from && from.path === route.path)) && isProhibitAccessPath) {
    redirect('/login')
  }
}