import { mount, Wrapper } from '@vue/test-utils'
import { getTestIdSelector, waitPerfectly } from './../../setup'
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
    expect(
      wrapper.find(getTestIdSelector('navbar-burger')).classes()
    ).not.toContain('is-active')
    expect(
      wrapper.find(getTestIdSelector('navbar-menu')).classes()
    ).not.toContain('is-active')
  })

  test('サブメニューが表示されていないこと', () => {
    // Assert
    expect(
      wrapper.find(getTestIdSelector('navbar-dropdown')).classes()
    ).toContain('is-hidden')
  })
})

describe('メニュー表示確認', () => {
  test('未ログイン時はSign up/Sign inメニューが表示されていること', () => {
    // Assert
    expect(wrapper.find(getTestIdSelector('sign-up')).exists()).toBeTruthy()
    expect(wrapper.find(getTestIdSelector('sign-up-text')).text()).toBe(
      'Sign up'
    )
    expect(wrapper.find(getTestIdSelector('sign-in')).exists()).toBeTruthy()
    expect(wrapper.find(getTestIdSelector('sign-in-text')).text()).toBe(
      'Sign in'
    )
    expect(wrapper.find(getTestIdSelector('sign-out')).exists()).toBeFalsy()
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
    expect(wrapper.find(getTestIdSelector('sign-out')).exists()).toBeTruthy()
    expect(wrapper.find(getTestIdSelector('sign-out-text')).text()).toBe(
      'Sign out'
    )
    expect(wrapper.find(getTestIdSelector('sign-up')).exists()).toBeFalsy()
    expect(wrapper.find(getTestIdSelector('sign-in')).exists()).toBeFalsy()
  })

  test('ハンバーガーメニュー押下でドロワーメニューが表示されること', async () => {
    // Arrange
    const classListBeforeClick = wrapper
      .find(getTestIdSelector('navbar-menu'))
      .classes()

    // Act
    wrapper.find(getTestIdSelector('navbar-burger')).trigger('click')
    await waitPerfectly()
    const classListAfterClick = wrapper
      .find(getTestIdSelector('navbar-menu'))
      .classes()

    // Assert
    expect(classListBeforeClick).not.toContain('is-active')
    expect(classListAfterClick).toContain('is-active')
  })

  test('メニュー押下でサブメニューが表示されること', async () => {
    // Arrange
    const classListBeforeClick = wrapper
      .find(getTestIdSelector('navbar-dropdown'))
      .classes()

    // Act
    wrapper.find(getTestIdSelector('navbar-link')).trigger('click')
    await waitPerfectly()
    const classListAfterClick = wrapper
      .find(getTestIdSelector('navbar-dropdown'))
      .classes()

    // Assert
    expect(classListBeforeClick).toContain('is-hidden')
    expect(classListAfterClick).not.toContain('is-hidden')
  })
})

describe('ページ遷移確認', () => {
  test('ホームアイコン押下でログインページに遷移すること', () => {
    // Act
    wrapper.find(getTestIdSelector('home-icon')).trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Sign up押下でログインページに遷移すること', () => {
    // Act
    wrapper.find(getTestIdSelector('sign-up')).trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Sign in押下でログインページに遷移すること', () => {
    // Act
    wrapper.find(getTestIdSelector('sign-in')).trigger('click')

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('Abountメニュー押下でAboutページに遷移すること', () => {
    // Act
    wrapper.find(getTestIdSelector('about-menu')).trigger('click')

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
  wrapper.find(getTestIdSelector('sign-out')).trigger('click')

  // Assert
  expect(logoutSpy).toHaveBeenCalled()
})
