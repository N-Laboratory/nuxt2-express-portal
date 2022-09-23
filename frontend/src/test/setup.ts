import { config , createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// mock font-awesome
config.stubs['font-awesome-icon'] = {
  template: '<span>font-awesome-icon</span>',
}

export const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
