import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
