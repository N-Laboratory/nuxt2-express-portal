import { mount } from '@vue/test-utils'
import About from '~/pages/contents/about.vue'

test('Aboutページが表示されていること', () => {
  // Arrange
  const wrapper = mount(About)

  // Assert
  expect(wrapper.find('section').exists()).toBeTruthy()
})
