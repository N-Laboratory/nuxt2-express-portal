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
    type: { type: String, default: 'text' },
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },
  methods: {
    sendValue(event: { target: HTMLInputElement }): void {
      this.$emit('input', event.target.value.trim())
    },
  },
})
</script>
