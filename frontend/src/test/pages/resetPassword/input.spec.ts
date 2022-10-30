import Vuex, { Store } from 'vuex'
import { shallowMount, Wrapper } from '@vue/test-utils'
import { localVue, waitPerfectly } from '../../setup'
import { User } from '../../../model/User'
import Input from '~/pages/resetPassword/input.vue'

jest.useFakeTimers()
localVue.use(Vuex)

const nuxtError = { error: jest.fn() }
const router = { push: jest.fn(), go: jest.fn() }
const mutations = { updateUser: jest.fn() }

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

test('ユーザー情報がStoreに保存されている情報で設定されていること', () => {
  // Assert
  expect(wrapper.vm.$data.user.name).toBe('Test Name')
  expect(wrapper.vm.$data.user.password).toBe('Test Password')
})

describe('次へ押下時の動作確認', () => {
  test('次へを押下した場合は、storeに情報を保存して次画面へ遷移すること', async () => {
    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(mutations.updateUser).toHaveBeenCalled()
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
