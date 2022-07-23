<template>
  <input
    class="input is-medium"
    type="text"
    placeholder="Name"
    @input="sendText"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    sendText(event: any) {
      this.$emit('input', event.target.value)
    },
  },
})
</script>
