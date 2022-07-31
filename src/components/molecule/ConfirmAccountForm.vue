<template>
  <div>
    <h1 class="title">アカウント確認</h1>
    <div class="field mb-4">
      <label class="label is-size-5">Name</label>
      <div class="control">
        <span v-text="user.getName()"></span>
      </div>
    </div>

    <div class="field mb-5">
      <label class="label is-size-5">Password</label>
      <div class="control">
        <span v-text="user.getPassword()"></span>
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
import { User } from '../../model/User'
import BaseButton from '../atoms/BaseButton.vue'

export type DataType = {
  user: User
}
export default Vue.extend({
  components: {
    BaseButton,
  },
  props: {
    user: { type: User, default: null },
  },
  methods: {
    goNext(): void {
      this.$emit('click')
    },
  },
})
</script>
