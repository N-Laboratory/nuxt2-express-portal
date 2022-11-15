import { mount, Wrapper } from '@vue/test-utils'
import { getTestIdSelector, waitPerfectly } from '../../setup'
import { User } from './../../../model/User'
import ConfirmAccountForm from '~/components/molecules/ConfirmAccountForm.vue'
let wrapper: Wrapper<ConfirmAccountForm, Element>
jest.useFakeTimers()

beforeEach(() => {
  wrapper = mount(ConfirmAccountForm, {
    propsData: {
      value: {
        id: 0,
        name: 'name',
        password: 'password',
      },
      title: 'Test Title',
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

test('親コンポーネントから受け取ったNameとPasswordが表示されていること', () => {
  // Act
  expect(wrapper.find(getTestIdSelector('caf-name')).text()).toContain('name')
  expect(wrapper.find(getTestIdSelector('caf-password')).text()).toContain(
    'password'
  )
})

describe('タイトルの表示確認', () => {
  test('親コンポーネントから受け取った値がタイトルとして表示されていること', () => {
    // Assert
    expect(wrapper.find(getTestIdSelector('caf-title')).text()).toBe(
      'Test Title'
    )
  })

  test('初期値がタイトルとして表示されていること', () => {
    // Arrange
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: 'name',
          password: 'password',
        },
      },
    })

    // Assert
    expect(wrapper.find(getTestIdSelector('caf-title')).text()).toBe('')
  })
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: '',
          password: '',
        },
        activeStepNum: '2',
        stepSum: '4',
      },
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
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: {
          id: 0,
          name: '',
          password: '',
        },
        activeStepNum: '3',
        stepSum: '3',
      },
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

test('次へ押下でemitされること', () => {
  // Act
  wrapper.find('button').trigger('click')

  // Assert
  expect(wrapper.emitted('click')).toBeTruthy()
})
