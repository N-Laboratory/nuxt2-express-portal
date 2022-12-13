import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import { User } from '../../model/User'
import * as storeIndex from '../../store/index'

const initialUser = {
  id: 0,
  name: '',
  password: '',
}
const updateUser = {
  id: 1,
  name: 'Test Name',
  password: 'Test Password',
}

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
