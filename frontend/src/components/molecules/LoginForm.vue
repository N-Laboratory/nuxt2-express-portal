<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <div>
      <div class="field">
        <div class="control has-text-left">
          <validation-provider
            v-slot="{ errors }"
            name="name"
            rules="required|max:64"
          >
            <base-input
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
            />
            <span class="has-text-danger has-text-weight-bold">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>
      </div>

      <div class="field">
        <div class="control has-text-left">
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required|max:64"
          >
            <base-input
              v-model="password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <span class="has-text-danger has-text-weight-bold">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>
      </div>
      <base-submit text="Submit" :disabled="invalid" @click="login" />
      <br />
    </div>
  </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseInput from '../atoms/BaseInput.vue'
import BaseSubmit from '../atoms/BaseSubmit.vue'
import { User } from './../../model/User'

export type DataType = {
  name: string
  password: string
}
export default Vue.extend({
  components: { BaseInput, BaseSubmit, ValidationProvider },
  props: {
    value: User,
  },
  data(): DataType {
    return {
      name: '',
      password: '',
    }
  },
  watch: {
    name(newValue): void {
      this.value.setName(newValue)
      this.$emit('input', this.value)
    },
    password(newValue): void {
      this.value.setPassword(newValue)
      this.$emit('input', this.value)
    },
  },
  methods: {
    login(): void {
      ;(this.$refs.observer as InstanceType<typeof ValidationObserver>).reset()
      this.$emit('click')
    },
  },
})
</script>
