import { mount, Wrapper } from '@vue/test-utils'
import { User } from '../../../model/User'
import {
  getTestIdSelector,
  importValidationRules,
  localVue,
  waitPerfectly,
} from '../../setup'
import RegisterAccountForm from '~/components/molecules/RegisterAccountForm.vue'

let wrapper: Wrapper<RegisterAccountForm & { [key: string]: any }>

jest.useFakeTimers()
importValidationRules()

beforeEach(() => {
  wrapper = mount(RegisterAccountForm, {
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

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(RegisterAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: '',
          password: '',
        },
        activeStepNum: '2',
        stepSum: '4',
      },
      localVue,
    })
    await waitPerfectly()

    // Assert
    expect(wrapper.find(getTestIdSelector('step-two')).classes()).toContain(
      'active'
    )
    expect(wrapper.find(getTestIdSelector('step-one')).classes()).toContain(
      'item-fourth'
    )
  })

  test('STEP数が3で現在のSTEPが3であること', async () => {
    // Arrange
    wrapper = mount(RegisterAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: '',
          password: '',
        },
        activeStepNum: '3',
        stepSum: '3',
      },
      localVue,
    })
    await waitPerfectly()

    // Assert
    expect(wrapper.find(getTestIdSelector('step-three')).classes()).toContain(
      'active'
    )
    expect(wrapper.find(getTestIdSelector('step-one')).classes()).not.toContain(
      'item-fourth'
    )
  })
})

describe('inputタグに値を入力した際の動作確認', () => {
  test('name=nameのinputタグに値を入力した場合に入力した値でemitされること', async () => {
    // Arrange
    const inputElement = wrapper.find('input[name="name"]')

    // Act
    inputElement.setValue('Hello Vue!!')
    await waitPerfectly()
    inputElement.trigger('input')

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
    await waitPerfectly()
    inputElement.trigger('input')

    // Assert
    expect(wrapper.emitted('input')![0][0].id).toEqual(0)
    expect(wrapper.emitted('input')![0][0].name).toEqual('Test Name')
    expect(wrapper.emitted('input')![0][0].password).toEqual('Hello Vue!!')
  })
})

describe('インプットタグ入力時のvee-validate動作確認', () => {
  test.each([
    ['name', '半角英数字', 'されない', 'abcABC0123456789', '', 0],
    [
      'name',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
      0,
    ],
    [
      'name',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
      0,
    ],
    ['name', '未入力', 'される', '', 'nameは必須項目です', 0],
    ['password', '半角英数字', 'されない', 'abcABC0123456789', '', 1],
    [
      'password',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'passwordは半角英数字で入力してください',
      1,
    ],
    [
      'password',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'passwordは64文字以内にしてください',
      1,
    ],
    ['password', '未入力', 'される', '', 'passwordは必須項目です', 1],
  ])(
    'name=%sのinputタグに入力値が[%s]の場合にエラーメッセージが表示%sこと',
    async (
      inputName,
      inputType,
      result,
      inputValue,
      expectedErrorMsg,
      errorIndex
    ) => {
      // Arrange
      wrapper.setProps({ value: { [inputName]: inputValue } })
      await waitPerfectly()

      // Act
      wrapper.find(`input[name="${inputName}"]`).trigger('input')
      await waitPerfectly()

      // Assert
      expect(
        wrapper.findAll(getTestIdSelector('ii-error-msg')).at(errorIndex).text()
      ).toBe(expectedErrorMsg)
    }
  )

  test('nameとpasswordを入力した場合に次へボタンが活性になること', async () => {
    // Arrange
    wrapper = mount(RegisterAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: '',
          password: '',
        },
      },
      localVue,
    })
    // 事前にflushPromisesをしないとv-slotのinvalidの初期値がfalseになる
    await waitPerfectly()
    const submitConditionBeforeInput = (
      wrapper.find(getTestIdSelector('raf-next')).element as HTMLInputElement
    ).disabled

    // Act
    wrapper.setProps({
      value: { name: 'abcABC0123456789', password: 'abcABC0123456789' },
    })
    await waitPerfectly()
    const submitConditionAfterInput = (
      wrapper.find(getTestIdSelector('raf-next')).element as HTMLInputElement
    ).disabled

    // Assert
    expect(submitConditionBeforeInput).toBe(true)
    expect(submitConditionAfterInput).toBe(false)
  })
})

describe('次へ押下時の動作確認', () => {
  test('次へ押下時にemitされること', async () => {
    // Act
    await wrapper.find(getTestIdSelector('raf-next')).trigger('click')

    // Assert
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('次へ押下時にバリデーションがリセットされること', async () => {
    // Arrange
    wrapper.setProps({ value: { name: 'テスト' } })
    wrapper.find(`input[name="name"]`).trigger('input')
    await waitPerfectly()
    const msgBeforeClick = wrapper
      .findAll(getTestIdSelector('ii-error-msg'))
      .at(0)
      .text()

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()
    const msgAfterClick = wrapper
      .findAll(getTestIdSelector('ii-error-msg'))
      .at(0)
      .text()

    // Assert
    expect(msgBeforeClick).toBe('nameは半角英数字で入力してください')
    expect(msgAfterClick).toBe('')
  })
})
