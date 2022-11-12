import { mount, Wrapper } from '@vue/test-utils'
import { waitPerfectly } from '../../setup'
import { User } from './../../../model/User'
import CompleteForm from '~/components/molecules/CompleteForm.vue'

let wrapper: Wrapper<CompleteForm, Element>
jest.useFakeTimers()

afterEach(() => {
  wrapper.destroy()
})

describe('テキスト表示確認', () => {
  test('親コンポーネントから受け取った各値がテキストに設定されていること', () => {
    // Arrange
    wrapper = mount(CompleteForm, {
      propsData: {
        title: 'こんにちは',
        msg: 'Hello',
        value: {
          id: 0,
          name: '日本太郎',
          password: 'password',
        },
        activeStepNum: '1',
        stepSum: '3',
      },
    })

    // Assert
    expect(wrapper.find('.title').text()).toBe('こんにちは')
    expect(wrapper.find('label:nth-child(1)').text()).toBe('Hello')
    expect(wrapper.findAll('.text-break').at(0).text()).toContain('日本太郎')
    expect(wrapper.findAll('.text-break').at(1).text()).toContain('password')
  })

  test('タイトルとメッセージが初期値でテキストに設定されていること', () => {
    // Arrange
    wrapper = mount(CompleteForm, {
      propsData: {
        value: {
          id: 0,
          name: '日本花子',
          password: 'admin',
        },
        activeStepNum: '1',
        stepSum: '3',
      },
    })

    // Assert
    expect(wrapper.find('.title').text()).toBe('')
    expect(wrapper.find('label:nth-child(1)').text()).toBe('')
    expect(wrapper.findAll('.text-break').at(0).text()).toContain('日本花子')
    expect(wrapper.findAll('.text-break').at(1).text()).toContain('admin')
  })
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(CompleteForm, {
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
    expect(wrapper.find('.progressbar div:nth-child(2)').classes()).toContain(
      'active'
    )
    expect(wrapper.find('.progressbar div:nth-child(1)').classes()).toContain(
      'item-fourth'
    )
  })

  test('STEP数が3で現在のSTEPが3であること', async () => {
    // Arrange
    wrapper = mount(CompleteForm, {
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
    expect(wrapper.find('.progressbar div:nth-child(3)').classes()).toContain(
      'active'
    )
    expect(
      wrapper.find('.progressbar div:nth-child(1)').classes()
    ).not.toContain('item-fourth')
  })
})

test('TOPページへ戻る押下時にTOPページへ遷移すること', () => {
  // Arrange
  const router = { push: jest.fn() }
  wrapper = mount(CompleteForm, {
    propsData: {
      value: {
        id: 0,
        name: '',
        password: '',
      },
      activeStepNum: '3',
      stepSum: '3',
    },
    mocks: { $router: router },
  })

  // Act
  wrapper.find('.has-text-link').trigger('click')

  // Assert
  expect(router.push).toBeCalledWith('/login')
})
