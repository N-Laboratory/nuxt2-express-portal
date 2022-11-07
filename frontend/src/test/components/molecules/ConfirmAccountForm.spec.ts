import { mount, Wrapper } from '@vue/test-utils'
import { waitPerfectly } from '../../setup'
import { User } from './../../../model/User'
import ConfirmAccountForm from '~/components/molecules/ConfirmAccountForm.vue'
let wrapper: Wrapper<ConfirmAccountForm, Element>
jest.useFakeTimers()

beforeEach(() => {
  wrapper = mount(ConfirmAccountForm, {
    propsData: {
      value: new User(0, 'name', 'password'),
      title: 'Test Title',
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

test('親コンポーネントから受け取ったNameとPasswordが表示されていること', () => {
  // Act
  expect(wrapper.findAll('.text-break').at(0).text()).toContain('name')
  expect(wrapper.findAll('.text-break').at(1).text()).toContain('password')
})

describe('タイトルの表示確認', () => {
  test('親コンポーネントから受け取った値がタイトルとして表示されていること', () => {
    // Assert
    expect(wrapper.find('.title').text()).toBe('Test Title')
  })

  test('初期値がタイトルとして表示されていること', () => {
    // Arrange
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: new User(0, 'name', 'password'),
      },
    })

    // Assert
    expect(wrapper.find('.title').text()).toBe('')
  })
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: new User(0, '', ''),
        activeStepNum: '2',
        stepSum: '4',
      },
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
    wrapper = mount(ConfirmAccountForm, {
      propsData: {
        value: new User(0, '', ''),
        activeStepNum: '3',
        stepSum: '3',
      },
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

test('次へ押下でemitされること', () => {
  // Act
  wrapper.find('button').trigger('click')

  // Assert
  expect(wrapper.emitted('click')).toBeTruthy()
})
