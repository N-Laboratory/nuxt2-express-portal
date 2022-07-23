<template>
  <button
    class="button is-block is-primary is-fullwidth is-medium"
    @click="submit"
  >
    Submit
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    submit(): void {
      this.$emit('click')
    },
  },
})
</script>
