import { mount, Wrapper } from '@vue/test-utils'
import { User } from './../../../model/User'
import { importValidationRules, localVue, waitPerfectly } from './../../setup'
import CheckAccountForm from '~/components/molecules/CheckAccountForm.vue'

let wrapper: Wrapper<CheckAccountForm & { [key: string]: any }>

jest.useFakeTimers()
importValidationRules()

beforeEach(() => {
  wrapper = mount(CheckAccountForm, {
    propsData: {
      value: {
        id: 0,
        name: '',
        password: '',
      },
      activeStepNum: '1',
      stepSum: '4',
    },
    localVue,
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(CheckAccountForm, {
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
    expect(wrapper.find('.progressbar div:nth-child(2)').classes()).toContain(
      'active'
    )
    expect(wrapper.find('.progressbar div:nth-child(1)').classes()).toContain(
      'item-fourth'
    )
  })

  test('STEP数が3で現在のSTEPが3であること', async () => {
    // Arrange
    wrapper = mount(CheckAccountForm, {
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
    expect(wrapper.find('.progressbar div:nth-child(3)').classes()).toContain(
      'active'
    )
    expect(
      wrapper.find('.progressbar div:nth-child(1)').classes()
    ).not.toContain('item-fourth')
  })
})

describe('インプットタグ入力時のvee-validate動作確認', () => {
  test.each([
    ['半角英数字', 'されない', 'abcABC0123456789', ''],
    [
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
    ],
    [
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
    ],
    ['未入力', 'される', '', 'nameは必須項目です'],
  ])(
    '入力値が[%s]の場合にエラーメッセージが表示%sこと',
    async (inputType, result, inputValue, expectedErrorMsg) => {
      // Arrange
      wrapper.setProps({ value: { name: inputValue } })
      await waitPerfectly()

      // Act
      wrapper.find('input[name="name"]').trigger('input')
      await waitPerfectly()

      // Assert
      expect(wrapper.find('.validation-error').text()).toBe(expectedErrorMsg)
    }
  )
})

test('インプットタグ入力時にemitされること', async () => {
  // Arrange
  const inputElement = wrapper.find('input')

  // Act
  inputElement.setValue('Hello Vue!!')
  await waitPerfectly()
  inputElement.trigger('input')

  // Assert
  expect(wrapper.emitted('input')![1][0].name).toEqual('Hello Vue!!')
})

describe('次へ押下時の動作確認', () => {
  test('次へ押下時にemitされること', async () => {
    // Act
    await wrapper.find('button').trigger('click')

    // Assert
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('次へ押下時にバリデーションがリセットされること', async () => {
    // Arrange
    wrapper.setProps({ value: { name: 'テスト' } })
    wrapper.find('input[name="name"]').trigger('input')
    await waitPerfectly()
    const beforeMsg = wrapper.find('.validation-error').text()

    // Act
    wrapper.vm.goNext()
    await waitPerfectly()
    const afterMsg = wrapper.find('.validation-error').text()

    // Assert
    expect(beforeMsg).toBe('nameは半角英数字で入力してください')
    expect(afterMsg).toBe('')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
