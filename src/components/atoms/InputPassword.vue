<template>
  <input
    class="input is-medium"
    type="password"
    placeholder="Password"
    @input="sendPassword"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    sendPassword(event: any): void {
      this.$emit('input', event.target.value)
    },
  },
})
</script>
