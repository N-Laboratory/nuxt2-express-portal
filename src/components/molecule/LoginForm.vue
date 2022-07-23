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
    <BaseSubmit @click="login" />
    <br />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseSubmit from '../atoms/BaseSubmit.vue'
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
      console.log('Name:' + this.name)
      console.log('Password:' + this.password)
      console.log('do login')
    },
  },
})
</script>
