import Vuex, { Store } from 'vuex'
import { shallowMount, Wrapper } from '@vue/test-utils'
import { localVue, waitPerfectly } from '../../setup'
import { User } from '../../../model/User'
import Input from '~/pages/resetPassword/input.vue'

jest.useFakeTimers()
localVue.use(Vuex)

const nuxtError = { error: jest.fn() }
const router = { push: jest.fn(), go: jest.fn() }
const mutations = { updatePassword: jest.fn() }

let wrapper: Wrapper<Input & { [key: string]: any }>
let store: Store<{ user: User }>

beforeEach(async () => {
  store = new Store({
    state: {
      user: new User(0, 'Test Name', 'Test Password'),
    },
    mutations,
  })
  wrapper = shallowMount(Input, {
    mocks: {
      $store: store,
      $router: router,
      $nuxt: nuxtError,
    },
    localVue,
  })
  await waitPerfectly()
})

afterEach(() => {
  wrapper.destroy()
  nuxtError.error.mockReset()
  router.push.mockReset()
})

describe('computedの動作確認', () => {
  test('computedのget()が呼び出された場合にstoreのユーザー情報を返却すること', () => {
    // Assert
    expect(wrapper.vm.computedUser.name).toEqual('Test Name')
    expect(wrapper.vm.computedUser.password).toEqual('Test Password')
  })

  test('computedのset()が呼び出された場合にstoreのユーザー情報のパスワードを更新すること', async () => {
    // Arrange
    wrapper.vm.computedUser = 'Update Passowrd'
    await waitPerfectly()

    // Assert
    expect(mutations.updatePassword).toHaveBeenCalled()
  })
})

describe('次へ押下時の動作確認', () => {
  test('次へを押下した場合は、次画面へ遷移すること', async () => {
    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(router.push).toBeCalledWith('confirm')
  })

  test('次画面への遷移に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    wrapper = shallowMount(Input, {
      mocks: {
        $store: store,
        $router: { push: null },
        $nuxt: nuxtError,
      },
      localVue,
    })

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(nuxtError.error).toHaveBeenCalled()
  })
})
