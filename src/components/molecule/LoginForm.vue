<template>
  <div>
    <div class="field">
      <div class="control">
        <base-input v-model="name" type="text" name="name" placeholder="Name" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <base-input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
    </div>
    <base-submit text="Submit" @click="login" />
    <br />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseSubmit from '../atoms/BaseSubmit.vue'
import { User } from './../../model/User'

export type DataType = {
  name: string
  password: string
}
export default Vue.extend({
  components: { BaseInput, BaseSubmit },
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
      this.$emit('click')
    },
  },
})
</script>
