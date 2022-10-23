import { mount, Wrapper } from '@vue/test-utils'
import Error from '~/layouts/error.vue'

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
    expect(wrapper.find('.article-title').text()).toBe(
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
    expect(wrapper.find('.article-title').text()).toBe('エラーが発生しました')
  })
})
