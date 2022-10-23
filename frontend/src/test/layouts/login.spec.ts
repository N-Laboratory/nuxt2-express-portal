import { mount } from '@vue/test-utils'
import Login from '~/layouts/login.vue'

test('コンテンツが表示されていること', () => {
  // Arrange
  const wrapper = mount(Login, {
    stubs: {
      nuxt: '<span class="nuxt-contents">Contents</span>',
    },
  })

  // Assert
  expect(wrapper.find('.nuxt-contents').exists()).toBeTruthy()
})
