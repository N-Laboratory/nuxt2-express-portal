import { mount } from '@vue/test-utils'
import { getTestIdSelector } from '../setup'
import Login from '~/layouts/login.vue'

test('コンテンツが表示されていること', () => {
  // Arrange
  const wrapper = mount(Login, {
    stubs: {
      nuxt: '<span data-testid="nuxt-contents" class="nuxt-contents">Contents</span>',
    },
  })

  // Assert
  expect(wrapper.find(getTestIdSelector('nuxt-contents')).exists()).toBeTruthy()
})
