import { mount, Wrapper } from '@vue/test-utils'
import Default from '~/layouts/default.vue'

let wrapper: Wrapper<Default, Element>

beforeEach(() => {
  wrapper = mount(Default, {
    mocks: {
      $auth: {
        loggedIn: false,
      },
    },
    stubs: {
      nuxt: '<span>Contents</span>',
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('表示確認', () => {
  test('ヘッダーが表示されていること', () => {
    // Assert
    expect(wrapper.find('nav').exists()).toBeTruthy()
  })

  test('コンテンツが表示されていること', () => {
    // Assert
    expect(wrapper.find('.sf-site-content').exists()).toBeTruthy()
  })

  test('フッターが表示されていること', () => {
    // Assert
    expect(wrapper.find('footer').exists()).toBeTruthy()
  })
})
