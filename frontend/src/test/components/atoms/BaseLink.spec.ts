import { mount, Wrapper } from '@vue/test-utils'
import BaseLink from '~/components/atoms/BaseLink.vue'

let wrapper: Wrapper<BaseLink, Element>
let router: any

beforeEach(() => {
  router = { push: jest.fn() }
})

afterEach(() => {
  wrapper.destroy()
})

describe('aタグ押下時の動作確認', () => {
  test('親コンポーネントから受け取った遷移先に遷移すること', () => {
    // Arrange
    wrapper = mount(BaseLink, {
      propsData: {
        path: '/createAccount/input',
      },
      mocks: { $router: router },
    })

    // Act
    wrapper.trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/createAccount/input')
  })

  test('初期値の遷移先に遷移すること', () => {
    // Arrange
    wrapper = mount(BaseLink, {
      mocks: { $router: router },
    })

    // Act
    wrapper.trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/')
  })

  test('遷移中にエラーが発生した場合はエラーページに遷移すること', () => {
    // Arrange
    const nuxtErrorMock = jest.fn()
    wrapper = mount(BaseLink, {
      mocks: { $router: null, $nuxt: { error: nuxtErrorMock } },
    })

    // Act
    wrapper.trigger('click')

    // Assert
    expect(nuxtErrorMock).toHaveBeenCalledTimes(1)
  })
})

test('slotに設定した値が表示されていること', () => {
  // Arrange
  wrapper = mount(BaseLink, {
    slots: {
      default: '進む',
    },
  })

  // Assert
  expect(wrapper.text()).toBe('進む')
})
