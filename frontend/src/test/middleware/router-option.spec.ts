import Vuex, { Store } from 'vuex'
import { Route } from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import { User } from '../..//model/User'
import RouterOption from './../../middleware/router-option'

let from: Route
let redirect: jest.Mock<any, any>
let route: Route
let store: Store<{ user: User }>
let mutations: { resetUser?: jest.Mock<any, any> }

const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  redirect = jest.fn()

  from = {
    path: '',
    hash: '',
    query: {},
    params: {},
    fullPath: '',
    matched: [],
  }

  route = {
    path: '',
    hash: '',
    query: {},
    params: {},
    fullPath: '',
    matched: [],
  }

  mutations = {
    resetUser: jest.fn(),
  }

  store = new Store({
    state: {
      user: {
        id: 0,
        name: 'Test Name',
        password: 'Test Password',
      },
    },
    mutations,
  })
})

describe('storeのユーザ情報削除確認', () => {
  test('storeにnameとpasswordが設定されていない場合はstoreの情報が削除されないこと', () => {
    // Arrange
    from.path = '/createAccount/complete'
    store.state.user = {
      id: 0,
      name: '',
      password: '',
    }

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).not.toHaveBeenCalled()
  })

  // 以降のケースではtestの第一引数の文字数が長すぎるとテストが実行されないので文字数を調整
  test('アカウント登録完了画面から任意の画面へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/createAccount/complete'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('アカウント確認からアカウント登録/完了以外へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/createAccount/confirm'
    route.path = '/login'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('アカウント登録画面からアカウント確認画面以外へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/createAccount/input'
    route.path = '/login'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('パスワードチェック画面からパスワード登録画面以外へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/resetPassword/check'
    route.path = '/login'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('パスワード登録画面からパスワード確認画面以外へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/resetPassword/input'
    route.path = '/login'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('パスワード確認からパスワード変更完了/パスワード登録以外へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/resetPassword/confirm'
    route.path = '/login'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })

  test('パスワード変更完了画面から任意の画面へ遷移時にstore情報が削除されること', () => {
    // Arrange
    from.path = '/resetPassword/complete'

    // Act
    RouterOption({ store, from, route, redirect })

    // Assert
    expect(mutations.resetUser).toHaveBeenCalled()
  })
})

test('直接アクセス禁止のページにアクセスした場合にloginページにリダイレクトされること', () => {
  // Arrange
  from.path = '/createAccount/confirm'
  route.path = '/createAccount/confirm'

  // Act
  RouterOption({ store, from, route, redirect })

  // Assert
  expect(redirect).toBeCalledWith('/login')
})
