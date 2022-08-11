<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <div class="box">
      <h1 class="title has-text-black">アカウント登録</h1>
      <input-item
        title="Name"
        rules="required|alphaNum|max:64"
        type="name"
        name="name"
        placeholder="name"
        @input="sendName"
      />
      <input-item
        title="Password"
        rules="required|alphaNum|max:64"
        type="password"
        name="password"
        placeholder="password"
        @input="sendPassword"
      />

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
import { ValidationObserver } from 'vee-validate'
import BaseButton from '../atoms/BaseButton.vue'
import InputItem from '../molecules/InputItem.vue'
import { User } from './../../model/User'

export default Vue.extend({
  components: { BaseButton, InputItem },
  props: {
    value: User,
  },
  methods: {
    sendName(name: string): void {
      this.value.setName(name)
      this.$emit('input', this.value)
    },
    sendPassword(password: string): void {
      this.value.setPassword(password)
      this.$emit('input', this.value)
    },
    goNext(): void {
      ;(this.$refs.observer as InstanceType<typeof ValidationObserver>).reset()
      this.$emit('click')
    },
  },
})
</script>
