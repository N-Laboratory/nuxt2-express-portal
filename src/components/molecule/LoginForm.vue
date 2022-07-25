<template>
  <div>
    <div class="field">
      <div class="control">
        <BaseInput v-model="name" type="text" name="name" placeholder="Name" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <BaseInput
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
    </div>
    <BaseSubmit text="Submit" @click="login" />
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
  data(): DataType {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    login(): void {
      this.$emit('click', new User(this.name, this.password))
    },
  },
})
</script>
