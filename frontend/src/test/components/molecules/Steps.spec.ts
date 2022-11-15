import { mount, Wrapper } from '@vue/test-utils'
import { getTestIdSelector, localVue, waitPerfectly } from '../../setup'
import Steps from '~/components/molecules/Steps.vue'

let wrapper: Wrapper<Steps & { [key: string]: any }>
jest.useFakeTimers()

afterEach(() => {
  wrapper.destroy()
})

describe('プログレスバーの表示確認', () => {
  test('STEP数が4で現在のSTEPが2であること', async () => {
    // Arrange
    wrapper = mount(Steps, {
      propsData: {
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
    wrapper = mount(Steps, {
      propsData: {
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
