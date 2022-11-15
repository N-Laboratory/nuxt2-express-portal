import { mount, Wrapper } from '@vue/test-utils'
import { getTestIdSelector } from '../setup'
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
    expect(
      wrapper.find(getTestIdSelector('default-header')).exists()
    ).toBeTruthy()
  })

  test('コンテンツが表示されていること', () => {
    // Assert
    expect(
      wrapper.find(getTestIdSelector('default-content')).exists()
    ).toBeTruthy()
  })

  test('フッターが表示されていること', () => {
    // Assert
    expect(
      wrapper.find(getTestIdSelector('default-footer')).exists()
    ).toBeTruthy()
  })
})
