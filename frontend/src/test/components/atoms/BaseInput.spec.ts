import { mount, Wrapper } from '@vue/test-utils'
import BaseInput from '~/components/atoms/BaseInput.vue'

let wrapper: Wrapper<any, Element>

beforeEach(() => {
  wrapper = mount(BaseInput)
})

afterEach(() => {
  wrapper.destroy()
})

describe('インプットタグの属性値確認', () => {
  test('親コンポーネントから値を受け取った場合', () => {
    wrapper = mount(BaseInput, {
      propsData: {
        name: 'textarea',
        placeholder: 'enter text',
        type: 'textarea',
        value: 'Hello Jest!!',
      },
    })

    expect(wrapper.attributes('name')).toBe('textarea')
    expect(wrapper.attributes('placeholder')).toBe('enter text')
    expect(wrapper.attributes('type')).toBe('textarea')
    expect((wrapper.element as HTMLInputElement).value).toBe('Hello Jest!!')
  })

  test('親コンポーネントから値を受け取らなかった場合', () => {
    expect(wrapper.attributes('name')).toBe('')
    expect(wrapper.attributes('placeholder')).toBe('')
    expect(wrapper.attributes('type')).toBe('')
    expect((wrapper.element as HTMLInputElement).value).toBe('')
  })
})

test('インプットタグに値を入力した場合', () => {
  const inputElement = wrapper.find('input')
  inputElement.setValue('input value')
  inputElement.trigger('input')
  expect(wrapper.emitted('input')![1]).toEqual(['input value'])
})
