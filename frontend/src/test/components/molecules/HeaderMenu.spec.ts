import { mount, Wrapper } from '@vue/test-utils'
import { waitPerfectly } from './../../setup'
import HeaderMenu from '~/components/molecules/HeaderMenu.vue'
let wrapper: Wrapper<HeaderMenu, Element>
let router: any
jest.useFakeTimers()

beforeEach(() => {
  router = { push: jest.fn() }
  wrapper = mount(HeaderMenu, {
    mocks: {
      $auth: {
        loggedIn: false,
      },
      $router: router,
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('初期表示確認', () => {
  test('メニューのクラスに「is-active」が付加されていないこと', () => {
    // Assert
    expect(wrapper.find('.navbar-burger').classes()).not.toContain('is-active')
    expect(wrapper.find('.navbar-menu').classes()).not.toContain('is-active')
  })

  test('サブメニューが表示されていないこと', () => {
    // Assert
    expect(wrapper.find('.navbar-dropdown').classes()).toContain('is-hidden')
  })
})

describe('メニュー表示確認', () => {
  test('未ログイン時はSign up/Sign inメニューが表示されていること', () => {
    // Assert
    expect(wrapper.find('.button:nth-of-type(1)').exists()).toBeTruthy()
    expect(wrapper.find('.button:nth-of-type(1) span').text()).toBe('Sign up')
    expect(wrapper.find('.button:nth-of-type(2)').exists()).toBeTruthy()
    expect(wrapper.find('.button:nth-of-type(2) span').text()).toBe('Sign in')
  })

  test('ログイン時はSign outメニューが表示されていること', () => {
    // Arrange
    wrapper = mount(HeaderMenu, {
      mocks: {
        $auth: {
          loggedIn: true,
        },
      },
    })

    // Assert
    expect(wrapper.find('.button:nth-of-type(1)').exists()).toBeTruthy()
    expect(wrapper.find('.button:nth-of-type(1) span').text()).toBe('Sign out')
    expect(wrapper.find('.button:nth-of-type(2)').exists()).toBeFalsy()
  })

  test('ハンバーガーメニュー押下でドロワーメニューが表示されること', async () => {
    // Arrange
    const classListBeforeClick = wrapper.find('.navbar-menu').classes()

    // Act
    wrapper.find('.navbar-burger').trigger('click')
    await waitPerfectly()
    const classListAfterClick = wrapper.find('.navbar-menu').classes()

    // Assert
    expect(classListBeforeClick).not.toContain('is-active')
    expect(classListAfterClick).toContain('is-active')
  })

  test('メニュー押下でサブメニューが表示されること', async () => {
    // Arrange
    const classListBeforeClick = wrapper.find('.navbar-dropdown').classes()

    // Act
    wrapper.find('.navbar-link').trigger('click')
    await waitPerfectly()
    const classListAfterClick = wrapper.find('.navbar-dropdown').classes()

    // Assert
    expect(classListBeforeClick).toContain('is-hidden')
    expect(classListAfterClick).not.toContain('is-hidden')
  })
})

describe('ページ遷移確認', () => {
  test('ホームアイコン押下でログインページに遷移すること', () => {
    // Act
    wrapper.find('.fa-house').trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Sign up押下でログインページに遷移すること', () => {
    // Act
    wrapper.find('.button:nth-of-type(1)').trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Sign in押下でログインページに遷移すること', () => {
    // Act
    wrapper.find('.button:nth-of-type(2)').trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Abountメニュー押下でAboutページに遷移すること', () => {
    // Act
    wrapper.find('.navbar-menu .navbar-item:nth-of-type(1)').trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/contents/about')
  })
})

test('Sign out押下でログアウト処理が実行されること', () => {
  // Arrange
  const logoutSpy = jest.fn()
  wrapper = mount(HeaderMenu, {
    mocks: {
      $auth: {
        loggedIn: true,
        logout: logoutSpy,
      },
    },
  })

  // Act
  wrapper.find('.button:nth-of-type(1)').trigger('click')

  // Assert
  expect(logoutSpy).toHaveBeenCalled()
})
