import { mount, Wrapper } from '@vue/test-utils'
import BaseButton from '~/components/atoms/BaseButton.vue'

let wrapper: Wrapper<any, Element>

beforeEach(() => {
  wrapper = mount(BaseButton)
})

afterEach(() => {
  wrapper.destroy()
})

describe('ボタンタグのテキスト値確認', () => {
  test('親コンポーネントから値を受け取った場合', () => {
    wrapper = mount(BaseButton, {
      propsData: {
        text: 'Hello Jest!!',
      },
    })
    expect(wrapper.text()).toBe('Hello Jest!!')
  })
  test('親コンポーネントから受け取らなかった場合', () => {
    expect(wrapper.text()).toBe('')
  })
})
test('ボタン押下時の動作確認', () => {
  wrapper.find('button').trigger('click')
  expect(wrapper.emitted().click).toBeTruthy()
})
