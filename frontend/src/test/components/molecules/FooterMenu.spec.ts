import { mount } from '@vue/test-utils'
import { getTestIdSelector } from '../../setup'
import FooterMenu from '~/components/molecules/FooterMenu.vue'

test('フッターが表示されていること', () => {
  // Arrange
  const wrapper = mount(FooterMenu)

  // Assert
  expect(wrapper.find(getTestIdSelector('footer-content')).text()).toBe(
    'Copyright © N-LAB All Rights Reserved.'
  )
})
