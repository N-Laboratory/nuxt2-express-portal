import Vuex, { Store } from 'vuex'
import { shallowMount } from '@vue/test-utils'
import { localVue, waitPerfectly } from '../../setup'
import Complete from '~/pages/resetPassword/complete.vue'

jest.useFakeTimers()
localVue.use(Vuex)

test('ユーザー情報がStoreに保存されている情報で設定されていること', async () => {
  // Arrange
  const store = new Store({
    state: {
      user: {
        id: 0,
        name: 'Test Name',
        password: 'Test Password',
      },
    },
  })
  const wrapper = shallowMount(Complete, {
    mocks: {
      $store: store,
    },
    localVue,
  })
  await waitPerfectly()

  // Assert
  expect(wrapper.vm.$data.user.name).toBe('Test Name')
  expect(wrapper.vm.$data.user.password).toBe('Test Password')
})
