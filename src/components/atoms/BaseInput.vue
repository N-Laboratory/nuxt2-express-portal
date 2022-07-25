<template>
  <input
    class="input is-medium"
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @input="sendValue"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },
  methods: {
    sendValue(event: { target: HTMLButtonElement }): void {
      this.$emit('input', event.target.value)
    },
  },
})
</script>
