import { mount, Wrapper } from '@vue/test-utils'
import { User } from '../../../model/User'
import Index from '~/pages/myPage/index.vue'

let wrapper: Wrapper<Index, Element>
jest.useFakeTimers()

beforeEach(() => {
  wrapper = mount(Index, {
    mocks: {
      $auth: {
        user: {
          id: 0,
          name: 'Test Name',
          password: 'Test Password',
        },
      },
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

test('ユーザー情報がStoreに保存されている情報で設定されていること', () => {
  // Assert
  expect(wrapper.vm.$data.user.name).toBe('Test Name')
  expect(wrapper.vm.$data.user.password).toBe('Test Password')
})

test('プロフェール欄にユーザー情報（Name）が表示されていること', () => {
  // Assert
  expect(wrapper.find('table tr:nth-of-type(2) td:nth-of-type(2)').text()).toBe(
    'Test Name'
  )
})
