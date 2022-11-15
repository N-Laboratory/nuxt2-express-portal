import { mount, Wrapper } from '@vue/test-utils'
import { getTestIdSelector, waitPerfectly } from '../setup'
import Error from '~/layouts/error.vue'
jest.useFakeTimers()

let wrapper: Wrapper<Error, Element>

afterEach(() => {
  wrapper.destroy()
})

describe('メッセージ表示確認', () => {
  test('存在しないページのリクエストをした場合に、専用のメッセージが表示されていること', () => {
    // Arrange
    wrapper = mount(Error, {
      propsData: {
        error: {
          statusCode: 404,
        },
      },
    })

    // Assert
    expect(wrapper.find(getTestIdSelector('error-title')).text()).toBe(
      'お探しのページが見つかりません'
    )
  })

  test('エラーが発生した場合に、専用のメッセージが表示されていること', () => {
    // Arrange
    wrapper = mount(Error, {
      propsData: {
        error: {
          statusCode: 500,
        },
      },
    })

    // Assert
    expect(wrapper.find(getTestIdSelector('error-title')).text()).toBe(
      'エラーが発生しました'
    )
  })
})

describe('TOPページへ戻る押下時の動作確認', () => {
  test('TOPページへ戻るを押下した場合は、TOPページへ遷移すること', async () => {
    // Arrange
    const router = { push: jest.fn() }
    wrapper = mount(Error, {
      propsData: {
        error: {
          statusCode: 500,
        },
      },
      mocks: {
        $router: router,
      },
    })

    // Act
    await wrapper.find(getTestIdSelector('error-go-top')).trigger('click')
    await waitPerfectly()

    // Assert
    expect(router.push).toBeCalledWith('/login')
  })

  test('TOPページへの遷移に失敗した場合はエラー画面へ遷移すること', async () => {
    // Arrange
    const nuxtError = { error: jest.fn() }
    wrapper = mount(Error, {
      propsData: {
        error: {
          statusCode: 500,
        },
      },
      mocks: {
        $router: { push: null },
        $nuxt: nuxtError,
      },
    })

    // Act
    await wrapper.find(getTestIdSelector('error-go-top')).trigger('click')
    await waitPerfectly()

    // Assert
    expect(nuxtError.error).toHaveBeenCalled()
  })
})
