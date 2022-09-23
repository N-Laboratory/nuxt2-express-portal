import { config } from '@vue/test-utils'

// mock font-awesome
config.stubs['font-awesome-icon'] = {
  template: '<span>font-awesome-icon</span>',
}
