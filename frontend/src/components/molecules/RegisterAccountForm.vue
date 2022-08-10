<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <div class="box">
      <h1 class="title has-text-black">アカウント登録</h1>
      <div class="field mb-4">
        <label class="label is-size-5">Name</label>
        <div class="control">
          <validation-provider
            v-slot="{ errors }"
            name="name"
            rules="required|alphaNum|max:64"
          >
            <base-input
              v-model="name"
              type="name"
              name="name"
              placeholder="name"
            />
            <span class="has-text-danger has-text-weight-bold">{{
              errors[0]
            }}</span>
          </validation-provider>
        </div>
      </div>

      <div class="field mb-5">
        <label class="label is-size-5">Password</label>
        <div class="control">
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required|alphaNum|max:64"
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

      <div class="field mb-3">
        <div class="control">
          <base-button text="次へ" :disabled="invalid" @click="goNext" />
        </div>
      </div>
    </div>
  </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import { User } from './../../model/User'

export type DataType = {
  name: string
  password: string
}
export default Vue.extend({
  components: { BaseInput, BaseButton, ValidationProvider },
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
    goNext(): void {
      ;(this.$refs.observer as InstanceType<typeof ValidationObserver>).reset()
      this.$emit('click')
    },
  },
})
</script>
