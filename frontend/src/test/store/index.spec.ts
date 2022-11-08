import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import { User } from '../../model/User'
import * as storeIndex from '../../store/index'

const initialUser = new User(0, '', '')
const updateUser = new User(1, 'Test Name', 'Test Password')

const localVue = createLocalVue()
localVue.use(Vuex)

let store: Store<{ user: User }>
beforeEach(() => {
  store = new Store(cloneDeep(storeIndex as any))
})

test('storeのユーザー情報が初期化されていること', () => {
  // Assert
  expect(store.state.user).toEqual(initialUser)
})

describe('mutationsの動作確認', () => {
  test('updateUserを実行した場合に、ユーザー情報が更新されること', () => {
    // Arrange
    const userBeforeUpdate = store.state.user

    // Act
    store.commit('updateUser', updateUser)
    const userAfterUpdate = store.state.user

    // Assert
    expect(userBeforeUpdate).toEqual(initialUser)
    expect(userAfterUpdate).toEqual(updateUser)
  })

  test('updateNameを実行した場合に、ユーザー情報のnameが更新されること', () => {
    // Act
    store.commit('updateName', updateUser.name)
    const userAfterUpdate = store.state.user

    // Assert
    expect(userAfterUpdate.id).toEqual(initialUser.id)
    expect(userAfterUpdate.name).toEqual(updateUser.name)
    expect(userAfterUpdate.password).toEqual(initialUser.password)
  })

  test('updatePasswordを実行した場合に、ユーザー情報のpasswordが更新されること', () => {
    // Act
    store.commit('updatePassword', updateUser.password)
    const userAfterUpdate = store.state.user

    // Assert
    expect(userAfterUpdate.id).toEqual(initialUser.id)
    expect(userAfterUpdate.name).toEqual(initialUser.name)
    expect(userAfterUpdate.password).toEqual(updateUser.password)
  })

  test('resetUserを実行した場合に、ユーザー情報が初期状態に更新されること', () => {
    // Arrange
    store.commit('updateUser', updateUser)
    const userBeforeReset = store.state.user

    // Act
    store.commit('resetUser')
    const userAfterReset = store.state.user

    // Assert
    expect(userBeforeReset).toEqual(updateUser)
    expect(userAfterReset).toEqual(initialUser)
  })
})

describe('actionsの動作確認', () => {
  describe('nuxtServerInitの動作確認', () => {
    const redirectMock = jest.fn()
    afterEach(() => {
      redirectMock.mockClear()
    })

    test('アクセス元のURLが/の場合、ログイン画面へ遷移すること', () => {
      // Arrange

      // Act
      store.dispatch('nuxtServerInit', {
        redirect: redirectMock,
        req: { url: '/' },
      })

      // Assert
      expect(redirectMock).toBeCalledWith('/login')
    })

    test('アクセス元のURLが/以外の場合、ログイン画面へ遷移しないこと', () => {
      // Arrange

      // Act
      store.dispatch('nuxtServerInit', {
        redirect: redirectMock,
        req: { url: '/login' },
      })

      // Assert
      expect(redirectMock).not.toBeCalledWith('/login')
    })
  })
})
