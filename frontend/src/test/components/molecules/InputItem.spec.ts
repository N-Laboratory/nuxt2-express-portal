import { mount, Wrapper } from '@vue/test-utils'
import { importValidationRules, localVue, waitPerfectly } from './../../setup'
import InputItem from '~/components/molecules/InputItem.vue'
let wrapper: Wrapper<InputItem & { [key: string]: any }>
jest.useFakeTimers()
importValidationRules()

beforeEach(() => {
  wrapper = mount(InputItem, {
    propsData: {
      name: 'name',
      rules: 'required|alphaNum|max:64',
    },
    localVue,
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('画面項目表示確認', () => {
  test('親コンポーネントから受け取った各値がタイトルとInputタグの属性値に設定されていること', () => {
    // Arrange
    wrapper = mount(InputItem, {
      propsData: {
        title: 'Test title',
        type: 'textarea',
        name: 'Test name',
        value: 'Test value',
        placeholder: 'Test placeholder',
      },
      localVue,
    })

    // Assert
    expect(wrapper.find('label').text()).toBe('Test title')
    expect(wrapper.find('input').attributes('type')).toBe('textarea')
    expect(wrapper.find('input').attributes('name')).toBe('Test name')
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Test placeholder'
    )
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      'Test value'
    )
  })

  test('タイトルとInputタグの属性値が初期値で設定されていること', () => {
    // Assert
    expect(wrapper.find('label').text()).toBe('')
    expect(wrapper.find('input').attributes('type')).toBe('text')
    expect(wrapper.find('input').attributes('name')).toBe('name')
    expect(wrapper.find('input').attributes('placeholder')).toBe('')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
  })
})

describe('インプットタグ入力時のvee-validate動作確認', () => {
  test.each([
    ["半角英数字", "されない", "abcABC0123456789", ""],
    ["半角英数字以外", "される", "あいうえお漢字カナ", "nameは半角英数字で入力してください"],
    ["64文字以上", "される", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "nameは64文字以内にしてください"],
    ["未入力", "される", "", "nameは必須項目です"],
  ])("入力値が[%s]の場合にエラーメッセージが表示%sこと", async(inputType, result, inputValue, expectedErrorMsg) => {
    // Arrange
    wrapper.setProps({value: inputValue })
    await waitPerfectly()

    // Act
    wrapper.find('input[name="name"]').trigger('input')
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.validation-error').text()).toBe(expectedErrorMsg)
  });
})
