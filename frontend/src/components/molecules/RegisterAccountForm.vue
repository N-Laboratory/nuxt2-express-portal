<template>
  <div class="box">
    <h1 class="title">アカウント登録</h1>
    <div class="field mb-4">
      <label class="label is-size-5">Name</label>
      <div class="control">
        <base-input v-model="name" type="name" name="name" placeholder="name" />
      </div>
    </div>

    <div class="field mb-5">
      <label class="label is-size-5">Password</label>
      <div class="control">
        <base-input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
    </div>

    <div class="field mb-3">
      <div class="control">
        <base-button text="次へ" @click="goNext" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import { User } from './../../model/User'

export type DataType = {
  name: string
  password: string
}
export default Vue.extend({
  components: { BaseInput, BaseButton },
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
      this.$emit('click')
    },
  },
})
</script>
