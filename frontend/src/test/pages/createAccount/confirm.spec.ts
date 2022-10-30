import Vuex, { Store } from 'vuex'
import { shallowMount, Wrapper } from '@vue/test-utils'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { importValidationRules, localVue, waitPerfectly } from '../../setup'
import { User } from '../../../model/User'
import { initializeAxios } from '../../../utils/api'
import Confirm from '~/pages/createAccount/confirm.vue'

jest.useFakeTimers()
importValidationRules()
localVue.use(Vuex)

const nuxtError = { error: jest.fn() }
const router = { push: jest.fn(), go: jest.fn() }

let wrapper: Wrapper<Confirm & { [key: string]: any }>
let store: Store<{ user: User }>

beforeEach(async () => {
  store = new Store({
    state: {
      user: new User(0, 'Test Name', 'Test Password'),
    },
  })
  wrapper = shallowMount(Confirm, {
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
  test('次へを押下した場合は、次画面へ遷移すること', async () => {
    // Arrange
    initializeAxios({
      $post: jest.fn().mockResolvedValue(Promise.resolve),
    } as unknown as NuxtAxiosInstance)

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(router.push).toBeCalledWith('complete')
  })

  test('次画面への遷移に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    initializeAxios({
      $post: jest.fn().mockResolvedValue(Promise.resolve),
    } as unknown as NuxtAxiosInstance)
    wrapper = shallowMount(Confirm, {
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

  test('axiosのHTTP通信に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    initializeAxios({
      // eslint-disable-next-line prefer-promise-reject-errors
      $post: jest.fn().mockResolvedValue(Promise.reject()),
    } as unknown as NuxtAxiosInstance)

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(nuxtError.error).toHaveBeenCalled()
  })
})

describe('戻る押下時の動作確認', () => {
  test('戻るを押下した場合は、一つ前の画面へ遷移すること', async () => {
    // Act
    wrapper.vm.goBack()
    await waitPerfectly()

    // Assert
    expect(router.go).toHaveBeenCalled()
  })

  test('一つ前の画面への遷移に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    wrapper = shallowMount(Confirm, {
      mocks: {
        $store: store,
        $router: { go: null },
        $nuxt: nuxtError,
      },
      localVue,
    })

    // Act
    wrapper.vm.goBack()
    await waitPerfectly()

    // Assert
    expect(nuxtError.error).toHaveBeenCalled()
  })
})
