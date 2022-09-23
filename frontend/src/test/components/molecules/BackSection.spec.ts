import { shallowMount } from '@vue/test-utils'
import BackSection from '~/components/molecules/BackSection.vue'

test('戻るを押下時にemitされること', () => {
  // Arrange
  const wrapper = shallowMount(BackSection)

  // Act
  wrapper.vm.goBack()

  // Assert
  expect(wrapper.emitted('click')).toEqual([[]])
})
