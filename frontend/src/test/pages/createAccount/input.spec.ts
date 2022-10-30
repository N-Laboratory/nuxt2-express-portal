import Vuex, { Store } from 'vuex'
import { shallowMount, Wrapper } from '@vue/test-utils'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import Sweetalert from 'vue-sweetalert2'
import { importValidationRules, localVue, waitPerfectly } from '../../setup'
import { User } from '../../../model/User'
import { initializeAxios } from '../../../utils/api'
import Input from '~/pages/createAccount/input.vue'

jest.useFakeTimers()
importValidationRules()
localVue.use(Vuex)
localVue.use(Sweetalert)

const mutations = { updateUser: jest.fn() }
const nuxtError = { error: jest.fn() }
const router = { push: jest.fn() }
const swal = jest.fn()

let wrapper: Wrapper<Input & { [key: string]: any }>
let store: Store<{ user: User }>

beforeEach(async () => {
  store = new Store({
    state: {
      user: new User(0, '', ''),
    },
    mutations,
  })
  wrapper = shallowMount(Input, {
    mocks: {
      $store: store,
      $router: router,
      $nuxt: nuxtError,
      $swal: swal,
    },
    localVue,
  })
  await waitPerfectly()
})

afterEach(() => {
  wrapper.destroy()
  mutations.updateUser.mockReset()
  nuxtError.error.mockReset()
  router.push.mockReset()
  swal.mockReset()
})

describe('ユーザー情報の確認', () => {
  test('Storeにユーザー情報が存在しない場合は初期値のままであること', () => {
    // Assert
    expect(wrapper.vm.$data.user.name).toBe('')
    expect(wrapper.vm.$data.user.password).toBe('')
  })

  test('Storeにユーザー情報が存在する場合はStoreのユーザー情報が設定されていること', () => {
    // Arrange
    store = new Store({
      state: {
        user: new User(0, 'Test name', 'Test password'),
      },
      mutations,
    })
    wrapper = shallowMount(Input, {
      mocks: {
        $store: store,
        $router: router,
        $nuxt: nuxtError,
        $swal: swal,
      },
      localVue,
    })

    // Assert
    expect(wrapper.vm.$data.user.name).toBe('Test name')
    expect(wrapper.vm.$data.user.password).toBe('Test password')
  })
})

describe('次へ押下時の動作確認', () => {
  test('既存ユーザーが存在する場合は、エラーメッセージ(SweetAlert)が表示されること', async () => {
    // Arrange
    initializeAxios({
      $post: jest.fn().mockResolvedValue(true),
    } as unknown as NuxtAxiosInstance)

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(swal).toHaveBeenCalled()
  })

  test('既存ユーザーが存在しない場合は、Storeにユーザー情報を登録して次画面へ遷移すること', async () => {
    // Arrange
    initializeAxios({
      $post: jest.fn().mockResolvedValue(false),
    } as unknown as NuxtAxiosInstance)

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()

    // Assert
    expect(swal).not.toHaveBeenCalled()
    expect(mutations.updateUser).toHaveBeenCalled()
    expect(router.push).toBeCalledWith('confirm')
  })

  test('次画面への遷移に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    initializeAxios({
      $post: jest.fn().mockResolvedValue(false),
    } as unknown as NuxtAxiosInstance)
    wrapper = shallowMount(Input, {
      mocks: {
        $store: store,
        $router: { push: null },
        $nuxt: nuxtError,
        $swal: swal,
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
