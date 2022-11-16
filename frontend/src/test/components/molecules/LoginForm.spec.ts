import { mount, Wrapper } from '@vue/test-utils'
import {
  getTestIdSelector,
  importValidationRules,
  localVue,
  waitPerfectly,
} from '../../setup'
import LoginForm from '~/components/molecules/LoginForm.vue'

let wrapper: Wrapper<LoginForm & { [key: string]: any }>

jest.useFakeTimers()
importValidationRules()

beforeEach(() => {
  wrapper = mount(LoginForm, {
    propsData: {
      value: {
        id: 0,
        name: 'Test Name',
        password: 'Test Password',
      },
    },
    localVue,
  })
})

afterEach(() => {
  wrapper.destroy()
})

test('親コンポーネントから受け取った値がpropsのvalueに設定されていること', () => {
  // Arrange
  const user = wrapper.props().value

  // Assert
  expect(user.id).toBe(0)
  expect(user.name).toBe('Test Name')
  expect(user.password).toBe('Test Password')
})

describe('inputタグに値を入力した際の動作確認', () => {
  test('name=nameのinputタグに値を入力した場合に入力した値でemitされること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="name"]')

    // Act
    inputElement.setValue('Hello Vue!!')
    inputElement.trigger('input')
    await waitPerfectly()

    // Assert
    expect(wrapper.emitted('input')![0][0].id).toEqual(0)
    expect(wrapper.emitted('input')![0][0].name).toEqual('Hello Vue!!')
    expect(wrapper.emitted('input')![0][0].password).toEqual('Test Password')
  })

  test('name=passwordのinputタグに値を入力した場合に入力した値でemitされること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="password"]')

    // Act
    inputElement.setValue('Hello Vue!!')
    inputElement.trigger('input')
    await waitPerfectly()

    // Assert
    expect(wrapper.emitted('input')![0][0].id).toEqual(0)
    expect(wrapper.emitted('input')![0][0].name).toEqual('Test Name')
    expect(wrapper.emitted('input')![0][0].password).toEqual('Hello Vue!!')
  })
})

describe('インプットタグ入力時のvee-validate動作確認', () => {
  test.each([
    [
      'name',
      '半角英数字',
      'されない',
      'abcABC0123456789',
      '',
      'lf-name-error-msg',
    ],
    [
      'name',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
      'lf-name-error-msg',
    ],
    [
      'name',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
      'lf-name-error-msg',
    ],
    ['name', '未入力', 'される', '', 'nameは必須項目です', 'lf-name-error-msg'],
    [
      'password',
      '半角英数字',
      'されない',
      'abcABC0123456789',
      '',
      'lf-password-error-msg',
    ],
    [
      'password',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'passwordは半角英数字で入力してください',
      'lf-password-error-msg',
    ],
    [
      'password',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'passwordは64文字以内にしてください',
      'lf-password-error-msg',
    ],
    [
      'password',
      '未入力',
      'される',
      '',
      'passwordは必須項目です',
      'lf-password-error-msg',
    ],
  ])(
    'name=%sのinputタグに入力値が[%s]の場合にエラーメッセージが表示%sこと',
    async (
      inputName,
      inputType,
      result,
      inputValue,
      expectedErrorMsg,
      selector
    ) => {
      // Arrange
      const inputElement = wrapper.find(`input[name="${inputName}"]`)

      // Act
      inputElement.setValue(inputValue)
      await waitPerfectly()

      // Assert
      expect(wrapper.find(getTestIdSelector(selector)).text()).toBe(
        expectedErrorMsg
      )
    }
  )

  test('nameとpasswordを入力した場合にSubmitボタンが活性になること', async () => {
    // Arrange
    // 事前にflushPromisesをしないとv-slotのinvalidの初期値がfalseになる
    await waitPerfectly()
    const submitConditionBeforeInput = (
      wrapper.find(getTestIdSelector('lf-submit')).element as HTMLInputElement
    ).disabled

    // Act
    wrapper.find('input[name="name"]').setValue('abcABC0123456789')
    wrapper.find('input[name="password"]').setValue('abcABC0123456789')
    await waitPerfectly()
    const submitConditionAfterInput = (
      wrapper.find(getTestIdSelector('lf-submit')).element as HTMLInputElement
    ).disabled

    // Assert
    expect(submitConditionBeforeInput).toBe(true)
    expect(submitConditionAfterInput).toBe(false)
  })
})

describe('Submit押下時の動作確認', () => {
  test('Submit押下時にemitされること', async () => {
    // Act
    await wrapper.find(getTestIdSelector('lf-submit')).trigger('click')

    // Assert
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('Submit押下時にバリデーションがリセットされること', async () => {
    // Arrange
    wrapper.find('input[name="name"]').setValue('テスト')
    await waitPerfectly()
    const msgBeforeClick = wrapper
      .find(getTestIdSelector('lf-name-error-msg'))
      .text()

    // Act
    wrapper.vm.login()
    await waitPerfectly()
    const msgAfterClick = wrapper
      .find(getTestIdSelector('lf-name-error-msg'))
      .text()

    // Assert
    expect(msgBeforeClick).toBe('nameは半角英数字で入力してください')
    expect(msgAfterClick).toBe('')
  })
})
