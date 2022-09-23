import { mount, Wrapper } from '@vue/test-utils'
import BaseButton from '~/components/atoms/BaseButton.vue'

let wrapper: Wrapper<BaseButton, Element>

beforeEach(() => {
  wrapper = mount(BaseButton)
})

afterEach(() => {
  wrapper.destroy()
})

describe('ボタンタグのテキスト値確認', () => {
  test('親コンポーネントから受け取った値がテキストに設定されていること', () => {
    // Arrange
    wrapper = mount(BaseButton, {
      propsData: {
        text: 'Hello Jest!!',
      },
    })

    // Assert
    expect(wrapper.text()).toBe('Hello Jest!!')
  })

  test('初期値がテキストに設定されていること', () => {
    // Assert
    expect(wrapper.text()).toBe('')
  })
})

test('ボタン押下時にemitされること', () => {
  // Act
  wrapper.find('button').trigger('click')

  // Assert
  expect(wrapper.emitted('click')).toBeTruthy()
})
