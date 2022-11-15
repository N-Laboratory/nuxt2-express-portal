import { config, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'
import { alphaNum } from '../plugins/vee-validate-custom'

// mock font-awesome
config.stubs['font-awesome-icon'] = {
  template: '<span>font-awesome-icon</span>',
}

export const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

export const waitPerfectly = async () => {
  await flushPromises()
  jest.runAllTimers()
  await flushPromises()
}

// import vee-validate rules
export const importValidationRules = () => {
  for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation,
    })
  }
  localize('ja', ja)
  extend('alphaNum', alphaNum)
}

export const getTestIdSelector = (id: string) => {
  return `[data-testid="${id}"]`
}
