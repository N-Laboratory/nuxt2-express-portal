<template>
  <button
    class="button is-link is-fullwidth"
    @click="goNext"
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
    goNext() {
      this.$emit('click')
    },
  },
})
</script>
