import { mount } from '@vue/test-utils'
import { getTestIdSelector } from '../../setup'
import BackSection from '~/components/molecules/BackSection.vue'

test('戻るを押下時にemitされること', () => {
  // Arrange
  const wrapper = mount(BackSection)

  // Act
  wrapper.find(getTestIdSelector('bs-back')).trigger('click')

  // Assert
  expect(wrapper.emitted('click')).toBeTruthy()
})
