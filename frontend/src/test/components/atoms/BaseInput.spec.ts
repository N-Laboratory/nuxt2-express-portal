import { mount, Wrapper } from '@vue/test-utils'
import BaseInput from '~/components/atoms/BaseInput.vue'

let wrapper: Wrapper<BaseInput, Element>

beforeEach(() => {
  wrapper = mount(BaseInput)
})

afterEach(() => {
  wrapper.destroy()
})

describe('インプットタグの属性値確認', () => {
  test('親コンポーネントから受け取った値が属性値に設定されていること', () => {
    // Arrange
    wrapper = mount(BaseInput, {
      propsData: {
        name: 'textarea',
        placeholder: 'enter text',
        type: 'textarea',
        value: 'Hello Jest!!',
      },
    })

    // Assert
    expect(wrapper.attributes('name')).toBe('textarea')
    expect(wrapper.attributes('placeholder')).toBe('enter text')
    expect(wrapper.attributes('type')).toBe('textarea')
    expect((wrapper.element as HTMLInputElement).value).toBe('Hello Jest!!')
  })

  test('初期値が属性値に設定されていること', () => {
    // Assert
    expect(wrapper.attributes('name')).toBe('')
    expect(wrapper.attributes('placeholder')).toBe('')
    expect(wrapper.attributes('type')).toBe('')
    expect((wrapper.element as HTMLInputElement).value).toBe('')
  })
})

test('インプットタグに入力した値がemitされていること', () => {
  // Arrange
  const inputElement = wrapper.find('input')

  // Act
  inputElement.setValue('input value')
  inputElement.trigger('input')

  // Assert
  expect(wrapper.emitted('input')![1]).toEqual(['input value'])
})
