import { mount, Wrapper } from '@vue/test-utils'
import { User } from '../../../model/User'
import { importValidationRules, localVue, waitPerfectly } from '../../setup'
import ResetPasswordForm from '~/components/molecules/ResetPasswordForm.vue'

let wrapper: Wrapper<ResetPasswordForm & { [key: string]: any }>

jest.useFakeTimers()
importValidationRules()

beforeEach(() => {
  wrapper = mount(ResetPasswordForm, {
    propsData: {
      value: new User(0, 'Test Name', 'Test Password'),
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
  expect(wrapper.find('.text-break').text()).toBe('Test Name')
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(ResetPasswordForm, {
      propsData: {
        value: new User(0, '', ''),
        activeStepNum: '2',
        stepSum: '4',
      },
      localVue,
    })
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.progressbar div:nth-child(2)').classes()).toContain(
      'active'
    )
    expect(wrapper.find('.progressbar div:nth-child(1)').classes()).toContain(
      'item-fourth'
    )
  })

  test('STEP数が3で現在のSTEPが3であること', async () => {
    // Arrange
    wrapper = mount(ResetPasswordForm, {
      propsData: {
        value: new User(0, '', ''),
        activeStepNum: '3',
        stepSum: '3',
      },
      localVue,
    })
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.progressbar div:nth-child(3)').classes()).toContain(
      'active'
    )
    expect(
      wrapper.find('.progressbar div:nth-child(1)').classes()
    ).not.toContain('item-fourth')
  })
})

describe('inputタグに値を入力した際の動作確認', () => {
  test('name=passwordのinputタグに値を入力した場合に入力した値でemitされること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="password"]')

    // Act
    inputElement.setValue('Hello Vue!!')
    await waitPerfectly()
    inputElement.trigger('input')

    // Assert
    expect(wrapper.vm.value.password).toBe('Hello Vue!!')
    expect(wrapper.emitted('input')![0][0].id).toEqual(0)
    expect(wrapper.emitted('input')![0][0].name).toEqual('Test Name')
    expect(wrapper.emitted('input')![0][0].password).toEqual('Hello Vue!!')
  })
})

describe('インプットタグ入力時のvee-validate動作確認', () => {
  test('inputタグに未入力の場合にエラーメッセージが表示されること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="password"]')

    // Act
    inputElement.setValue('')
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.validation-error').text()).toBe(
      'passwordは必須項目です'
    )
  })

  test('inputタグに半角英数字以外を入力した場合にエラーメッセージが表示されること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="password"]')

    // Act
    inputElement.setValue('あいうえお漢字カナ')
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.validation-error').text()).toBe(
      'passwordは半角英数字で入力してください'
    )
  })

  test('inputタグに64文字以上を入力した場合にエラーメッセージが表示されること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="password"]')

    // Act
    inputElement.setValue(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    )
    await waitPerfectly()

    // Assert
    expect(wrapper.find('.validation-error').text()).toBe(
      'passwordは64文字以内にしてください'
    )
  })

  test('passwordを入力した場合に次へボタンが活性になること', async () => {
    // Arrange
    wrapper = mount(ResetPasswordForm, {
      propsData: {
        value: new User(0, '', ''),
      },
      localVue,
    })
    // 事前にflushPromisesをしないとv-slotのinvalidの初期値がfalseになる
    await waitPerfectly()
    const submitConditionBeforeInput = (
      wrapper.find('.button').element as HTMLInputElement
    ).disabled

    // Act
    wrapper.find('input[name="password"]').setValue('abcABC0123456789')
    await waitPerfectly()
    const submitConditionAfterInput = (
      wrapper.find('.button').element as HTMLInputElement
    ).disabled

    // Assert
    expect(submitConditionBeforeInput).toBe(true)
    expect(submitConditionAfterInput).toBe(false)
  })
})

describe('次へ押下時の動作確認', () => {
  test('次へ押下時にemitされること', async () => {
    // Act
    await wrapper.find('.button').trigger('click')

    // Assert
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('次へ押下時にバリデーションがリセットされること', async () => {
    // Arrange
    wrapper.find('input[name="password"]').setValue('テスト')
    await waitPerfectly()
    const msgBeforeClick = wrapper.find('.validation-error').text()

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()
    const msgAfterClick = wrapper.find('.validation-error').text()

    // Assert
    expect(msgBeforeClick).toBe('passwordは半角英数字で入力してください')
    expect(msgAfterClick).toBe('')
  })
})
