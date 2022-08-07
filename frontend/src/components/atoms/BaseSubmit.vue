<template>
  <button
    class="button is-block is-primary is-fullwidth is-medium"
    @click="submit"
    v-text="text"
  ></button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: { type: String, default: '' },
  },
  methods: {
    submit(): void {
      this.$emit('click')
    },
  },
})
</script>
